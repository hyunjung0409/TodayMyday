package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Diary;
import com.example.back.entity.User;

import java.util.List;

public interface DiaryService {
    Diary createDiary(DiaryDto diaryDto, User user);
    Diary findDiary(Long dno);
    Diary modifyDiary(Long dno, String userId, DiaryDto diaryDto);
    Boolean deleteDiary(Long dno, String userId);
    List<DiaryDto> searchDiariesByContent(String keyword, String userId);
    Diary readDiary(long dno);
    List<String> readMyword(String userId);
    List<DiaryDto> searchDiariesByWord(String word, String userId);
    List<DiaryDto> searchAllDiariesByContent(String keyword);
    List<DiaryDto> searchAllDiariesByWord(String word);
    List<String> readAllword();

}
