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
import java.util.Optional;
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
    public List<BlogResponseDto> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAllByOrderByIdDesc();

        return blogs
                .stream()
                .map(BlogMapper::mapToResponseDtoFromObject)
                .collect(Collectors
                        .toList());

    }

    @Override
    public List<BlogResponseDto> getBlogsFromLastWeek() {

        List<Blog> blogs = blogRepository.findFromThisWeek();

        return blogs
                .stream()
                .map(BlogMapper::mapToResponseDtoFromObject)
                .collect(Collectors.toList());

    }

    @Override
    public List<BlogResponseDto> getBlogsFromLastMonth() {
        List<Blog> blogs = blogRepository.findFromThisMonth();

        return blogs
                .stream()
                .map(BlogMapper::mapToResponseDtoFromObject)
                .collect(Collectors.toList());

    }

    @Override
    public List<BlogResponseDto> getMostCommentedBlogs() {
        List<Blog> blogs = blogRepository.getBlogsWithMostComments();

        return blogs
                .stream()
                .map(BlogMapper::mapToResponseDtoFromObject)
                .collect(Collectors.toList());

    }

    @Override
    public List<BlogResponseDto> getBlogsWithLeastComments() {
        List<Blog> blogs = blogRepository.getBlogsWithLeastComments();

        return blogs
                .stream()
                .map(BlogMapper::mapToResponseDtoFromObject)
                .collect(Collectors.toList());

    }

    @Override
    public List<BlogResponseDto> getSearchedBlogs(String title) {

        List<Blog> blogs = blogRepository.getSearchedBlogs(title);

        return blogs
                .stream()
                .map(BlogMapper::mapToResponseDtoFromObject)
                .collect(Collectors.toList());
    }

    @Override
    public BlogResponseDto getBlogById(Long blogID) {
        Blog blog = blogRepository.getBlogById(blogID);

        if(blog == null){
            throw new RuntimeException("Blog not found");
        }

        return BlogMapper.mapToResponseDtoFromObject(blog);
    }

    @Override
    public void softDeleteById(Long id) {

        Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));

        blogRepository.softDeleteById(id);
    }

}
