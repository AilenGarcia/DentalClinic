package com.example.ClinicaOdontologica.exception;

public class ExistenteException extends Exception{

    public ExistenteException (){
        super("El objeto ya existe");
    }

    public ExistenteException(String message){
        super(message);
    }
}
