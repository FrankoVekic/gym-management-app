package com.franko.gym_management.gym_management_app.exceptions;


public class UnauthorizedException extends RuntimeException{

    public UnauthorizedException(String message){
        super(message);
    }

}
