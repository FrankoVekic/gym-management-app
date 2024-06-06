package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TestimonialUserDto;
import com.franko.gym_management.gym_management_app.model.TestimonialUser;

public class TestimonialUserMapper {

    public static TestimonialUserDto mapToTestimonialUserDto (TestimonialUser testimonialUser){
        return new TestimonialUserDto(
            testimonialUser.getId(),
            testimonialUser.getTestimonials(),
            testimonialUser.getUser()
        );
    }

    public static TestimonialUser mapToTestimonialUser (TestimonialUserDto testimonialUserDto){
        return new TestimonialUser(
            testimonialUserDto.getId(),
            testimonialUserDto.getTestimonials(),
            testimonialUserDto.getUser()
        );
    }

}
