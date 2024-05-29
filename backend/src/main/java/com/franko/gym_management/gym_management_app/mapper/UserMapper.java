package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.UserDto;
import com.franko.gym_management.gym_management_app.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    // Mapping from UserDto to User
    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getEmail(),
                userDto.getPhoneNumber()
        );
    }

    // Mapping from User to UserDto
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

    // Mapping from List of Users to List of UserDto
    public static List<UserDto> mapToUserDtoList(List<User> users) {
        return users.stream()
                .map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());
    }
}
