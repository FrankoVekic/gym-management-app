package com.franko.gym_management.gym_management_app.config.auth;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterTrainerRequest {

    @NotEmpty(message = "First name is required")
    private String firstname;

    @NotEmpty(message = "Last name is required")
    private String lastname;

    @Email(message = "Invalid email address")
    @NotEmpty(message = "Email is required")
    private String email;

    @NotEmpty(message = "Description is required")
    private String description;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(
            regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    private String password;

}
