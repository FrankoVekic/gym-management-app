package com.franko.gym_management.gym_management_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponseDto {

    private Long id;
    private String firstname;
    private String lastname;
    private Long statusId;
    private String trainingPackage;
    private LocalDateTime trainingPackageExpirationDate;
}
