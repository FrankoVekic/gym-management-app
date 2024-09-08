package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.config.paypal.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/public/paypal/")
@RequiredArgsConstructor
public class PaypalController {

    private final PaypalService paypalService;

    @Value("${paypal.success.url}")
    private String successUrl;

    @Value("${paypal.cancel.url}")
    private String cancelUrl;


    @PostMapping("pay")
    public String payment(@RequestBody Map<String, Object> body) {
        Double price = Double.valueOf(body.get("price").toString());

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
            System.out.println("Payment ID: " + paymentId);
            System.out.println("Payer ID: " + payerId);

            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
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
