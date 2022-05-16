package com.example.back.dto;

import com.example.back.entity.Comment;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class DiaryDto {

    private String word;
    private String image;
    private String content;
    private String userId;
    private long dno;
    private int view;
    private int liked;



}
