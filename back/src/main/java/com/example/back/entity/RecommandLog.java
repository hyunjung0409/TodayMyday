package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class RecommandLog {

    @Id
    @NotNull
    private long lno;

    private String userId;

    private String word;

    @CreatedDate
    private LocalDateTime selectedat;

    @Builder
    public RecommandLog(long lno, String userId, String word, LocalDateTime selectedat) {
        this.lno = lno;
        this.userId = userId;
        this.word = word;
        this.selectedat = selectedat;
    }
}
