package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.dto.TrainerNameDto;
import com.franko.gym_management.gym_management_app.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}
