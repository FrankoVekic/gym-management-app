package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.UserDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    UserDto createUser (UserDto user);

    UserDto getUserById(Long userId);

    List<UserDto> getUsers();

}
