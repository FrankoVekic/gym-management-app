package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Blog;
import com.franko.gym_management.gym_management_app.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {

    List<Blog> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM blog WHERE created_at >= CURRENT_DATE - interval '7 days' ORDER BY created_at DESC", nativeQuery = true)
    List<Blog> findFromThisWeek();

    @Query(value = "SELECT * FROM blog WHERE created_at >= CURRENT_DATE - interval '1 month' ORDER BY created_at DESC", nativeQuery = true)
    List<Blog> findFromThisMonth();

    @Query(value = "SELECT b.*, COUNT(c.id) AS comment_count FROM blog b LEFT JOIN comment c ON b.id = c.blog_id GROUP BY b.id ORDER BY comment_count DESC",  nativeQuery = true)
    List<Blog> getBlogsWithMostComments();

    @Query(value = "SELECT b.*, COUNT(c.id) AS comment_count FROM blog b LEFT JOIN comment c ON b.id = c.blog_id GROUP BY b.id ORDER BY comment_count ASC",  nativeQuery = true)
    List<Blog> getBlogsWithLeastComments();



}
