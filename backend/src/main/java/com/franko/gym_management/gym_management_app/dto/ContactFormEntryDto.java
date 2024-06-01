package com.franko.gym_management.gym_management_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactFormEntryDto {
    private Long id;

    @NotEmpty(message = "Full name is required")
    private String fullName;

    @Email(message = "Email is not valid")
    @NotEmpty(message = "Email is required")
    private String email;

    @Pattern(regexp="^\\+385\\d{8,10}$", message="Invalid phone number")
    private String phoneNumber;

    @NotEmpty(message = "Message is required")
    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();


}
