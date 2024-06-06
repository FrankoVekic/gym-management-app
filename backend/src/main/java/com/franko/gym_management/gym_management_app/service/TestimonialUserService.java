package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TestimonialUserDto;

import java.util.List;

public interface TestimonialUserService {

    List<TestimonialUserDto> getTestimonialUsers();

    TestimonialUserDto createTestimonialUser(TestimonialUserDto testimonialUserDto);

    List<TestimonialUserDto> getTwoRandomTestimonialUsers();
}
