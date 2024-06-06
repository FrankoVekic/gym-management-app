package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TestimonialDto;

import java.util.List;

public interface TestimonialService {

    List<TestimonialDto> getTestimonials();

    TestimonialDto createTestimonial(TestimonialDto testimonialDto);
}
