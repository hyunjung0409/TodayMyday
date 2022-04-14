package com.example.back.service;

import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import com.example.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public boolean signup(UserDto user) {
        String password = user.getPassword();
        String encPass = BCrypt.hashpw(password, BCrypt.gensalt());
        System.out.println("확인해보자" + user.getPassword());


        if (!validateDuplicateUser(user)) {
            return false;
        }
        else {
            User info = User.builder()
                    .userId(user.getUserId())
                    .password(encPass)
                    .nickname(user.getNickname())
                    .image(user.getImage())
                    .build();
            userRepository.save(info);

            return true;
        }

    }

    public boolean validateDuplicateUser(UserDto user) {
        User findUsers = userRepository.findByUserId(user.getUserId());
        if (findUsers != null) {
            return false;
        }
        return true;
    }
}
