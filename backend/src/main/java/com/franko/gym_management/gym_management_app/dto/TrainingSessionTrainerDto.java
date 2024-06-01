package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Trainer;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSessionTrainerDto {


    private Long id;
    private TrainingSession trainingSession;
    private Trainer trainer;
}
