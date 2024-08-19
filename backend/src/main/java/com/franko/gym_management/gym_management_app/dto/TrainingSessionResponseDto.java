package com.franko.gym_management.gym_management_app.dto;

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
public class TrainingSessionResponseDto {

    private Long sessionId;
    private String trainingType;
    private LocalDateTime sessionDate;
    private Long numberOfPeople;
    private List<String> trainer;
    private int duration;
    private String description;
    private LocalDateTime deletedAt;

}
