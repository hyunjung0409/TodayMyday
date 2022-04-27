package com.example.back.service;

import com.example.back.dto.WordDto;
import com.example.back.entity.Word;

import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.WordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WordServiceImpl implements WordService{

    private final WordRepository WordRepository;

    @Override
    public void createWord(String word) {

        if(word.trim().isEmpty() || word == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        Word save = Word.builder()
                .word(word)
                .teens(0)
                .twenties(0)
                .thirties(0)
                .fourties(0)
                .fifties(0)
                .oversixties(0)
                .male(0)
                .female(0)
                .build();

        WordRepository.save(save);


    }
}
