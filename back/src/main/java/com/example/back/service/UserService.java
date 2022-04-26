package com.example.back.service;

import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    boolean signup(UserDto user);
    void deleteUser(String userId);
    User modifyUser(String userId, UserDto userDto);
}
