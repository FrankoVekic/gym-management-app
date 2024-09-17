package com.franko.gym_management.gym_management_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileDto {

    private String firstName, lastName, email, role, image, trainingPackageName, status;

    private LocalDateTime joinedDate, trainingPackageExpirationDate;

}
