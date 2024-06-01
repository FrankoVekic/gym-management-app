package com.franko.gym_management.gym_management_app.dto;


import com.franko.gym_management.gym_management_app.model.Attendance;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class MemberDto {

    private Long id;
    private User user;
    private Status status;
    private LocalDateTime joinedDate;
    private List<Attendance> attendances;
}
