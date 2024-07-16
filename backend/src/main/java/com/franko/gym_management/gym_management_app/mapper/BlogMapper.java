package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.BlogDto;
import com.franko.gym_management.gym_management_app.dto.BlogResponseDto;
import com.franko.gym_management.gym_management_app.dto.CommentDto;
import com.franko.gym_management.gym_management_app.model.Blog;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BlogMapper {


    public static Blog mapToBlog(BlogDto blogDto) {
        Blog blog = new Blog();
        blog.setId(blogDto.getId());
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setCreatedAt(blogDto.getCreatedAt());
        blog.setAuthor(blogDto.getAuthor());

        if (blogDto.getComments() != null) {
            blog.setComments(blogDto.getComments().stream()
                    .map(CommentMapper::mapToComment)
                    .collect(Collectors.toList()));
        }

        return blog;
    }

    public static BlogDto mapToBlogDto(Blog blog) {
        BlogDto blogDto = new BlogDto();
        blogDto.setId(blog.getId());
        blogDto.setTitle(blog.getTitle());
        blogDto.setContent(blog.getContent());
        blogDto.setCreatedAt(blog.getCreatedAt());
        blogDto.setAuthor(blog.getAuthor());


        blogDto.setComments(blog.getComments().stream()
                    .map(CommentMapper::mapToCommentDto)
                    .collect(Collectors.toList()));

        return blogDto;
    }

    public static BlogResponseDto mapToResponseDtoFromObject(Blog blog){

        List<CommentDto> commentDtoList = blog.getComments() != null ? blog.getComments().stream().map(CommentMapper::mapToCommentDto).collect(Collectors.toList()) : new ArrayList<>();

        return BlogResponseDto
                .builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .createdAt(blog.getCreatedAt())
                .author(UserMapper.mapToUserDto(blog.getAuthor()))
                .comments(commentDtoList)
                .build();
    }


}
