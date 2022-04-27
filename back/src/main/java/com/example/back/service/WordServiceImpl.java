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
import org.springframework.security.core.parameters.P;
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
    public Word increaseFrequency(String userId, DiaryDto diaryDto) {
        User user = userRepository.findByUserId(userId);
        Word word = wordRepository.findWordByWord(diaryDto.getWord());

        if(user == null || word == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        String gender = user.getGender();
        String age = user.getAge();

        if(gender.equals("male")){
            word.setMale(word.getMale()+1);
        } else if(gender.equals("female")){
            word.setFemale(word.getFemale()+1);
        }

        if(age.equals("1")){
            word.setTeens(word.getTeens()+1);
        }else if(age.equals("2")) {
            word.setTwenties(word.getTwenties()+1);
        }else if(age.equals("3")) {
            word.setThirties(word.getThirties()+1);
        }else if(age.equals("4")) {
            word.setFourties(word.getFourties()+1);
        }else if(age.equals("5")) {
            word.setFifties(word.getFifties()+1);
        } else {
            word.setOversixties(word.getOversixties()+1);
        }

        wordRepository.save(word);

        return word;
    }

}
