package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    List<Attendance> findAllByOrderByIdAsc();
}
