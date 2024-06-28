package com.franko.gym_management.gym_management_app.config.auth;

import com.franko.gym_management.gym_management_app.config.jwt.JwtService;
import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.exceptions.UnauthorizedException;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private JavaMailSender javaMailSender;

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        var user = User
                .builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.MEMBER)
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user, user.getId(), user.getRole().name());

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new UnauthorizedException("Email cannot be empty!");
        } else if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new UnauthorizedException("Password cannot be empty");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email"));

        var jwtToken = jwtService.generateToken(user, user.getId(), user.getRole().name());

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    @Value("${spring.mail.username}")
    private String fromEmailId;

    public void sendEmail(String recipient,String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmailId);
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

}
