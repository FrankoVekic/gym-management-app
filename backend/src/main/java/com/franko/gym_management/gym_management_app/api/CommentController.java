package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.BlogCommentResponseDto;
import com.franko.gym_management.gym_management_app.dto.CommentCreationDto;
import com.franko.gym_management.gym_management_app.dto.CommentDto;
import com.franko.gym_management.gym_management_app.dto.CommentUpdateDto;
import com.franko.gym_management.gym_management_app.mapper.CommentMapper;
import com.franko.gym_management.gym_management_app.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/comments/")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("addComment")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentCreationDto commentCreationDto){
        CommentDto comment = commentService.addComment(commentCreationDto);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @GetMapping("getAllComments")
    public ResponseEntity<List<BlogCommentResponseDto>> getAllComments(){
        List<BlogCommentResponseDto> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @PutMapping("updateComment")
    public ResponseEntity<List<BlogCommentResponseDto>> updateComment(@RequestBody CommentUpdateDto commentUpdateDto){
        List<BlogCommentResponseDto> list = commentService.updateComment(commentUpdateDto);

        return ResponseEntity.ok(list);
    }
}
