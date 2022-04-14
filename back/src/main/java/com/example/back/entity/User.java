package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User {
    @Id
    @NotNull
    String userId;

    @NotNull
    String password;

    @NotNull
    String nickname;

    String image;

    @Builder
    public User(String userId, String password, String nickname, String image) {
        this.userId = userId;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
    }

}
