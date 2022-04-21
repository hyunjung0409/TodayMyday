package com.example.back.dto;

import com.example.back.entity.Dairy;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class DairyDto {

    @NotNull
    private String word;

    private String image;

    private String content;

    private LocalDateTime createdat;


    public DairyDto(String word, String image, String content, LocalDateTime createdat){
        this.word = word;
        this.image = image;
        this.content = content;
        this.createdat = createdat;
    }

}
