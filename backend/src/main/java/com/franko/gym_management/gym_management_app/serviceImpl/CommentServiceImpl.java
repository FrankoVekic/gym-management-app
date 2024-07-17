package com.franko.gym_management.gym_management_app.serviceImpl;


import com.franko.gym_management.gym_management_app.dto.BlogCommentResponseDto;
import com.franko.gym_management.gym_management_app.dto.CommentCreationDto;
import com.franko.gym_management.gym_management_app.dto.CommentDto;
import com.franko.gym_management.gym_management_app.mapper.CommentMapper;
import com.franko.gym_management.gym_management_app.model.Blog;
import com.franko.gym_management.gym_management_app.model.Comment;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.BlogRepository;
import com.franko.gym_management.gym_management_app.repository.CommentRepository;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import com.franko.gym_management.gym_management_app.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CommentDto addComment(CommentCreationDto commentDto) {

        Optional<Blog> blogOptional = blogRepository.findById(commentDto.getBlog().getId());
        Blog blog = blogOptional.orElseThrow(() -> new RuntimeException("Blog not found"));

        Optional<User> userOptional = userRepository.findById(commentDto.getUser().getId());
        User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = CommentMapper.mapFromCreationToObject(commentDto);

        comment.setUser(user);
        comment.setBlog(blog);

        Comment savedComment = commentRepository.save(comment);
        return CommentMapper.mapToCommentDto(savedComment);
    }

    @Override
    public List<BlogCommentResponseDto> getAllComments() {

        List<Comment> comments = commentRepository.findAll();

        return comments
                .stream()
                .map(CommentMapper::mapFromObjectToResponse)
                .collect(Collectors.toList());
    }
}
