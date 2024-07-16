package com.franko.gym_management.gym_management_app.dto;


import com.franko.gym_management.gym_management_app.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogResponseDto {

    private String title;
    private String content;
    private UserDto author;
    private List<Comment> comments;

}
