package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.UserCreationDto;
import com.franko.gym_management.gym_management_app.dto.UserDto;
import com.franko.gym_management.gym_management_app.mapper.UserMapper;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import com.franko.gym_management.gym_management_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserCreationDto userDto) {

        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public List<UserDto> addMultipleUsers(List<UserCreationDto> users) {

        if(users == null || users.isEmpty()) return null;

        List<User> userList = users.stream().map(UserMapper::mapToUser).collect(Collectors.toList());
        List<User> savedUserList = userRepository.saveAll(userList);
        return UserMapper.mapToUserDtoList(savedUserList);

    }

    public UserDto getUserById(Long userID) {

        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getUsers() {

        List<User> users = userRepository.findAllByOrderByIdAsc();
        return users.stream()
                .map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());

    }

    @Override
    public UserDto updateUser(Long id, UserCreationDto userDto) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName((userDto.getLastName()));
        existingUser.setEmail(userDto.getEmail());

        User updatedUser = userRepository.save(existingUser);

        return UserMapper.mapToUserDto(updatedUser);


    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID: "+ id + " doesn't exist."));

        userRepository.delete(user);
    }
}
