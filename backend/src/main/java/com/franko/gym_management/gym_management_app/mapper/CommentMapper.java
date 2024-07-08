package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.CommentDto;
import com.franko.gym_management.gym_management_app.model.Comment;


public class CommentMapper {

    public static Comment mapToComment(CommentDto commentDto) {


        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(commentDto.getCreatedAt());
        comment.setUser(UserMapper.mapToUser(commentDto.getUser()));

        return comment;
    }

    public static CommentDto mapToCommentDto(Comment comment) {


        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setCreatedAt(comment.getCreatedAt());
        commentDto.setUser(UserMapper.mapToUserDto(comment.getUser()));

        return commentDto;
    }
}
