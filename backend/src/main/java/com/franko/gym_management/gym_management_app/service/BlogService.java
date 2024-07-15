package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.BlogCreationDto;

import java.util.List;

public interface BlogService {

    BlogCreationDto createBlog(BlogCreationDto blogDto);

    List<BlogCreationDto> getAllBlogs();

    BlogCreationDto getBlogById(Long id);

}
