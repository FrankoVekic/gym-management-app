package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    List<Status> findAllByOrderByIdAsc();
}
