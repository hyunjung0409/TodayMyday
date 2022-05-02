package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Word;

import java.util.List;

public interface WordService {

    void createWord(String word);
    Word increaseFrequency(String userId, DiaryDto diaryDto);
    List<String> pickRandomWords(String userId);
    String pickWordByCondition(int condition, String gender, String age);

}
