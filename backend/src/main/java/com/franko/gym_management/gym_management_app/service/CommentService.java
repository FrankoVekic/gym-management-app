package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.BlogCommentResponseDto;
import com.franko.gym_management.gym_management_app.dto.CommentCreationDto;
import com.franko.gym_management.gym_management_app.dto.CommentDto;
import com.franko.gym_management.gym_management_app.dto.CommentUpdateDto;

import java.util.List;

public interface CommentService {


    CommentDto addComment(CommentCreationDto commentDto);

    List<BlogCommentResponseDto> getAllComments();

    List<BlogCommentResponseDto> updateComment(CommentUpdateDto commentUpdateDto);

}
