package com.franko.gym_management.gym_management_app.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {

    private String title;
    private String content;
    private UserDto author;
}
