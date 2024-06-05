package com.franko.gym_management.gym_management_app.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TestimonialUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "testemonial_id")
    private Testimonial testimonial;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
