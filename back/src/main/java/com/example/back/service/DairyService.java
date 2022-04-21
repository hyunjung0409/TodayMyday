package com.example.back.service;

import com.example.back.dto.DairyDto;
import com.example.back.entity.Dairy;
import com.example.back.entity.User;

import java.util.List;

public interface DairyService {
    boolean createDairy(DairyDto dairyDto, User user);
    Dairy findDairy(Long dno);
    Dairy modifyDairy(Long dno, String userId, DairyDto dairyDto);
    Boolean deleteDairy(Long dno, String userId);
    List<Dairy> searchDiaries(String keyword, String userId);
}
