package com.franko.gym_management.gym_management_app.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.franko.gym_management.gym_management_app.model.TestimonialUser;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialDto {

    private Long id;
    @JsonIgnore
    private List<TestimonialUser> users;
    
    private String content;
    private LocalDateTime createdAt;


}
