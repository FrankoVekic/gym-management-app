package com.franko.gym_management.gym_management_app.enums;

public enum StatusType {
    // for members
    ACTIVE,
    INACTIVE,
    SUSPENDED,
    EXPIRED,
    PENDING,

    // for trainers
    AVAILABLE,
    UNAVAILABLE,
    ILLNESS,
    IN_SESSION,
    TERMINATED,
    ON_LEAVE
}
