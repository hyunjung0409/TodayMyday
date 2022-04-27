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
    private String userId;

    private long teens;

    private long twenties;

    private long thirties;

    private long fourties;

    private long fifties;

    private long oversixties;

    private long male;

    private long female;

    @Builder
    public WordDto (String word, String userId, long teens, long twenties, long thirties, long fourties, long fifties, long oversixties, long male, long female){
        this.word = word;
        this.userId = userId;
        this.teens = teens;
        this.twenties = twenties;
        this.thirties = thirties;
        this.fourties = fourties;
        this.fifties = fifties;
        this.oversixties = oversixties;
        this.male = male;
        this.female = female;
    }

    public Word createWord(){
        return Word.builder()
                .word(word)
                .teens(0)
                .twenties(0)
                .thirties(0)
                .fourties(0)
                .fifties(0)
                .oversixties(0)
                .male(0)
                .female(0)
                .build();
    }
}
