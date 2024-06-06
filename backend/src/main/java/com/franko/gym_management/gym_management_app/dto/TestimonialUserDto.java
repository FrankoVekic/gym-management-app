package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Testimonial;
import com.franko.gym_management.gym_management_app.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialUserDto {

    @NotNull

    private Long id;
    private Testimonial testimonials;
    private User user;

}
