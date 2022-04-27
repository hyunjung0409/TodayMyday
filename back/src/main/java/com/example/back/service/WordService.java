package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.WordDto;

public interface WordService {

    void createWord(String word);
    void increaseFrequency(String userId, DiaryDto diaryDto);

}
