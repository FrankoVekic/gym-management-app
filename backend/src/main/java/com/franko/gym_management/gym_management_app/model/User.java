package com.franko.gym_management.gym_management_app.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar(255)",name = "first_name",nullable = false)
    private String firstName;

    @Column(columnDefinition = "varchar(255)",name = "last_name", nullable = false)
    private String lastName;

    @Column(columnDefinition = "varchar(255)",nullable = false, unique = true)
    private String email;

    @Pattern(regexp="^\\+385\\d{8,12}$", message="Invalid phone number")
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;
}
