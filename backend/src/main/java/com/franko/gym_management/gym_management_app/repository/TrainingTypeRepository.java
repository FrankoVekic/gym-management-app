package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.TrainingPackage;
import com.franko.gym_management.gym_management_app.model.TrainingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingTypeRepository extends JpaRepository<TrainingType, Long> {

    List<TrainingType> findAllByOrderByIdAsc();
}
