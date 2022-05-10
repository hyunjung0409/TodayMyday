package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Diary;
import com.example.back.entity.Liked;
import com.example.back.entity.User;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.LikedRepository;
import com.example.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final LikedService likedService;
    private final LikedRepository likedRepository;


    @Override
    public Diary createDiary(DiaryDto diaryDto, User user) {

        // 단어가 없거나 내용이 없으면 (유효성 검사)
        if(diaryDto.getWord().equals(null) || diaryDto.getContent().equals(null))
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);

        Diary save = Diary.builder()
                .image(diaryDto.getImage())
                .content(diaryDto.getContent())
                .createdat(LocalDateTime.now())
                .user(user)
                .word(diaryDto.getWord())
                .view(0)
                .liked(0)
                .build();

        diaryRepository.save(save);

        return save;
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
    public List<DiaryDto> searchDiariesByContent(String keyword, String userId) {
        List<Diary> diaries = diaryRepository.findByContentContains(keyword);
        if(diaries == null) {
            return null;
        }
        else {
            List<DiaryDto> my_daires = new ArrayList<>();
            for (Diary diary : diaries) {
                DiaryDto diaryDto = new DiaryDto();
                if (diary.getUser().getUserId().equals(userId)) {
                    diaryDto.setCreatedat(diary.getCreatedat());
                    diaryDto.setDno(diary.getDno());
                    diaryDto.setContent(diary.getContent());
                    diaryDto.setImage(diary.getImage());
                    diaryDto.setWord(diary.getWord());
                    diaryDto.setNickname(diary.getUser().getNickname());
                    diaryDto.setProfile_image(diary.getUser().getImage());
                    diaryDto.setLiked(likedService.readLiked(diary.getDno()));
                    diaryDto.setView(diary.getView());
                    my_daires.add(diaryDto);
                }
            }
            return my_daires;
        }
    }

    @Override
    public Diary readDiary(long dno) {
        Diary diary = diaryRepository.findDiaryByDno(dno);
        diary.setLiked(likedService.readLiked(dno));

        return diary;
    }

    @Override
    public List<String> readMyword(String userId) {
        List<Diary> diaries = diaryRepository.findByUserId(userId);

        if(diaries == null) {
            return null;
        }
        else {
            List<String> mywords = new ArrayList<>();

            for (Diary diary : diaries) {
                if (!mywords.contains(diary.getWord())) {
                    mywords.add(diary.getWord());
                }
            }

            return mywords;
        }


    }

    @Override
    public List<DiaryDto> searchDiariesByWord(String word, String userId) {
        List<Diary> diaries = diaryRepository.findDiaryByWord(word);

        if(diaries == null) {
            return null;
        }
        else {
            List<DiaryDto> my_daires = new ArrayList<>();
            for (Diary diary : diaries) {
                DiaryDto diaryDto = new DiaryDto();
                if (diary.getUser().getUserId().equals(userId)) {
                    diaryDto.setDno(diary.getDno());
                    diaryDto.setCreatedat(diary.getCreatedat());
                    diaryDto.setContent(diary.getContent());
                    diaryDto.setImage(diary.getImage());
                    diaryDto.setWord(diary.getWord());
                    diaryDto.setNickname(diary.getUser().getNickname());
                    diaryDto.setProfile_image(diary.getUser().getImage());
                    diaryDto.setLiked(likedService.readLiked(diary.getDno()));
                    diaryDto.setView(diary.getView());
                    my_daires.add(diaryDto);
                }
            }
            return my_daires;
        }
    }

    @Override
    public List<DiaryDto> searchAllDiariesByContent(String keyword) {
        List<Diary> diaries = diaryRepository.findByContentContains(keyword);

        if(diaries == null) {
            return null;
        }

        else {
            List<DiaryDto> all_diaries = new ArrayList<>();
            for (Diary diary : diaries) {
                DiaryDto diaryDto = new DiaryDto();
                diaryDto.setCreatedat(diary.getCreatedat());
                diaryDto.setDno(diary.getDno());
                diaryDto.setContent(diary.getContent());
                diaryDto.setImage(diary.getImage());
                diaryDto.setWord(diary.getWord());
                diaryDto.setNickname(diary.getUser().getNickname());
                diaryDto.setProfile_image(diary.getUser().getImage());
                diaryDto.setLiked(likedService.readLiked(diary.getDno()));
                diaryDto.setView(diary.getView());
                all_diaries.add(diaryDto);
            }
            return all_diaries;
        }

    }

    @Override
    public List<DiaryDto> searchAllDiariesByWord(String word) {
        List<Diary> diaries = diaryRepository.findDiaryByWord(word);

        if (diaries == null) {
            return null;
        }
        else {
            List<DiaryDto> all_diaries = new ArrayList<>();
            for (Diary diary : diaries) {
                DiaryDto diaryDto = new DiaryDto();
                diaryDto.setDno(diary.getDno());
                diaryDto.setCreatedat(diary.getCreatedat());
                diaryDto.setContent(diary.getContent());
                diaryDto.setImage(diary.getImage());
                diaryDto.setWord(diary.getWord());
                diaryDto.setNickname(diary.getUser().getNickname());
                diaryDto.setProfile_image(diary.getUser().getImage());
                diaryDto.setLiked(likedService.readLiked(diary.getDno()));
                diaryDto.setView(diary.getView());
                all_diaries.add(diaryDto);
            }
            return all_diaries;
        }
    }

    @Override
    public List<String> readAllword() {
        List<Diary> diaries = diaryRepository.findAll();

        List<String> allwords = new ArrayList<>();

        for (Diary diary : diaries) {
            if (!allwords.contains(diary.getWord())) {
                allwords.add(diary.getWord());
            }
        }

        return allwords;
    }

    @Override
    public Diary updateView(Long dno) {
        Diary diary = diaryRepository.findDiaryByDno(dno);

        if (diary == null) {
            return null;
        }

        diary.setView(diary.getView() + 1);

        diaryRepository.save(diary);

        return diary;
    }

    @Override
    public List<Diary> readAllDiary() {
        List<Diary> diaries = diaryRepository.findAll();

        for (Diary diary : diaries) {
            diary.setLiked(likedService.readLiked(diary.getDno()));
        }

        return diaries;
    }

    @Override
    public List<Diary> readTopLiked() {
        List<Liked> likeds = likedRepository.findTopLiked();
        List<Diary> diaries = new ArrayList<>();

        for (Liked liked : likeds) {
            diaries.add(diaryRepository.findDiaryByDno(liked.getDno()));
        }

        for (Diary diary : diaries) {
            diary.setLiked(likedService.readLiked(diary.getDno()));
        }

        return diaries;
    }


}
