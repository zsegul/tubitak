package yte.intern.personel.bilgi.yonetim.sistemi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorResponse>> handleException(MethodArgumentNotValidException exc) {

        List<ErrorResponse> errors = exc.getFieldErrors().stream()
                .map(fieldError -> new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
//                        fieldError.getField() + ": " + fieldError.getDefaultMessage(),
                        fieldError.getDefaultMessage(),
                        System.currentTimeMillis()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exc) {

        ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                exc.getMessage(),
                System.currentTimeMillis()
        );

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
