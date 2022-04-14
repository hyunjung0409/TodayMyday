package com.example.back.service;

import com.example.back.dto.UserDto;

public interface UserService {
    boolean signup(UserDto user);
}
