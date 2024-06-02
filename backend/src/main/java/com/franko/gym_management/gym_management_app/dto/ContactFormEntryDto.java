package com.franko.gym_management.gym_management_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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

    @Email(message = "Full name is not valid")
    @NotBlank(message = "Full name is required")
    @NotEmpty(message = "Full name is required")
    private String fullName;

    @Email(message = "Email is not valid")
    @NotBlank(message = "Email is required")
    @NotEmpty(message = "Email is required")
    private String email;

    @Pattern(regexp="^\\+385\\d{8,10}$", message="Invalid phone number")
    private String phoneNumber;

    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();


}
