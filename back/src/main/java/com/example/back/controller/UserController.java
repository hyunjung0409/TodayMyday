package com.example.back.controller;

//import ch.qos.logback.core.encoder.EchoEncoder;
import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import com.example.back.repository.UserRepository;
import com.example.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody UserDto userDto) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;

        if (userService.signup(userDto)) {
            userService.signup(userDto);
            status = HttpStatus.OK;
            result.put("message", "SUCCESS");
        }
        else {
            System.out.print("오류 났어");
            result.put("message", "FAIL");
            status = HttpStatus.OK;
        }

        return new ResponseEntity<Map<String, Object>>(result, status);
//        try {
//            userService.signup(userDto);
//            status = HttpStatus.OK;
//            result.put("message", "SUCCESS");
//        }
//        catch(Exception e) {
//            System.out.print("오류 났어");
//            result.put("message", "FAIL");
//            status = HttpStatus.OK;
//        }
//
//        return new ResponseEntity<Map<String, Object>>(result, status);
    }

    @GetMapping("/read/{userId}")
    public ResponseEntity<Map<String, Object>> readUser(@PathVariable String userId){
        Map<String, Object> map = new HashMap<>();
        User user = userRepository.findByUserId(userId);

        map.put("user", user);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
