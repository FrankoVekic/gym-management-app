package com.franko.gym_management.gym_management_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
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

    @ManyToMany
    @JoinTable(name = "training_sessions_trainers",
    joinColumns = @JoinColumn(name = "training_session_id"),
    inverseJoinColumns = @JoinColumn(name = "trainer_id"))
    private List<Trainer> trainers;

    @JsonIgnore
    @OneToMany(mappedBy = "trainingSession")
    private List<Attendance> attendances;

}
