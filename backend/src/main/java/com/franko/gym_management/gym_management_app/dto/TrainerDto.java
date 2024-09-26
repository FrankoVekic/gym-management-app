package com.franko.gym_management.gym_management_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import com.franko.gym_management.gym_management_app.model.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrainerDto {

    private Long id;
    private String description;
    private User user;
    private Status status;
    private LocalDateTime removedAt;
    @JsonIgnore
    private List<TrainingSession> trainingSessions;
}
