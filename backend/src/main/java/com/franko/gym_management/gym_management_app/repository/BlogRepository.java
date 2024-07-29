package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {

    @Query(value = "SELECT * FROM BLOG WHERE deleted_at IS NULL ORDER BY ID DESC", nativeQuery = true)
    List<Blog> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM blog WHERE created_at >= CURRENT_DATE - interval '7 days' AND deleted_at IS NULL ORDER BY created_at DESC", nativeQuery = true)
    List<Blog> findFromThisWeek();

    @Query(value = "SELECT * FROM blog WHERE created_at >= CURRENT_DATE - interval '1 month' AND deleted_at IS NULL ORDER BY created_at DESC", nativeQuery = true)
    List<Blog> findFromThisMonth();

    @Query(value = "SELECT b.*, COUNT(c.id) AS comment_count FROM blog b LEFT JOIN comment c ON b.id = c.blog_id WHERE deleted_at IS NULL GROUP BY b.id ORDER BY comment_count DESC",  nativeQuery = true)
    List<Blog> getBlogsWithMostComments();

    @Query(value = "SELECT b.*, COUNT(c.id) AS comment_count FROM blog b LEFT JOIN comment c ON b.id = c.blog_id WHERE deleted_at IS NULL GROUP BY b.id ORDER BY comment_count ASC",  nativeQuery = true)
    List<Blog> getBlogsWithLeastComments();

    @Query(value = "SELECT b.* FROM BLOG b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')) AND deleted_at IS NULL ORDER BY b.created_at DESC", nativeQuery = true)
    List<Blog> getSearchedBlogs(@Param("title")String title);

    @Query(value="UPDATE BLOG SET deleted_at = CURRENT_TIMESTAMP where id = :id", nativeQuery = true)
    void softDeleteById(@Param("id") Long id);




}
