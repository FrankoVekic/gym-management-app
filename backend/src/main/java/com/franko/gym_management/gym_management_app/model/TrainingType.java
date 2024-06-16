package com.franko.gym_management.gym_management_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="training_types")
public class TrainingType {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, unique = true)
        private String name;

        @Column(nullable = false)
        private int durationInMinutes;

        @Column(columnDefinition = "text", nullable = false)
        private String description;

        @Column(columnDefinition = "varchar(255)")
        private String image;

}
