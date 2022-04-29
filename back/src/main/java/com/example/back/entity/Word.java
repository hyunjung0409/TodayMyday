package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class Word {

    @Id
    @NotNull
    private String word;

    @NotNull
    private String gender;

    @NotNull
    private String age;

    @NotNull
    private long count;

    @Builder
    public Word (String word, String gender, String age, long count){
        this.word = word;
        this.gender = gender;
        this.age = age;
        this.count = count;
    }

}
