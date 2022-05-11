package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "diary")
@RequiredArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Diary {
    @Id
    @NotNull
    @GeneratedValue
    private Long dno;

//    @NotNull
//    private String userId;

    @NotNull
    private String word;

    private String image;

    private String content;

    @CreatedDate
    private LocalDateTime createdat;

    private int view;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    private int liked;

    @OneToMany(mappedBy = "diary", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @Builder
    public Diary(Long dno, String word, String image, String content, LocalDateTime createdat, int view, User user, int liked, List<Comment> comments) {
        this.dno = dno;
        this.word = word;
        this.image = image;
        this.content = content;
        this.createdat = createdat;
        this.view = view;
        this.user = user;
        this.liked = liked;
        this.comments = comments;
    }
}
