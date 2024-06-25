package com.franko.gym_management.gym_management_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.model.TestimonialUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
    private String image;
    private String phoneNumber;

}
