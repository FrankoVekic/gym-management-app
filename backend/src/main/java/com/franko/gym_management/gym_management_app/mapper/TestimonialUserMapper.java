package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TestimonialUserDto;
import com.franko.gym_management.gym_management_app.model.TestimonialUser;

public class TestimonialUserMapper {

    public static TestimonialUserDto testimonialUserDto (TestimonialUser testimonialUser){
        return new TestimonialUserDto(
            testimonialUser.getId(),
            testimonialUser.getTestimonial(),
            testimonialUser.getUser()
        );
    }

    public static TestimonialUser testimonialUser (TestimonialUserDto testimonialUserDto){
        return new TestimonialUser(
            testimonialUserDto.getId(),
            testimonialUserDto.getTestimonial(),
            testimonialUserDto.getUser()
        );
    }

}
