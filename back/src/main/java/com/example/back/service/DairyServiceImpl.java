package com.example.back.service;

import com.example.back.dto.DairyDto;
import com.example.back.entity.Dairy;
import com.example.back.entity.User;
import com.example.back.repository.DairyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DairyServiceImpl implements DairyService{

    private final DairyRepository dairyRepository;


    @Override
    public boolean createDairy(DairyDto dairyDto, User user) {

        // 단어가 없거나 내용이 없으면 (유효성 검사)
        // if(dairyDto.getWord().equals(null) || dairyDto.getContent().equals(null)) return  false;

        Dairy save = Dairy.builder()
                .image(dairyDto.getImage())
                .content(dairyDto.getContent())
                .createdat(LocalDateTime.now())
                .user(user)
                .build();

        dairyRepository.save(save);
        return true;
    }
}
