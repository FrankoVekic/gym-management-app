package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.BlogDto;
import com.franko.gym_management.gym_management_app.dto.BlogResponseDto;
import com.franko.gym_management.gym_management_app.mapper.BlogMapper;
import com.franko.gym_management.gym_management_app.model.Blog;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.BlogRepository;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import com.franko.gym_management.gym_management_app.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {


    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public BlogResponseDto createBlog(BlogDto blogDto) {

        User author = userRepository.findById(blogDto.getAuthor().getId()).orElseThrow(() -> new RuntimeException("User not found"));

        Blog blog = BlogMapper.mapToBlog(blogDto);
        Blog savedBlog = blogRepository.save(blog);
        return BlogMapper.mapToResponseDtoFromObject(savedBlog);
    }

    @Override
    public List<BlogDto> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAllByOrderByIdDesc();

        return blogs
                .stream()
                .map(BlogMapper::mapToBlogDto)
                .collect(Collectors
                        .toList());

    }

    @Override
    public BlogDto getBlogById(Long blogID) {
        Blog blog = blogRepository.findById(blogID)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return BlogMapper.mapToBlogDto(blog);
    }

}
