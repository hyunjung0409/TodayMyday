package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Diary;
import com.example.back.entity.User;
import com.example.back.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{

    private final DiaryRepository diaryRepository;


    @Override
    public boolean createDiary(DiaryDto diaryDto, User user) {

        // 단어가 없거나 내용이 없으면 (유효성 검사)
        // if(diaryDto.getWord().equals(null) || diaryDto.getContent().equals(null)) return  false;

        Diary save = Diary.builder()
                .image(diaryDto.getImage())
                .content(diaryDto.getContent())
                .createdat(LocalDateTime.now())
                .user(user)
                .word(diaryDto.getWord())
                .build();

        diaryRepository.save(save);
        return true;
    }

    @Override
    public Diary findDiary(Long dno) {
        return null;
    }

    @Override
    public Diary modifyDiary(Long dno, String userId, DiaryDto diaryDto) {
        Diary diary = diaryRepository.findDiaryByDno(dno);
        if(diary == null){ return null; }

        String id = diary.getUser().getUserId();
        if(!id.equals(userId)) { return null; }

        diary.setWord(diaryDto.getWord());
        diary.setImage(diaryDto.getImage());
        diary.setContent(diaryDto.getContent());

        System.out.println(diary.getWord()+" "+diary.getContent());

        diaryRepository.save(diary);

        return diary;
    }

    @Override
    public Boolean deleteDiary(Long dno, String userId) {
        Diary diary = diaryRepository.findDiaryByDno(dno);

        if(diary == null){ return false; }

        String id = diary.getUser().getUserId();
        if(!id.equals(userId)) { return false; }

        diaryRepository.delete(diary);

        return true;

    }

    @Override
    public List<DiaryDto> searchDiaries(String keyword, String userId) {
        List<Diary> diares = diaryRepository.findByContentContains(keyword);
        DiaryDto diaryDto = new DiaryDto();

        List<DiaryDto> my_daires = new ArrayList<>();
        for (Diary diary : diares) {
            if (diary.getUser().getUserId().equals(userId)) {
                diaryDto.setContent(diary.getContent());
                diaryDto.setImage(diary.getImage());
                diaryDto.setWord(diary.getWord());
                diaryDto.setNickname(diary.getUser().getNickname());
                my_daires.add(diaryDto);
            }
        }
        return my_daires;
    }

    @Override
    public Diary readDiary(long dno) {
        Diary diary = diaryRepository.findDiaryByDno(dno);

        return diary;
    }


}
