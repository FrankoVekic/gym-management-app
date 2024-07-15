package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.BlogCreationDto;
import com.franko.gym_management.gym_management_app.mapper.BlogMapper;
import com.franko.gym_management.gym_management_app.model.Blog;
import com.franko.gym_management.gym_management_app.repository.BlogRepository;
import com.franko.gym_management.gym_management_app.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {


    @Autowired
    private BlogRepository blogRepository;

    @Override
    public BlogCreationDto createBlog(BlogCreationDto blogDto) {
        Blog blog = BlogMapper.mapToBlog(blogDto);
        Blog savedBlog = blogRepository.save(blog);
        return BlogMapper.mapToBlogDto(savedBlog);
    }

    @Override
    public List<BlogCreationDto> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAllByOrderByIdDesc();

        return blogs
                .stream()
                .map(BlogMapper::mapToBlogDto)
                .collect(Collectors
                        .toList());

    }

    @Override
    public BlogCreationDto getBlogById(Long blogID) {
        Blog blog = blogRepository.findById(blogID)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return BlogMapper.mapToBlogDto(blog);
    }

}
