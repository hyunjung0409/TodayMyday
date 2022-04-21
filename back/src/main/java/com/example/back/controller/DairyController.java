package com.example.back.controller;

import com.example.back.dto.DairyDto;
import com.example.back.entity.Dairy;
import com.example.back.entity.User;
import com.example.back.repository.DairyRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.DairyService;
import com.example.back.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.hibernate.dialect.DataDirectOracle9Dialect;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dairy")
@RequiredArgsConstructor
@Api(tags = {"다이어리 컨트롤러"})
public class DairyController {

    private final DairyService dairyService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final DairyRepository dairyRepository;


    @GetMapping("/")
    @ApiOperation(value = "다이어리 전체 검색", notes = "모든 다이어리 출력", response = String.class)
    public ResponseEntity<Map<String, Object>> readAllDairy(){ // 모든 다이어리를 불러옴
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        List<Dairy> dairies = dairyRepository.findAll();

        hashMap.put("Message", "SUCCESS");
        status = HttpStatus.OK;
        hashMap.put("Status", status);
        hashMap.put("dairies", dairies);

        return new ResponseEntity<>(hashMap, status);
    }

    @PostMapping("/{userId}")
    @ApiOperation(value = "다이어리 등록", notes = "현재 로그인 된 아이디로 다이어리 등록", response = String.class)
    public ResponseEntity<Map<String, Object>> createDairy(@PathVariable String userId, @RequestBody DairyDto dairyDto){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        User user = userRepository.findByUserId(userId);
        if (dairyService.createDairy(dairyDto, user)) {
            hashMap.put("Message", "SUCCESS");
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

    @PutMapping("/{userId}/{dno}")
    @ApiOperation(value = "다이어리 수정", notes = "다이어리 수정", response = String.class)
    public ResponseEntity<Map<String, Object>> modifyDairy(@PathVariable String userId, @PathVariable long dno, @RequestBody DairyDto dairyDto) {
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        Dairy dairy = dairyService.modifyDairy(dno, userId, dairyDto);

        if(dairy != null) {
            status = HttpStatus.OK;
            hashMap.put("Status", status);
            hashMap.put("Message", "SUCCESS");
            hashMap.put("dairy", dairy);
        } else {
            status = HttpStatus.NOT_FOUND;
            hashMap.put("Status", status);
            hashMap.put("Message", "FAIL");
            hashMap.put("ERROR", "데이터를 찾을 수 없습니다.");
        }

       return new ResponseEntity<>(hashMap, status);

    }


    @DeleteMapping("/{userId}/{dno}")
    @ApiOperation(value = "다이어리 삭제", notes = "다이어리 삭제", response = String.class)
    public ResponseEntity<Map<String, Object>> deleteDairy(@PathVariable String userId, @PathVariable Long dno){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        if(dairyService.deleteDairy(dno, userId)) {
            status = HttpStatus.OK;
            hashMap.put("Status", status);
            hashMap.put("Message", "SUCCESS"); // 메세지를 코드로 바꾸자
            hashMap.put("deleted", dno+"번 다이어리가 성공적으로 삭제되었습니다.");
            // 여기 더넣자
        } else {
            status = HttpStatus.NOT_FOUND;
            hashMap.put("Status", status);
            hashMap.put("Message", "FAIL");
            hashMap.put("ERROR", "데이터를 찾을 수 없습니다.");
        }

        return new ResponseEntity<>(hashMap, status);
    }

    @GetMapping("/search")
    @ApiOperation(value = "내 다이어리 검색", notes = "내가 등록한 다이어리 검색하기", response = String.class)
    public ResponseEntity<List<Dairy>> searchDiary(@RequestParam String keyword, @RequestParam String userId) {
        HttpStatus status;

        System.out.println("키워드" + keyword);
        List<Dairy> diares = dairyService.searchDiaries(keyword, userId);
        System.out.println("컨트롤러 찍혀라");

        if (diares != null) {
            status = HttpStatus.OK;
        }
        else {
            status = HttpStatus.NO_CONTENT;
        }

        System.out.println("컨트롤러 찍혀라222");
        return new ResponseEntity<>(diares, status);
    }


}
