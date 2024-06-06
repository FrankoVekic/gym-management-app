package com.franko.gym_management.gym_management_app.model;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Entity(name = "training_packages")
public class TrainingPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar(255)",nullable = false)
    private String name;
    @Column(nullable = false)
    private BigDecimal price;
    @Column(columnDefinition = "text",nullable = false)
    private String features;

}
