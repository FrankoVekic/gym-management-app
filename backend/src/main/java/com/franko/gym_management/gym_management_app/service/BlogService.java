package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.BlogDto;

import java.util.List;

public interface BlogService {

    BlogDto createBlog(BlogDto blogDto);

    List<BlogDto> getAllBlogs();

    BlogDto getBlogById(Long id);

}
