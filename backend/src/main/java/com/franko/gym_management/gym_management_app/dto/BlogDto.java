package com.franko.gym_management.gym_management_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.franko.gym_management.gym_management_app.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogDto {

    private Long id;
    private String title;
    private String content;
    private User author;
    private LocalDateTime createdAt;
    private List<CommentDto> comments;

}
