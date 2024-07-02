package com.franko.gym_management.gym_management_app.exceptions;

import org.springframework.http.HttpStatus;

public class EmailExistsException extends RuntimeException {

    private HttpStatus status;

    public EmailExistsException(String message) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
    }

    public EmailExistsException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

