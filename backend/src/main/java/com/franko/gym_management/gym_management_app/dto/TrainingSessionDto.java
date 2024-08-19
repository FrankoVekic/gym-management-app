package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.*;
import jakarta.persistence.Column;
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
    private Trainer trainer;
    private List<Attendance> attendances;
    private LocalDateTime deletedAt;
}
