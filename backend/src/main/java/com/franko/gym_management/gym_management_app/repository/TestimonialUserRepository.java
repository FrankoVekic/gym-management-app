package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.TestimonialUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialUserRepository extends JpaRepository<TestimonialUser, Long> {

    List<TestimonialUser> findAllByOrderByIdAsc();

    @Query(value = "SELECT * FROM testimonial_user ORDER BY RANDOM() LIMIT 3", nativeQuery = true)
    List<TestimonialUser> findTwoRandomTestimonialUsers();

}
