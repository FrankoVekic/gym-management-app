package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.BlogDto;
import com.franko.gym_management.gym_management_app.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/blogs/")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("getAllBlogs")
    public ResponseEntity<List<BlogDto>> getBlogs() {
        List<BlogDto> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("{id}")
    public ResponseEntity<BlogDto> getUserById(@PathVariable("id") Long blogID) {
        BlogDto blog = blogService.getBlogById(blogID);
        return ResponseEntity.ok(blog);
    }

    @PostMapping("addBlog")
    public ResponseEntity<BlogDto> createBlog(@RequestBody BlogDto blogDto){
        BlogDto blog = blogService.createBlog(blogDto);
        return new ResponseEntity<>(blog, HttpStatus.CREATED);
    }
}