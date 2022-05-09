package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
public class WordLog {

    @Id
    @NotNull
    @GeneratedValue
    private Long lno;

    @NotNull
    private String userId;

    @NotNull
    private String word;

    @NotNull
    private LocalDateTime selectedat;

    @Builder
    public WordLog(Long lno, String userId, String word, LocalDateTime selectedat) {
        this.lno = lno;
        this.userId = userId;
        this.word = word;
        this.selectedat = selectedat;
    }
}
