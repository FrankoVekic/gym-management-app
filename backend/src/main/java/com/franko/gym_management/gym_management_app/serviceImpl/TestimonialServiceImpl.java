package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TestimonialDto;
import com.franko.gym_management.gym_management_app.mapper.TestimonialMapper;
import com.franko.gym_management.gym_management_app.model.Testimonial;
import com.franko.gym_management.gym_management_app.repository.TestimonialRepository;
import com.franko.gym_management.gym_management_app.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestimonialServiceImpl implements TestimonialService {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @Override
    public List<TestimonialDto> getTestimonials() {
        List<Testimonial> testimonials = testimonialRepository.findAllByOrderByIdAsc();
        return testimonials.stream()
               .map(TestimonialMapper::mapToTestimonialDto)
               .collect(Collectors.toList());
    }

    @Override
    public TestimonialDto createTestimonial(TestimonialDto testimonialDto) {
         Testimonial testimonial = TestimonialMapper.mapToTestimonial(testimonialDto);
         Testimonial savedTestimonial = testimonialRepository.save(testimonial);
         return TestimonialMapper.mapToTestimonialDto(savedTestimonial);
    }
}
