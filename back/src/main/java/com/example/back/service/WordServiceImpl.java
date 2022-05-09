package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import com.example.back.entity.Word;

import com.example.back.entity.WordLog;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.UserRepository;
import com.example.back.repository.WordLogRepository;
import com.example.back.repository.WordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class WordServiceImpl implements WordService{

    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DiaryRepository diaryRepository;
    private final WordLogRepository wordLogRepository;

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
    public void createWordLog(String word, String userId) {
        if(word.trim().isEmpty() || word == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        WordLog save = WordLog.builder()
                .word(word)
                .userId(userId)
                .selectedat(LocalDateTime.now())
                .build();

        wordLogRepository.save(save);

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

        Set<String> randomPickhSet = new HashSet<>();
        Set<String> selectedSet = new HashSet<>();

//        List<WordLog> wordLogsList = wordLogRepository.findWordLogsByUserId(userId);
//        if(wordLogsList != null) {
//            for (int i = 0; i < wordLogsList.size(); i++) {
//                selectedSet.add(wordLogsList.get(i).getWord());
//            }
//        }
        // 1. 현재 상태 5분이내에 추천받은 단어는 추천 안하려고 하는데 wordLogsList가 null 오류 발생함
        // 2. 아래 5가지의 조건으로 단어리스트를 불러오는 함수가 호출이 안됨 단어는 불러와도 리스트에 null이 담기는 오류가 발생
        // 해결

        for(int i = 1; i <= 5; i++){
            int hSize = randomPickhSet.size();
            //int sSize = selectedSet.size();
            String selectedWord = pickWordByCondition(i, gender, age);
            randomPickhSet.add(selectedWord);
            selectedSet.add(selectedWord);
            if(randomPickhSet.size() == hSize) {
                i--;
                continue;
            }
        }

        for (String selectedWord : randomPickhSet){
            createWordLog(selectedWord, userId);
            pickedWords.add(selectedWord);
        }


        return pickedWords;
    }

    @Override
    public String pickWordByCondition(int condition, String gender, String age) {
        Word selectedWord;
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

        for (int i = 0; i < wordList.size(); i++) {
            System.out.println("here : \n"+wordList.get(i));
        }

        int val = wordList.size();
        int ranValue = (int)(Math.random() * val);
        String[] wordListStr = wordList.get(ranValue).split(",");
        //System.out.println("요기 : "+wordListStr[0]);

        selectedWord = wordRepository.findWordByWord(wordListStr[0]);
        increaseFrequencyByAge(selectedWord, age);
        increaseFrequencyByGender(selectedWord, gender);
        //System.out.println("여기 : "+selectedWord);

        wordRepository.save(selectedWord);
        return selectedWord.getWord();
    }

    @Override
    public void increaseFrequencyByAge(Word selectedWord, String age) {
        if(age.equals("1")) {
            selectedWord.setTeens(selectedWord.getTeens()+1);
        } else if(age.equals("2")) {
            selectedWord.setTwenties(selectedWord.getTwenties()+1);
        } else if(age.equals("3")) {
            selectedWord.setThirties(selectedWord.getThirties()+1);
        } else if(age.equals("4")) {
            selectedWord.setFourties(selectedWord.getFourties()+1);
        } else if(age.equals("5")) {
            selectedWord.setFifties(selectedWord.getFifties()+1);
        } else if(age.equals("6")) {
            selectedWord.setOversixties(selectedWord.getOversixties()+1);
        }
    }

    @Override
    public void increaseFrequencyByGender(Word selectedWord, String gender) {
        if(gender.equals("male")){
            selectedWord.setMale(selectedWord.getMale()+1);
        } else if(gender.equals("female")) {
            selectedWord.setFemale(selectedWord.getFemale()+1);
        }
    }


}
