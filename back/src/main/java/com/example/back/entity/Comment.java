package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Comment {
    @Id
    @GeneratedValue
    private Long cno;

    @NotNull
    private String userId;

    @NotBlank
    private String content;

    @CreatedDate
    private LocalDateTime createdat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dno")
    @JsonIgnore
    private Diary diary;
}
