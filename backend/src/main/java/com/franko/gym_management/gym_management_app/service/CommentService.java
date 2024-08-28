package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.*;

import java.util.List;

public interface CommentService {


    CommentDto addComment(CommentCreationDto commentDto);

    List<BlogCommentResponseDto> getAllComments();

    List<BlogCommentResponseDto> updateComment(CommentUpdateDto commentUpdateDto);

    void softDeleteById(CommentDeleteDto id);

}
