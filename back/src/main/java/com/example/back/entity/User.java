package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User extends BaseTimeEntity {
    @Id
    @NotNull
    String userName;

    @NotNull
    String password;

    @NotNull
    String nickname;

    String image;

    LocalDateTime lastLoginTime;


    @Builder
    public User(String userName, String password, String nickname, String image, LocalDateTime lastLoginTime) {
        this.userName = userName;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
        this.lastLoginTime = lastLoginTime;
    }
}
