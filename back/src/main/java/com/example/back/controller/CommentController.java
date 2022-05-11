package com.example.back.controller;

import com.example.back.dto.CommentDto;
import com.example.back.service.CommentService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Api(tags = {"댓글 컨트롤러"})
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/")
    public ResponseEntity<Object> createComment(@RequestParam Long dno, @RequestBody CommentDto commentDto) {

        commentService.createComment(dno, commentDto);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }
}
