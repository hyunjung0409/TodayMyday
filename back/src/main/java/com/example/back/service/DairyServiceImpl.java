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

    @Override
    public Dairy findDairy(Long dno) {
        return null;
    }

    @Override
    public Dairy modifyDairy(Long dno, String userId, DairyDto dairyDto) {
        Dairy dairy = dairyRepository.findDairyByDno(dno);
        if(dairy == null){ return null; }

        String id = dairy.getUser().getUserId();
        if(!id.equals(userId)) { return null; }

        dairy.setWord(dairyDto.getWord());
        dairy.setImage(dairyDto.getImage());
        dairy.setContent(dairyDto.getContent());

        System.out.println(dairy.getWord()+" "+dairy.getContent());

        dairyRepository.save(dairy);

        return dairy;
    }

    @Override
    public Boolean deleteDairy(Long dno, String userId) {
        Dairy dairy = dairyRepository.findDairyByDno(dno);

        if(dairy == null){ return false; }

        String id = dairy.getUser().getUserId();
        if(!id.equals(userId)) { return false; }

        dairyRepository.delete(dairy);

        return true;

    }


}
