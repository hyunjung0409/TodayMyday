package com.example.back.controller;

import com.example.back.dto.UserDto;
import com.example.back.dto.WordDto;
import com.example.back.entity.Word;
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
@RequestMapping("/word")
@AllArgsConstructor
public class WordController {

    private final WordService wordService;
    private final WordRepository wordRepository;

    @GetMapping("/readAll")
    @ApiOperation(value = "단어 불러오기", notes = "단어 불러오기(관리자용)", response = String.class)
    public ResponseEntity<List<String>> recommandWord(@RequestBody UserDto userDto){
//        List<String> words = wordService.pickRandomeWords();
        List<String> words = wordService.pickRandomWords(userDto);
        return ResponseEntity.ok().body(words);
    }

    @PostMapping("/create")
    @ApiOperation(value = "단어 추가", notes = "단어 추가하기(관리자용)", response = String.class)
    public ResponseEntity<Map<String, Object>> createWord(@RequestParam String userId, @RequestParam String word){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        wordService.createWord(userId, word);

        hashMap.put("word", word);
        hashMap.put("status", HttpStatus.OK);
        return ResponseEntity.ok().body(hashMap);
    }

}
