package com.franko.gym_management.gym_management_app.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingPackageDto {

    private Long id;
    private String name;
    private BigDecimal price;
    private String features;
}
