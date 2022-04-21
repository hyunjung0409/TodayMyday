package com.example.back.service;

import com.example.back.dto.TestWordDto;
import com.example.back.entity.TestWord;
import com.example.back.entity.Word;

import java.util.List;

public interface WordService {

    boolean createWord(TestWordDto testWordDto);
    List<String> pickWords();

}
