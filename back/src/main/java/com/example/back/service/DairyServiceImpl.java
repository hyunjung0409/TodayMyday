package com.example.back.service;

import com.example.back.entity.Dairy;
import com.example.back.repository.DairyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DairyServiceImpl implements DairyService{

    private final DairyRepository dairyRepository;


    @Override
    public Dairy createDairy(Dairy dairy) {

        dairyRepository.save(dairy);
        return dairy;
    }
}
