package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "dairy")
@RequiredArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Dairy {
    @Id @NotNull @GeneratedValue
    private Long dno;

    @NotNull
    private String userName;

    @NotNull
    private String word;

    private String image;

    private String content;

    @CreatedDate
    private String createdat;



}
