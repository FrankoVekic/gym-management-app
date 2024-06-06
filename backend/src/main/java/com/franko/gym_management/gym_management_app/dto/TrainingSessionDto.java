package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Attendance;
import com.franko.gym_management.gym_management_app.model.TrainingSessionTrainer;
import com.franko.gym_management.gym_management_app.model.TrainingPackage;
import com.franko.gym_management.gym_management_app.model.TrainingType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingSessionDto {

    private Long id;
    private TrainingType trainingType;
    private LocalDateTime date;
    private List<TrainingSessionTrainer> trainers;
    private List<Attendance> attendances;
}
