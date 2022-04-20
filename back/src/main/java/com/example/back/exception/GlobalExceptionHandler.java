package com.example.back.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j

public class GlobalExceptionHandler {

    // 커스텀 에외처리
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponse> handleCustomException(final CustomException e) {
        log.error("handleCustomException: {}", e.getErrorCode());
        return ResponseEntity
                .status(e.getErrorCode().getStatus().value())
                .body(new ErrorResponse(e.getErrorCode()));
    }

//    // 405 에러
//    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
//    protected ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(final HttpRequestMethodNotSupportedException e) {
//        log.error("handleHttpRequestMethodNotSupportedException: {}", e.getMessage());
//        return ResponseEntity
//                .status(ErrorCode.METHOD_NOT_ALLOWED.getStatus().value())
//                .body(new ErrorResponse(ErrorCode.METHOD_NOT_ALLOWED));
//    }
//
//    // 500 에러
//    @ExceptionHandler(Exception.class)
//    protected ResponseEntity<ErrorResponse> handleException(final Exception e) {
//        log.error("handleException: {}", e.getMessage());
//        return ResponseEntity
//                .status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus().value())
//                .body(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR));
//    }
}
