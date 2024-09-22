package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.mapper.UserMapper;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import com.franko.gym_management.gym_management_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final Path rootLocation = Paths.get("D:/Projekti - vježbe/Vjezbe/Gym man app/gym-management-app/frontend/gym-management/public/logos/");


    @Override
    public UserDto createUser(UserCreationDto userDto) {

        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public List<UserDto> addMultipleUsers(List<UserCreationDto> users) {

        if (users == null || users.isEmpty()) return null;

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
                .orElseThrow(() -> new RuntimeException("User with ID: " + id + " doesn't exist."));

        userRepository.delete(user);
    }

    @Override
    public UserProfileUpdateResponse updateUserProfile(Long id, String firstname, String lastname) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFirstName(firstname);
        existingUser.setLastName(lastname);

        User updatedUser = userRepository.save(existingUser);

        return UserMapper.mapToUserProfileResponse(updatedUser);
    }

    @Override
    public String updateProfileImage(MultipartFile image, Long userId) throws IOException {
        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Image file is empty or null");
        }

        String originalFilename = image.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IllegalArgumentException("Image file has no original filename");
        }

        String filename = userId + "_" + originalFilename;

        Path filePath = rootLocation.resolve(filename);
        int count = 1;
        while (Files.exists(filePath)) {
            String fileExtension = getFileExtension(originalFilename);
            String baseName = getBaseName(originalFilename);
            filename = userId + "_" + baseName + "_" + count + "." + fileExtension;
            filePath = rootLocation.resolve(filename);
            count++;
        }

        try (InputStream inputStream = image.getInputStream()) {
            Files.copy(inputStream, filePath);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setImage(filename);
        userRepository.save(user);
        return filename;
    }

    private String getBaseName(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? filename : filename.substring(0, dotIndex);
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex + 1);
    }

}
