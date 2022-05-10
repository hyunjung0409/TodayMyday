package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.LikedDto;
import com.example.back.entity.Diary;
import com.example.back.entity.Liked;

import java.util.List;

public interface LikedService {
    boolean createLiked(LikedDto likedDto);
    int readLiked(Long dno);
    List<Long> readTopLiked();
    boolean readLikedStatus(String userId, long dno);
}
