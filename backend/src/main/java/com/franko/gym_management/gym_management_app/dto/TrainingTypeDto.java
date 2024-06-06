package com.franko.gym_management.gym_management_app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingTypeDto {

    private Long id;

    @NotNull
    private String name;

    private int durationInMinutes;
}
