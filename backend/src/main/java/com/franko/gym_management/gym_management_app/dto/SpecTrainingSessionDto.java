package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.TrainingType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpecTrainingSessionDto {

    private Long id;
    private TrainingType trainingType;
    private LocalDateTime date;
    private TrainerNameDto trainer;

}
