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


    public DiaryDto(String word, String image, String content, LocalDateTime createdat, String nickname){
        this.word = word;
        this.image = image;
        this.content = content;
        this.createdat = createdat;
        this.nickname = nickname;
    }

}
