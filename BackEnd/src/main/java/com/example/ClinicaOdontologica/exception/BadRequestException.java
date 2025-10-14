package com.example.ClinicaOdontologica.exception;

public class BadRequestException extends Exception {
    public BadRequestException(){
        super("El campo esta vacio");
    }

    public BadRequestException(String message){
        super(message);
    }
}
