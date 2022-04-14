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
    String userId;
    @NotNull
    String password;
    @NotNull
    String nickname;
    String image;

    @Builder
    public UserDto(String userId, String password, String nickname, String image) {
        this.userId = userId;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
    }

    public User createUser() {
        return User.builder()
                .userId(userId)
                .password(password)
                .nickname(nickname)
                .image(image)
                .build();

    }
}
