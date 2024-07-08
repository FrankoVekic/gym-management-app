package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
