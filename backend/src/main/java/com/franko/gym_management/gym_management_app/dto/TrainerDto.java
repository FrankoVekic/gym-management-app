package com.franko.gym_management.gym_management_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String description;
    private User user;
    private Status status;
    @JsonIgnore
    private List<TrainingSession> trainingSessions;
}
