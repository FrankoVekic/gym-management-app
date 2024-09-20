package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.dto.TrainerNameDto;
import com.franko.gym_management.gym_management_app.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    List<Trainer> findAllByOrderByIdAsc();


    @Query(value = """
               SELECT t.id, u.first_name, u.last_name FROM trainers t
               INNER JOIN users u
               ON u.id = t.user_id
            """, nativeQuery = true)
    List<Object[]> getTrainerFirstnamesAndLastNames();

    @Query(value = """
    SELECT u.first_name, u.last_name, u.email, u.image, u."role", s.status_type AS status, t.description, t.id
    FROM users u
    LEFT JOIN trainers t ON t.user_id = u.id
    LEFT JOIN statuses s ON s.id = t.status_id
    WHERE u.id = :id
""", nativeQuery = true)
    List<Object[]> getTrainerProfileDetails(@Param("id") Long id);
}
