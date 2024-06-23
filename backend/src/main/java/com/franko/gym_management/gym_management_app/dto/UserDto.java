package com.franko.gym_management.gym_management_app.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.model.TestimonialUser;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
    private String image;
    private String phoneNumber;
    @JsonIgnore
    private List<TestimonialUser> testimonials;
}
