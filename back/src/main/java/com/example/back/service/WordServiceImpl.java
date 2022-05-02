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

           Word str = Word.builder()
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

        wordRepository.save(str);
    }

    @Override
    public Word increaseFrequency(String userId, DiaryDto diaryDto) {
        User user = userRepository.findByUserId(userId);
        Word word = wordRepository.findWordByWord(diaryDto.getWord());

        if(user == null || word == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        if(user.getAge().equals("1")){
            word.setTeens(word.getTeens()+1);
        } else if(user.getAge().equals("2")){
            word.setTwenties(word.getTwenties()+1);
        } else if(user.getAge().equals("3")){
            word.setThirties(word.getThirties()+1);
        } else if(user.getAge().equals("4")){
            word.setFourties(word.getFourties()+1);
        } else if(user.getAge().equals("5")){
            word.setFifties(word.getFifties()+1);
        } else if(user.getAge().equals("6")){
            word.setOversixties(word.getOversixties()+1);
        }

        if(user.getGender().equals("male")) {
            word.setMale(word.getMale()+1);
        } else {
            word.setFemale(word.getFemale()+1);
        }

        wordRepository.save(word);

        return word;
    }

    @Override
    public List<String> pickRandomWords(String userId) {
        // 각 조건에 따른 각각의 5개의 단어들을 담을 배열
        List<String> pickedWords = new ArrayList<>();
        User user = userRepository.findByUserId(userId);
        String gender = user.getGender();
        String age = user.getAge();

        for(int i = 1; i <= 5; i++){
            String selectedWord = pickWordByCondition(5, gender, age);
            pickedWords.add(selectedWord);
        }

        return pickedWords;
    }

    @Override
    public String pickWordByCondition(int condition, String gender, String age) {
        String selectedWord = "";
        List<String> wordList = new ArrayList<>();

        switch (condition){
            case 1:
                if(gender.equals("male")) {
                    if(age.equals("1")) {
                        wordList = wordRepository.findWordByTeensAndMale();
                    } else if(age.equals("2")) {
                        wordList = wordRepository.findWordByTwentiesAndMale();
                    } else if(age.equals("3")) {
                        wordList = wordRepository.findWordByThirtiesAndMale();
                    } else if(age.equals("4")) {
                        wordList = wordRepository.findWordByFourtiesAndMale();
                    } else if(age.equals("5")) {
                        wordList = wordRepository.findWordByFiftiesAndMale();
                    } else if(age.equals("6")) {
                        wordList = wordRepository.findWordByOversixtiesAndMale();
                    }
                } else if (gender.equals("female")){
                    if(age.equals("1")) {
                        wordList = wordRepository.findWordByTeensAndFemale();
                    } else if(age.equals("2")) {
                        wordList = wordRepository.findWordByTwentiesAndFemale();
                    } else if(age.equals("3")) {
                        wordList = wordRepository.findWordByThirtiesAndFemale();
                    } else if(age.equals("4")) {
                        wordList = wordRepository.findWordByFourtiesAndFemale();
                    } else if(age.equals("5")) {
                        wordList = wordRepository.findWordByFiftiesAndFemale();
                    } else if(age.equals("6")) {
                        wordList = wordRepository.findWordByOversixtiesAndFemale();
                    }
                }
                break;
            case 2:
                if(age.equals("1")) {
                    wordList = wordRepository.findWordByTeens();
                } else if(age.equals("2")) {
                    wordList = wordRepository.findWordByTwenties();
                } else if(age.equals("3")) {
                    wordList = wordRepository.findWordByThirties();
                } else if(age.equals("4")) {
                    wordList = wordRepository.findWordByFourties();
                } else if(age.equals("5")) {
                    wordList = wordRepository.findWordByFifties();
                } else if(age.equals("6")) {
                    wordList = wordRepository.findWordByOversixties();
                }
                break;
            case 3:
                if(gender.equals("male")){
                    wordList = wordRepository.findWordByMale();
                } else if(gender.equals("female")) {
                    wordList = wordRepository.findWordByFemale();
                }
                break;
            case 4:
                wordList = wordRepository.findWordByAll();
                break;
            case 5:
                wordList = wordRepository.findWordByRandom();
                break;
        }


        int val = wordList.size();
        int ranValue = (int)(Math.random() * val);
        selectedWord = wordList.get(ranValue);

        return selectedWord;
    }

}
