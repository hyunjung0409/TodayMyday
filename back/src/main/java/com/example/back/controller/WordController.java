package com.example.back.controller;

import com.example.back.dto.WordDto;
import com.example.back.entity.Word;
import com.example.back.service.WordService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/word")
@AllArgsConstructor
public class WordController {

    private final WordService wordService;

    @PostMapping("/create")
    @ApiOperation(value = "단어 추가", notes = "단어 추가하기(관리자용)", response = String.class)
    public ResponseEntity<Map<String, Object>> createWord(@RequestParam String word){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        wordService.createWord(word);

        hashMap.put("word", word);
        hashMap.put("status", HttpStatus.OK);
        return ResponseEntity.ok().body(hashMap);
    }

}
