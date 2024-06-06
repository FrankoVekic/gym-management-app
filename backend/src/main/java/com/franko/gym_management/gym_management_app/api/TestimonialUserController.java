package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.TestimonialDto;
import com.franko.gym_management.gym_management_app.dto.TestimonialUserDto;
import com.franko.gym_management.gym_management_app.dto.TrainingSessionDto;
import com.franko.gym_management.gym_management_app.service.TestimonialUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/testimonialsUsers/")
public class TestimonialUserController {

    @Autowired
    private TestimonialUserService testimonialUserService;

    @GetMapping("getTestimonialUsers")
    public ResponseEntity<List<TestimonialUserDto>> getTestimonialUsers(){
        List<TestimonialUserDto> trainingSessions = testimonialUserService.getTestimonialUsers();
        return ResponseEntity.ok(trainingSessions);
    }

    @GetMapping("getTwoTestemonialsUsers")
    public ResponseEntity<List<TestimonialUserDto>> getTwoRandomTestimonialUsers(){
        List<TestimonialUserDto> testimonialUsers = testimonialUserService.getTwoRandomTestimonialUsers();
        return ResponseEntity.ok(testimonialUsers);
    }

    @PostMapping("addTestimonialUser")
    public ResponseEntity<TestimonialUserDto> createTestimonialUser(@RequestBody TestimonialUserDto testimonialUserDto){
        TestimonialUserDto savedTestimonialUser = testimonialUserService.createTestimonialUser(testimonialUserDto);
        return new ResponseEntity<>(savedTestimonialUser, HttpStatus.CREATED);
    }
}
