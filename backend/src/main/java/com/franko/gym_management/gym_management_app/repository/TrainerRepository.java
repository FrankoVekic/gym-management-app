package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.dto.TrainerNameDto;
import com.franko.gym_management.gym_management_app.model.Trainer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    @Query(value = "SELECT * FROM trainers WHERE removed_at IS NULL", nativeQuery = true)
    List<Trainer> findAllByOrderByIdAsc();

    @Query(value = " select * from trainers where removed_at is null and user_id != :id", nativeQuery = true)
    List<Trainer> findTrainersForSpecTrainer(@Param("id") Long id);

    @Modifying
    @Query(value=" UPDATE trainers SET removed_at = CURRENT_TIMESTAMP where id = :id", nativeQuery = true)
    @Transactional
    void softDeleteById(@Param("id") Long id);

    @Query(value = """
               SELECT t.id, u.first_name, u.last_name FROM trainers t
               INNER JOIN users u
               ON u.id = t.user_id WHERE t.removed_at IS NULL
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

    Optional<Trainer> findByUserId(Long userId);
}
