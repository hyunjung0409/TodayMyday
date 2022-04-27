package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.WordDto;
import com.example.back.entity.Diary;
import com.example.back.entity.User;
import com.example.back.entity.Word;

import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.UserRepository;
import com.example.back.repository.WordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WordServiceImpl implements WordService{

    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DiaryRepository diaryRepository;

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

        wordRepository.save(save);
    }

    @Override
    public void increaseFrequency(String userId, DiaryDto diaryDto) {
        User user = userRepository.findByUserId(userId);
        Word word = wordRepository.findWordByWord(diaryDto.getWord());
        Diary diary = diaryRepository.findDiaryByDno(diaryDto.getDno());

        String gender = user.getGender();
        String age = user.getAge();

        if(user.getGender().equals("male")){

        }




    }

}
