package com.franko.gym_management.gym_management_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "training_sessions_trainers")
public class TrainingSessionTrainer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "training_session_id")
    private TrainingSession trainingSession;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;
}
