package com.franko.gym_management.gym_management_app.exceptions;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
public class ExceptionResponse {

    private String message;
    private HttpStatus httpStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy' 'HH:mm:ss")
    private LocalDateTime timestamp;

    public ExceptionResponse(String message, HttpStatus status, LocalDateTime timestamp){

        this.message = message;
        this.httpStatus = status;
        this.timestamp = LocalDateTime.now();

    }
}
