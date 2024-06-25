package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.UserCreationDto;
import com.franko.gym_management.gym_management_app.dto.UserDto;
import com.franko.gym_management.gym_management_app.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    public static User mapToUser(UserCreationDto userDto) {
        if(userDto == null) return null;

        return User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .role(userDto.getRole())
                .image(userDto.getImage())
                .phoneNumber(userDto.getPhoneNumber())
                .build();
    }


    public static UserDto mapToUserDto(User user){

        if(user == null) return null;

        return UserDto
                .builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .image(user.getImage())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public static UserDto mapToUserDto(UserCreationDto userCreationDto){
        if(userCreationDto == null) return null;

        return UserDto
                .builder()
                .firstName(userCreationDto.getFirstName())
                .lastName(userCreationDto.getLastName())
                .email(userCreationDto.getEmail())
                .image(userCreationDto.getImage())
                .phoneNumber(userCreationDto.getPhoneNumber())
                .build();
    }



    // Mapping from List of Users to List of UserDto
    public static List<UserDto> mapToUserDtoList(List<User> users) {
        return users.stream()
                .map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());
    }
}
