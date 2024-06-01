package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import com.franko.gym_management.gym_management_app.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainerDto {

    private Long id;
    private User user;
    private Status status;
    private List<TrainingSession> trainingSessions;
}
