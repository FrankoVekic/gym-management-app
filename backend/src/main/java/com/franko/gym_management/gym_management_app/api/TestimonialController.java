package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.TestimonialDto;
import com.franko.gym_management.gym_management_app.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/testimonials/")
public class TestimonialController {

    @Autowired
    private TestimonialService testimonialService;

    @GetMapping("getTestimonials")
    public ResponseEntity<List<TestimonialDto>> getTestimonials() {
        List<TestimonialDto> testimonials = testimonialService.getTestimonials();
        return ResponseEntity.ok(testimonials);
    }

    @PostMapping("addTestimonial")
    public ResponseEntity<TestimonialDto> addTestimonial(@RequestBody TestimonialDto testimonialDto) {
        TestimonialDto testimonial = testimonialService.createTestimonial(testimonialDto);
        return new ResponseEntity<>(testimonial, HttpStatus.CREATED);
    }
}
