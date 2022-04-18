package com.example.back.dto;

import com.example.back.entity.User;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserDto {
    @NotNull
    String userName;
    @NotNull
    String password;
    @NotNull
    String nickname;
    String image;

    @Builder
    public UserDto(String userName, String password, String nickname, String image) {
        this.userName = userName;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
    }

    public User createUser() {
        return User.builder()
                .userName(userName)
                .password(password)
                .nickname(nickname)
                .image(image)
                .build();

    }
}
