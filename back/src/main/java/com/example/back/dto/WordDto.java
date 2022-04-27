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

    private long teens;

    private long twenties;

    private long thirties;

    private long fourties;

    private long fifties;

    private long oversixties;

    private long male;

    private long female;

    @Builder
    public WordDto (String word, long teens, long twenties, long thirties, long fourties, long fifties, long oversixties, long male, long female){
        this.word = word;
        this.teens = teens;
        this.twenties = twenties;
        this.thirties = thirties;
        this.fourties = fourties;
        this.fifties = fifties;
        this.oversixties = oversixties;
        this.male = male;
        this.female = female;
    }
}
