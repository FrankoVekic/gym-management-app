package com.franko.gym_management.gym_management_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberStatusUpdateDto {

    private Long statusId;
    private Long memberId;
}
