package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

    List<Testimonial> findAllByOrderByIdAsc();
}
