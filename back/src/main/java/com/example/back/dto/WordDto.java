package com.example.back.dto;

import com.example.back.entity.Word;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WordDto {

    @NotNull
    private String word;

    @NotNull
    private String gender;

    @NotNull
    private String age;

    @NotNull
    private long count;

    @Builder
    public WordDto (String word, String gender, String age, long count){
        this.word = word;
        this.gender = gender;
        this.age = age;
        this.count = count;
    }
}
