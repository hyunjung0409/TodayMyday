package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.dto.LikedDto;
import com.example.back.entity.Diary;
import com.example.back.entity.Liked;

public interface LikedService {
    Liked createLiked(LikedDto likedDto);
    int readLiked(Long dno);
}
