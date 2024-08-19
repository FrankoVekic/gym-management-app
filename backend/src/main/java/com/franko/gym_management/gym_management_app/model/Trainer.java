package com.franko.gym_management.gym_management_app.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "trainers")
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String description;

    @ManyToOne
    private User user;

    @ManyToOne
    private Status status;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<TrainingSession> trainingSessions;
}
