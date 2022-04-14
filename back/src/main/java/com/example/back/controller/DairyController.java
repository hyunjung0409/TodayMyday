package com.example.back.controller;

import com.example.back.entity.Dairy;
import com.example.back.service.DairyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dairy")
@RequiredArgsConstructor
public class DairyController {

    private final DairyService dairyService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createDairy(@RequestBody Dairy dairy){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        try {
            dairyService.createDairy(dairy);
            hashMap.put("Message", "SUCCES");
            status = HttpStatus.OK;
        } catch (Exception e){
            hashMap.put("Message", "FAIL");
            hashMap.put("ERROR", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(hashMap, status);
    }


}
