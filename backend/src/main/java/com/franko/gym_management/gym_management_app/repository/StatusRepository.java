package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.enums.StatusType;
import com.franko.gym_management.gym_management_app.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    List<Status> findAllByOrderByIdAsc();

    @Query(value = """
            SELECT * FROM statuses s WHERE s.status_type = :status;
            """, nativeQuery = true)
    Status findByStatusType(String status);
}
