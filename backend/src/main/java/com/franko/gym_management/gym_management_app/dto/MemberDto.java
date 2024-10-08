package com.franko.gym_management.gym_management_app.dto;


import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.TrainingPackage;
import com.franko.gym_management.gym_management_app.model.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class MemberDto {

    private Long id;
    private User user;
    private Status status;
    private LocalDateTime joinedDate;
    private TrainingPackage trainingPackage;
    private LocalDateTime trainingPackageExpirationDate;
}
