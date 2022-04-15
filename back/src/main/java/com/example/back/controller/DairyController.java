package com.example.back.controller;

import com.example.back.dto.DairyDto;
import com.example.back.entity.Dairy;
import com.example.back.entity.User;
import com.example.back.repository.DairyRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.DairyService;
import com.example.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dairy")
@RequiredArgsConstructor
public class DairyController {

    private final DairyService dairyService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final DairyRepository dairyRepository;

    @PostMapping("/create/{userId}")
    public ResponseEntity<Map<String, Object>> createDairy(@PathVariable String userId, @RequestBody DairyDto dairyDto){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        User user = userRepository.findByUserId(userId);
        if (dairyService.createDairy(dairyDto, user)) {
            hashMap.put("Message", "SUCCES");
            status = HttpStatus.OK;
            hashMap.put("Status", status);

        } else {
            hashMap.put("Message", "FAIL");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            hashMap.put("ERROR", "빈 값이 들어있습니다.");
            hashMap.put("Status", status);

        }
        return new ResponseEntity<>(hashMap, status);
    }




}
