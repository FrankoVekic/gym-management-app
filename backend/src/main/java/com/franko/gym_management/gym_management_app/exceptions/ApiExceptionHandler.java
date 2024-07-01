package com.franko.gym_management.gym_management_app.exceptions;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.security.SignatureException;


@Component
@ControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = {BadCredentialsException.class})
    public ResponseEntity<ExceptionResponse> handleBadCredentials(BadCredentialsException e) {
        ExceptionResponse exception = ExceptionResponse
                .builder()
                .httpStatus(HttpStatus.UNAUTHORIZED)
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(exception.getHttpStatus()).body(exception);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = {AuthenticationServiceException.class})
    public ResponseEntity<ExceptionResponse> handleAuthenticationServiceException(AuthenticationServiceException e) {
        ExceptionResponse exception = ExceptionResponse
                .builder()
                .httpStatus(HttpStatus.NOT_FOUND)
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(exception.getHttpStatus()).body(exception);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = {MalformedJwtException.class, SignatureException.class, ExpiredJwtException.class})
    public ResponseEntity<ExceptionResponse> handleJwtException(Exception e) {
        ExceptionResponse exception = ExceptionResponse
                .builder()
                .httpStatus(HttpStatus.UNAUTHORIZED)
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(exception.getHttpStatus()).body(exception);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {UnauthorizedException.class})
    public ResponseEntity<ExceptionResponse> handleUserLoginException(UnauthorizedException e) {
        ExceptionResponse exception = ExceptionResponse
                .builder()
                .httpStatus(e.getStatus())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(exception.getHttpStatus()).body(exception);
    }
}
