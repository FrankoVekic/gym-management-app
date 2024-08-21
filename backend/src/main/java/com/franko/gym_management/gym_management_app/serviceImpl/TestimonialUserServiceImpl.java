package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TestimonialUserDto;
import com.franko.gym_management.gym_management_app.mapper.TestimonialUserMapper;
import com.franko.gym_management.gym_management_app.model.TestimonialUser;
import com.franko.gym_management.gym_management_app.repository.TestimonialUserRepository;
import com.franko.gym_management.gym_management_app.service.TestimonialUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class TestimonialUserServiceImpl implements TestimonialUserService {

    @Autowired
    private TestimonialUserRepository testimonialUserRepository;

    @Override
    public List<TestimonialUserDto> getTestimonialUsers() {
        List<TestimonialUser> list = testimonialUserRepository.findAllByOrderByIdDesc();
        return list
                .stream()
                .map(TestimonialUserMapper::mapToTestimonialUserDto)
                .collect(Collectors.toList());

    }

    @Override
    public TestimonialUserDto createTestimonialUser(TestimonialUserDto testimonialUserDto) {
        TestimonialUser testimonialUser = TestimonialUserMapper.mapToTestimonialUser(testimonialUserDto);
        TestimonialUser savedTestimonialUser = testimonialUserRepository.save(testimonialUser);
        return TestimonialUserMapper.mapToTestimonialUserDto(savedTestimonialUser);
    }

    @Override
    public List<TestimonialUserDto> getTwoRandomTestimonialUsers() {
        List<TestimonialUser> testimonialUsers = testimonialUserRepository.findTwoRandomTestimonialUsers();
        return testimonialUsers
                .stream()
                .map(TestimonialUserMapper::mapToTestimonialUserDto)
                .collect(Collectors.toList());

    }

}
