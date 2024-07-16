package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.BlogDto;
import com.franko.gym_management.gym_management_app.dto.BlogResponseDto;

import java.util.List;

public interface BlogService {

    BlogResponseDto createBlog(BlogDto blogDto);

    List<BlogDto> getAllBlogs();

    BlogDto getBlogById(Long id);

}
