package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByOrderByIdAsc();

    Optional<User> findByEmail(String email);

    Optional<User> findByResetToken(String resetToken);
}
