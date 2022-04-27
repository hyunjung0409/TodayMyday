package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@RequiredArgsConstructor
@Getter
public class Word {
    @Id
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
    public Word (String word, long teens, long twenties, long thirties, long fourties, long fifties, long oversixties, long male, long female){
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
