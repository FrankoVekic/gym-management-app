package com.franko.gym_management.gym_management_app.model;


import jakarta.persistence.*;
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
@Entity(name = "contact_form_entries")
public class ContactFormEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @NotEmpty(message = "Full name is required")
    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String fullName;

    @Email(message = "Email is not valid")
    @NotBlank(message = "Email is required")
    @NotEmpty(message = "Email is required")
    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String email;

    @Pattern(regexp="^\\+385\\d{8,10}$", message="Invalid phone number")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(columnDefinition = "text")
    private String message;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "contacted", nullable = false)
    private boolean contacted;

}
