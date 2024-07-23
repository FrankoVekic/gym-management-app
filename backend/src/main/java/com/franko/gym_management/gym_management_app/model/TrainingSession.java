package com.franko.gym_management.gym_management_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "training_sessions")
public class TrainingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TrainingType trainingType;

    @Column(nullable = false)
    private LocalDateTime date;

    @JsonIgnore
    @OneToMany(mappedBy = "trainingSession")
    private List<TrainingSessionTrainer> trainers;

    @JsonIgnore
    @OneToMany(mappedBy = "trainingSession")
    private List<Attendance> attendances;

}
