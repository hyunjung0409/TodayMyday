package com.example.back.dto;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class DiaryDto {

    @NotNull
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
