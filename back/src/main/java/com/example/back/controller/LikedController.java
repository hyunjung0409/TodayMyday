package com.example.back.controller;

import com.example.back.dto.LikedDto;
import com.example.back.entity.Liked;
import com.example.back.service.LikedService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/liked")
@RequiredArgsConstructor
@Api(tags = {"좋아요 컨트롤러"})
public class LikedController {

    private final LikedService likedService;

    @PostMapping
    @ApiOperation(value = "좋아요 누르기", notes = "좋아요 증가", response = String.class)
    public ResponseEntity<Map<String, Object>> updateLiked(@RequestBody LikedDto likedDto){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        Liked liked = likedService.createLiked(likedDto);

        if (liked == null) {
            status = HttpStatus.CONFLICT;
            hashMap.put("Message", "ALREADY LIKED");
        }
        else {
            status = HttpStatus.OK;
            hashMap.put("Message", "SUCCESS");
        }


        hashMap.put("liked", liked);

        return new ResponseEntity<>(hashMap, status);
    }

    @GetMapping
    @ApiOperation(value = "좋아요 개수 보기", notes = "좋아요 개수 가져오기", response = String.class)
    public ResponseEntity<Integer> readLiked(@RequestParam Long dno){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        int count = likedService.readLiked(dno);

        hashMap.put("Message", "SUCCESS");
        hashMap.put("liked", count);

        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
