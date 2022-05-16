package com.example.back.dto;

import com.example.back.entity.Comment;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
public class DiaryDto {

    private String word;
    private String image;
    private String content;
    private LocalDateTime createdat;
    private String nickname;
    private long dno;
    private String profile_image;
    private int view;
    private int liked;

    public DiaryDto(String word, String image, String content, LocalDateTime createdat, String nickname, long dno, String profile_image, int view, int liked){
        this.word = word;
        this.image = image;
        this.content = content;
        this.createdat = createdat;
        this.nickname = nickname;
        this.dno = dno;
        this.profile_image = profile_image;
        this.view = view;
        this.liked = liked;
    }

}
