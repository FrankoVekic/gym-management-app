package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.BlogCreationDto;
import com.franko.gym_management.gym_management_app.dto.BlogDto;
import com.franko.gym_management.gym_management_app.mapper.BlogMapper;
import com.franko.gym_management.gym_management_app.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public/blogs/")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("getAllBlogs")
    public ResponseEntity<List<BlogDto>> getBlogs() {
        List<BlogCreationDto> blogs = blogService.getAllBlogs();
        List<BlogDto> allBlogs = blogs.stream().map(BlogMapper::mapFromCreationToDto).collect(Collectors.toList());
        return ResponseEntity.ok(allBlogs);
    }

    @GetMapping("{id}")
    public ResponseEntity<BlogDto> getUserById(@PathVariable("id") Long blogID) {
        BlogCreationDto blog = blogService.getBlogById(blogID);
        BlogDto hasBlog = BlogMapper.mapFromCreationToDto(blog);
        return ResponseEntity.ok(hasBlog);
    }

    @PostMapping("addBlog")
    public ResponseEntity<BlogDto> createBlog(@RequestBody BlogCreationDto blogDto){
        BlogCreationDto blog = blogService.createBlog(blogDto);
        BlogDto savedBlog = BlogMapper.mapFromCreationToDto(blog);
        return new ResponseEntity<>(savedBlog, HttpStatus.CREATED);
    }
}