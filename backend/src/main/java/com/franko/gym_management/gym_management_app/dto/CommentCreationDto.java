package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Blog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreationDto {

    private Long id;
    private String content;
    private Blog blog;
    private UserDto user;
    private LocalDateTime createdAt;

}
