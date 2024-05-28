package com.franko.gym_management.gym_management_app.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity(name = "contact_form_entries")
public class ContactFormEntries {

    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String fullName;

    @Email(message = "Email is not valid")
    @Column(columnDefinition = "varchar(255)", nullable = false, unique = true)
    private String email;

    @Pattern(regexp="^\\+385\\d{8,10}$", message="Invalid phone number")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(columnDefinition = "text")
    private String message;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
