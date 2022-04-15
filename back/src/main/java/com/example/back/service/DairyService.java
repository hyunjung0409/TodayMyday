package com.example.back.service;

import com.example.back.dto.DairyDto;
import com.example.back.entity.Dairy;
import com.example.back.entity.User;

public interface DairyService {
    boolean createDairy(DairyDto dairyDto, User user);
}
