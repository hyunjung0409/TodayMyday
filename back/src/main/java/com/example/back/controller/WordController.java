package com.example.back.controller;

import com.example.back.dto.UserDto;
import com.example.back.dto.WordDto;
import com.example.back.entity.Word;
import com.example.back.repository.WordRepository;
import com.example.back.service.WordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/word")
@AllArgsConstructor
@Api(tags = {"단어 컨트롤러"})
public class WordController {

    private final WordService wordService;
    private final WordRepository wordRepository;

    @GetMapping("/readAll")
    @ApiOperation(value = "단어 불러오기", notes = "단어 불러오기", response = String.class)
    public ResponseEntity<List<String>> recommandWord(@RequestParam String userId){
//        List<String> words = wordService.pickRandomeWords();
        List<String> words = wordService.pickRandomWords(userId);
        return ResponseEntity.ok().body(words);
    }

    @GetMapping("/readTop")
    @ApiOperation(value = "연령+성별 단어 랭킹 3 불러오기", notes = "Top3 단어 불러오기", response = String.class)
    public ResponseEntity<List<String>> readWordsTop3(@RequestParam String userId){
        List<String> words = wordService.wordRanking(userId);
        return ResponseEntity.ok().body(words);
    }

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
