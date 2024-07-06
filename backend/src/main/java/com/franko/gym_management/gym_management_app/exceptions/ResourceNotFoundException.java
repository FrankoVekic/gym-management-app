package com.franko.gym_management.gym_management_app.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final HttpStatus status;

    public ResourceNotFoundException(String message) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
    }

    public ResourceNotFoundException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

}
