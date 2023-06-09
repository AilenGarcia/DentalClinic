package com.example.ClinicaOdontologica.exception;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.File;

@ControllerAdvice
public class GlobalException {
    private static final Logger logger = LogManager.getLogger(GlobalException.class);
    private final static String log4jConfigFile = System.getProperty("user.dir") + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "log4j2.xml";

    @ExceptionHandler({NotFoundException.class})
        public ResponseEntity<String> error(NotFoundException exception){
        logger.error(exception.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

    @ExceptionHandler({ExistenteException.class})
        public ResponseEntity<?> error(ExistenteException exception){
        logger.error(exception.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<?> error(BadRequestException exception){
        logger.error(exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
