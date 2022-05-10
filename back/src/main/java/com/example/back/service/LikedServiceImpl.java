package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.LikedDto;
import com.example.back.entity.Diary;
import com.example.back.entity.Liked;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.LikedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikedServiceImpl implements LikedService {

    private final LikedRepository likedRepository;

    @Override
    public boolean createLiked(LikedDto likedDto) {
        List<Liked> likeds = likedRepository.findLikedByDno(likedDto.getDno());

        for (Liked liked : likeds) {
            if (liked.getUserId().equals(likedDto.getUserId())) { //좋아요 이미 눌렀으면 null 반환
                likedRepository.delete(liked);
                return false;
            }
        }

        Liked liked = Liked.builder()
                .userId(likedDto.getUserId())
                .dno(likedDto.getDno())
                .build();

        likedRepository.save(liked);

        return true;

    }

    @Override
    public int readLiked(Long dno) {
        List<Liked> likeds = likedRepository.findLikedByDno(dno);
        int count = 0;

        for (Liked liked : likeds) {
            count++;
        }
        return count;
    }

    @Override
    public List<Long> readTopLiked() {
        return null;
    }

    @Override
    public boolean readLikedStatus(String userId, long dno) {
        List<Liked> likeds = likedRepository.findLikedByDno(dno);

        for (Liked liked : likeds) {
            if (liked.getUserId().equals(userId)) { //좋아요 이미 눌렀으면 true 반환
                return true;
            }
        }
        return false;
    }
}
