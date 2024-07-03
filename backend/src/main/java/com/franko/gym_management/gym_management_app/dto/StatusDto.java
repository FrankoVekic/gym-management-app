package com.franko.gym_management.gym_management_app.dto;

import com.franko.gym_management.gym_management_app.enums.StatusType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusDto {

    private Long id;
    private StatusType statusType;

}
