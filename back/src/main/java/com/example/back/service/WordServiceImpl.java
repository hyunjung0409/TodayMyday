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
//        for (int i = 0; i < wordList.size(); i++) {
//            System.out.println("word : "+wordList.get(i).split(",")[0]);
//        }

        switch (age){
            case "1":
                year = "teens";
                break;
            case "2":
                year = "twenties";
                break;
            case "3":
                year = "thirties";
                break;
            case "4":
                year = "fourties";
                break;
            case "5":
                year = "fifties";
                break;
            case "6":
                year = "oversixties";

        }

        System.out.println("year : "+year);
        System.out.println("gender : "+gender);

        switch (condition) {
            case 0: // 연령대 + 성별
                wordList = wordRepository.findWordsByGenderAndAge("male");
                if(wordList.size() > 20) len = wordList.size();
                else len = wordList.size();

                for (int i = 0; i < wordList.size(); i++) {
                    System.out.println("word : "+wordList.get(i));
                }

                index = (int)(Math.random()*len);
                selectedWord = wordList.get(index);
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            case 5:

                break;
        }


        return selectedWord;
    }

}
