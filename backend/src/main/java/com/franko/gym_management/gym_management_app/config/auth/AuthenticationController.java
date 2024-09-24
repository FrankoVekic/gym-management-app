package com.franko.gym_management.gym_management_app.config.auth;

import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/api/auth/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("registerTrainer")
    public ResponseEntity<String> registerTrainer(@RequestBody RegisterTrainerRequest request) {
        authenticationService.registerTrainer(request);
        return ResponseEntity.ok("Successfully added new trainer");
    }

    @PostMapping("authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authenticationService.sendResetPasswordEmail(request.getEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        authenticationService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @PostMapping("change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest){
        authenticationService.changePassword
                (changePasswordRequest.getEmail(),
                 changePasswordRequest.getOldPassword(),
                 changePasswordRequest.getNewPassword());

        return ResponseEntity.ok().build();
    }


}
