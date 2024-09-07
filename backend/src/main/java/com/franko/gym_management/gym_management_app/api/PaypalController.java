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


    private String successUrl = "http://localhost:3000/";


    private String cancelUrl = "http://localhost:3000/training-packages";

    @PostMapping("pay")
    public String payment(@RequestBody Map<String, Object> body) {
        Double price = Double.valueOf(body.get("price").toString());
        String cancelUrl = this.cancelUrl;
        String successUrl = this.successUrl;

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
                return "redirect:/training-packages";
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
