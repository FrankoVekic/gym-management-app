package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.BlogCommentResponseDto;
import com.franko.gym_management.gym_management_app.dto.CommentCreationDto;
import com.franko.gym_management.gym_management_app.dto.CommentDto;
import com.franko.gym_management.gym_management_app.model.Comment;
import com.franko.gym_management.gym_management_app.model.User;


public class CommentMapper {

    public static Comment mapToComment(CommentDto commentDto) {


        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(commentDto.getCreatedAt());
        comment.setUser(UserMapper.mapToUser(commentDto.getUser()));

        return comment;
    }

    public static BlogCommentResponseDto mapFromObjectToResponse(Comment comment){

        return BlogCommentResponseDto
                .builder()
                .id(comment.getId())
                .content(comment.getContent())
                .blog(BlogMapper.mapToResponseDtoFromObject(comment.getBlog()))
                .user(UserMapper.mapToUserDto(comment.getUser()))
                .createdAt(comment.getCreatedAt())
                .build();
    }

    public static CommentDto mapToCommentDto(Comment comment) {


        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setCreatedAt(comment.getCreatedAt());
        commentDto.setUser(UserMapper.mapToUserDto(comment.getUser()));

        return commentDto;
    }


    public static Comment mapFromCreationToObject (CommentCreationDto commentCreationDto){

        return Comment
                .builder()
                .id(commentCreationDto.getId())
                .content(commentCreationDto.getContent())
                .user(UserMapper.mapToUser(commentCreationDto.getUser()))
                .blog(commentCreationDto.getBlog())
                .build();
    }

    public static CommentDto mapFromCreationToDto(CommentCreationDto commentCreationDto){

        return CommentDto
                .builder()
                .id(commentCreationDto.getId())
                .user(commentCreationDto.getUser())
                .content(commentCreationDto.getContent())
                .createdAt(commentCreationDto.getCreatedAt())
                .build();

    }

    public static CommentCreationDto mapFromObjectToCreation(Comment comment){

        return CommentCreationDto
                .builder()
                .id(comment.getId())
                .content(comment.getContent())
                .blog(comment.getBlog())
                .user(UserMapper.mapToUserDto(comment.getUser()))
                .createdAt(comment.getCreatedAt())
                .build();
    }

    public static BlogCommentResponseDto mapFromObjectToDuoResponse(Comment comment){
        return BlogCommentResponseDto
                .builder()
                .id(comment.getId())
                .build();
    }
}
