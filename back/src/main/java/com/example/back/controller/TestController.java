package com.example.back.controller;

import com.example.back.entity.Dairy;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.DairyRepository;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
@AllArgsConstructor
public class TestController {

    private final DairyRepository dairyRepository;

    @GetMapping("/test1")
    public String test() {
        throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
    }

    @GetMapping("")
    @ApiOperation(value = "다이어리 전체 검색", notes = "모든 다이어리 출력", response = String.class)
    public ResponseEntity<List<Dairy>> readAllDairy(){ // 모든 다이어리를 불러옴

        List<Dairy> dairies = dairyRepository.findAll();
        return ResponseEntity.ok().body(dairies);
    }
}
