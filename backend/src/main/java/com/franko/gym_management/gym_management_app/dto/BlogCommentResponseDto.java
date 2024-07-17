package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Blog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogCommentResponseDto {

    private Long id;
    private String content;
    private BlogResponseDto blog;
    private UserDto user;
    private LocalDateTime createdAt;

}
