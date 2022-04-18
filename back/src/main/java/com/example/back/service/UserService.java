package com.example.back.service;

import com.example.back.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    boolean signup(UserDto user);
}
