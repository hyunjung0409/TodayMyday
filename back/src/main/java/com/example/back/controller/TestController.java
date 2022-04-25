package com.example.back.controller;

import com.example.back.dto.TestWordDto;
import com.example.back.entity.Diary;
import com.example.back.entity.TestWord;
import com.example.back.entity.Word;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.WordRepository;
import com.example.back.service.WordService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
@AllArgsConstructor
public class TestController {

    private final DiaryRepository diaryRepository;
    private final WordService wordService;

    @GetMapping("/test1")
    public String test() {
        throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
    }

    @GetMapping("")
    @ApiOperation(value = "다이어리 전체 검색", notes = "모든 다이어리 출력", response = String.class)
    public ResponseEntity<List<Diary>> readAllDiary(){ // 모든 다이어리를 불러옴

        List<Diary> dairies = diaryRepository.findAll();
        return ResponseEntity.ok().body(dairies);
    }

    @GetMapping("/word")
    @ApiOperation(value = "단어 뽑기", notes = "랜덤 단어 5개 뽑기", response = String.class)
    public ResponseEntity<List<String>> recomandWord(){
        List<String> words = wordService.pickWords();
        return ResponseEntity.ok().body(words);
    }

    @PostMapping("/word")
    @ApiOperation(value = "단어 추가", notes = "테스트용 단어 추가하기", response = String.class)
    public ResponseEntity<Object> createWord(@RequestBody TestWordDto wordDto){

        wordService.createWord(wordDto);

        return ResponseEntity.ok().body(HttpStatus.OK);

    }
}
