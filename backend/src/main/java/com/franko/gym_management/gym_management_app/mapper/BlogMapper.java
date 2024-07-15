package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.BlogCreationDto;
import com.franko.gym_management.gym_management_app.dto.BlogDto;
import com.franko.gym_management.gym_management_app.model.Blog;
import java.util.stream.Collectors;

public class BlogMapper {

    public static BlogDto mapFromCreationToDto(BlogCreationDto blogDto){
        return BlogDto.builder()
                .title(blogDto.getTitle())
                .content(blogDto.getContent())
                .author(UserMapper.mapToUserDto(blogDto.getAuthor()))
                .build();
    }


    public static Blog mapToBlog(BlogCreationDto blogDto) {
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

    public static BlogCreationDto mapToBlogDto(Blog blog) {
        BlogCreationDto blogDto = new BlogCreationDto();
        blogDto.setId(blog.getId());
        blogDto.setTitle(blog.getTitle());
        blogDto.setContent(blog.getContent());
        blogDto.setCreatedAt(blog.getCreatedAt());
        blogDto.setAuthor(blog.getAuthor());

        if (blogDto.getComments() != null) {
            blogDto.setComments(blog.getComments().stream()
                    .map(CommentMapper::mapToCommentDto)
                    .collect(Collectors.toList()));
        }
        return blogDto;
    }
}
