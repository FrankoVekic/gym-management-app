package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/public/users/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId) {
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("addUserList")
    public ResponseEntity<List<UserDto>> addMultipleUsers(@RequestBody List<UserCreationDto> users) {
        List<UserDto> savedUsers = userService.addMultipleUsers(users);
        return new ResponseEntity<>(savedUsers, HttpStatus.CREATED);
    }

    @GetMapping("getUsers")
    public ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> userDtos = userService.getUsers();
        return ResponseEntity.ok(userDtos);
    }

    @PostMapping("addUser")
    public ResponseEntity<UserDto> createUser(@RequestBody UserCreationDto userDto) {
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long id, @RequestBody UserCreationDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("updateUserProfile")
    public ResponseEntity<?> updateUsersProfile(@RequestBody UserProfileUpdateDto userDto) {

        UserProfileUpdateResponse user = userService.updateUserProfile
                (
                        userDto.getId(),
                        userDto.getFirstname(),
                        userDto.getLastname()
                );

        return ResponseEntity.ok(user);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);

        return ResponseEntity.ok("User with ID: " + id + " has been deleted");

    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> updateProfileImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam("userId") Long userId) throws IOException {

        String response = userService.updateProfileImage(image, userId);
        return ResponseEntity.ok(response);
    }
}