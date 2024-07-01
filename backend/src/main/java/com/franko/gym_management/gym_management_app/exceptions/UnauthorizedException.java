package com.franko.gym_management.gym_management_app.exceptions;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends RuntimeException {
    private HttpStatus status;

    public UnauthorizedException(String message) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
    }

    public UnauthorizedException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
