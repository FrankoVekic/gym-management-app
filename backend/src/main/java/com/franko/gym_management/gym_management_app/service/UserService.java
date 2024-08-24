package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    UserDto createUser (UserCreationDto user);

    List<UserDto> addMultipleUsers (List<UserCreationDto> users);

    UserDto getUserById(Long userId);

    List<UserDto> getUsers();

    UserDto updateUser(Long id,UserCreationDto userDto);

    void deleteUser(Long id);

    UserProfileUpdateResponse updateUserProfile(Long id, String firstname, String lastname);

    void updateProfileImage(MultipartFile image, Long userId) throws IOException;

}
