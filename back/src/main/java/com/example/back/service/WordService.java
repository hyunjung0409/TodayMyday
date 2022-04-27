package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.WordDto;
import com.example.back.entity.Word;

public interface WordService {

    void createWord(String word);
    Word increaseFrequency(String userId, DiaryDto diaryDto);

}
