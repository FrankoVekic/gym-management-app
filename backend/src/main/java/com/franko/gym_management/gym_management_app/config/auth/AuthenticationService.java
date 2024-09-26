package com.franko.gym_management.gym_management_app.config.auth;

import com.franko.gym_management.gym_management_app.config.jwt.JwtService;
import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.enums.StatusType;
import com.franko.gym_management.gym_management_app.exceptions.EmailExistsException;
import com.franko.gym_management.gym_management_app.exceptions.UnauthorizedException;
import com.franko.gym_management.gym_management_app.mapper.TrainerMapper;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.Trainer;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.MemberRepository;
import com.franko.gym_management.gym_management_app.repository.StatusRepository;
import com.franko.gym_management.gym_management_app.repository.TrainerRepository;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private JavaMailSender javaMailSender;

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final StatusRepository statusRepository;
    private final TrainerRepository trainerRepository;

    private final static String LOCAL_DEV_URL = "http://localhost:3000/";

    public AuthenticationResponse register(RegisterRequest request) {


        Optional<User> userByEmail = repository.findByEmail(request.getEmail());

        if (userByEmail.isPresent()) {
            throw new EmailExistsException("User with entered email already exists");
        }

        var user = User
                .builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .image("noLogo.png")
                .role(Role.MEMBER)
                .build();

        repository.save(user);


        Status status = statusRepository.getReferenceById(2L);

        var member = Member
                .builder()
                .status(status)
                .user(user)
                .build();

        memberRepository.save(member);

        var jwtToken = jwtService.generateToken(user, user.getId(), user.getRole().name());

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();

    }

    public Long registerTrainer(RegisterTrainerRequest request) {


        Optional<User> userByEmail = repository.findByEmail(request.getEmail());

        if (userByEmail.isPresent()) {
            throw new EmailExistsException("User with entered email already exists");
        }

        var user = User
                .builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .image("noLogo.png")
                .role(Role.TRAINER)
                .build();

        repository.save(user);


        Status status = statusRepository.getReferenceById(6L);

        var trainer = Trainer
                .builder()
                .user(user)
                .status(status)
                .description(request.getDescription())
                .build();


        Trainer newTrainer = trainerRepository.save(trainer);

        return newTrainer.getId();

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

        if(user.getRole().equals(Role.TRAINER)){

            Trainer trainer = trainerRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Trainer with given User ID does not exist"));

            if(trainer.getRemovedAt() != null){
                throw new UnauthorizedException("This account is no longer active.");
            }
        }

        var jwtToken = jwtService.generateToken(user, user.getId(), user.getRole().name());

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendResetPasswordEmail(String email) {

        String resetToken = UUID.randomUUID().toString();
        LocalDateTime tokenExpiryTime = LocalDateTime.now().plusHours(1);

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User with this email does not exist.", HttpStatus.NOT_FOUND));

        if(user.getRole().equals(Role.TRAINER)){

            Trainer trainer = trainerRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Trainer with given User ID does not exist"));

            if(trainer.getRemovedAt() != null){
                throw new UnauthorizedException("This account is removed, you cannot reset password now. Create new account.");
            }
        }

        user.setResetToken(resetToken);
        user.setTokenExpiryTime(tokenExpiryTime);
        repository.save(user);

        String resetUrl = LOCAL_DEV_URL + "reset-password?token=" + resetToken;
        String emailBody = "Hello " + user.getFirstName() + ",\n\n"
                + "You requested a password reset. Click the link below to reset your password:\n"
                + resetUrl + "\n\n"
                + "If you did not request a password reset, please ignore this email.\n\n"
                + "Best regards,\n"
                + "Your FitnessPro Team";

        sendEmail(email, "Reset Password", emailBody);
    }

    private void sendEmail(String recipient, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

    public void resetPassword(String token, String newPassword) {
        Optional<User> userOptional = repository.findByResetToken(token);
        if (userOptional.isEmpty()) {
            throw new UnauthorizedException("Invalid reset token.", HttpStatus.BAD_REQUEST);
        }

        User user = userOptional.get();
        if (user.getTokenExpiryTime().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Reset token has expired.", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiryTime(null);
        repository.save(user);
    }

    public void changePassword(String email, String oldPassword, String newPassword) {
        if (newPassword == null || newPassword.isEmpty()) {
            throw new IllegalArgumentException("New password cannot be empty");
        }

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User with this email does not exist.", HttpStatus.NOT_FOUND));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new UnauthorizedException("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
    }

}
