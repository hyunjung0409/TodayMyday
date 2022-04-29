package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import com.example.back.entity.Word;

import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.UserRepository;
import com.example.back.repository.WordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class WordServiceImpl implements WordService{

    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DiaryRepository diaryRepository;

    @Override
    public void createWord(String userId, String word) {

        if(word.trim().isEmpty() || word == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

//        Word str = wordRepository.findWordByWord(word);
        User user = userRepository.findByUserId(userId);
        System.out.println(user.getAge()+" "+user.getGender());
        Word str = wordRepository.findWordByWordAndGender(word, user.getGender());

        //System.out.println("str2 : "+str2.getWord());
        if(str == null) {
            str = Word.builder()
                    .word(word)
                    .age(user.getAge())
                    .gender(user.getGender())
                    .build();
        } else {
            str.setCount(str.getCount()+1);
        }

        wordRepository.save(str);
    }

    @Override
    public Word increaseFrequency(String userId, DiaryDto diaryDto) {
        User user = userRepository.findByUserId(userId);
        Word word = wordRepository.findWordByWord(diaryDto.getWord());

        if(user == null || word == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        wordRepository.save(word);

        return word;
    }

    @Override
    public List<String> pickRandomWords(UserDto userDto) {
        // 각 조건에 따른 각각의 5개의 단어들을 담을 배열
        List<String> pickedWords = new ArrayList<>();
        String gender = userDto.getGender();
        String age = userDto.getAge();

        for(int i = 0; i < 5; i++){
            String selectedWord = pickWordByCondition(i, gender, age);
            pickedWords.add(selectedWord);
        }

        return pickedWords;
    }

    @Override
    public String pickWordByCondition(int condition, String gender, String age) {
        String selectedWord = "";
        List<String> wordList = new ArrayList<>();
        int len = 0;
        int index = 0;
        String year = "";

        return selectedWord;
    }

}
