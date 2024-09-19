package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.config.paypal.PaypalService;
import com.franko.gym_management.gym_management_app.dto.MemberDto;
import com.franko.gym_management.gym_management_app.dto.TrainingPackageDto;
import com.franko.gym_management.gym_management_app.enums.StatusType;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.service.MemberService;
import com.franko.gym_management.gym_management_app.service.TrainingPackageService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/public/paypal/")
@RequiredArgsConstructor
public class PaypalController {

    private final PaypalService paypalService;

    @Autowired
    private TrainingPackageService trainingPackageService;

    @Autowired
    private MemberService memberService;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private Long userId;
    private TrainingPackageDto trainingPackageDto;

    @Value("${paypal.success.url}")
    private String successUrl;

    @Value("${paypal.cancel.url}")
    private String cancelUrl;


    @PostMapping("pay")
    public String payment(@RequestBody Map<String, Object> body) {
        Double price = Double.valueOf(body.get("price").toString());
        Long trainingPackageId = Long.valueOf(body.get("trainingPackageId").toString());
        userId = Long.valueOf(body.get("userId").toString());
        trainingPackageDto = trainingPackageService.getTrainingPackageById(trainingPackageId);
        MemberDto member = memberService.getMemberByUserId(userId);
        LocalDateTime now = LocalDateTime.now();

        if(member.getStatus().getStatusType().equals(StatusType.SUSPENDED)){
            return "You are suspended there for you cannot purchase Training Package, please contact support for more information";
        }

        if (member.getTrainingPackage() != null) {
            if (member.getTrainingPackageExpirationDate().isAfter(now)) {
                if (member.getTrainingPackage().getId().equals(trainingPackageDto.getId())) {
                    String formattedDate = member.getTrainingPackageExpirationDate().format(FORMATTER);
                    return "This package is active until " + formattedDate;
                } else if (trainingPackageDto.getPrice().compareTo(member.getTrainingPackage().getPrice()) < 0) {
                    return "This package costs less than your current one. Please contact Support for further assistance.";
                }
            }
        }

        try {
            Payment payment = paypalService.createPayment(
                    price,
                    "EUR",
                    "paypal",
                    "sale",
                    "Paying for training package",
                    cancelUrl,
                    successUrl
            );

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return link.getHref();
                }
            }

        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }

        return "redirect:/";
    }


    @GetMapping("success")
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                LocalDateTime expirationDate = LocalDateTime.now().plusMonths(1);
                memberService.updateMemberTrainingPackage(userId, trainingPackageDto, expirationDate);
                return "redirect:/";
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }

        return "redirect:/";
    }


    @GetMapping("cancel")
    public String cancelPay() {
        return "redirect:/";
    }
}
