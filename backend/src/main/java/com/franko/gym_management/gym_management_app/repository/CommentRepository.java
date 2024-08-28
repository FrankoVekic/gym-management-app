package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Comment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {


    @Modifying
    @Query(value="UPDATE COMMENT SET deleted_at = CURRENT_TIMESTAMP where id = :id", nativeQuery = true)
    @Transactional
    void softDeleteById(@Param("id") Long id);
}
