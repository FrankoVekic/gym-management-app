package com.franko.gym_management.gym_management_app.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @Column(columnDefinition = "varchar(13)",name = "phone_number", unique = true)
    private String phoneNumber;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TestimonialUser> testimonials;
}
