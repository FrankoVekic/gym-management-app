package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDto {


    private Long id;
    private TrainingSession trainingSession;
    private Member member;
}
