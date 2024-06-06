package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TestimonialDto;
import com.franko.gym_management.gym_management_app.model.Testimonial;

public class TestimonialMapper {

    public static TestimonialDto mapToTestimonialDto(Testimonial testimonial){
        return new TestimonialDto(
            testimonial.getId(),
            testimonial.getUsers(),
            testimonial.getContent(),
            testimonial.getCreatedAt()
        );
    }

    public static Testimonial mapToTestimonial(TestimonialDto testimonialDto){
        return new Testimonial(
            testimonialDto.getId(),
            testimonialDto.getUsers(),
            testimonialDto.getContent(),
            testimonialDto.getCreatedAt()
        );
    }
}
