package com.example.back.service;

import com.example.back.dto.CommentDto;
import com.example.back.entity.Comment;
import com.example.back.entity.Diary;

public interface CommentService {
    Comment createComment(Long dno, CommentDto commentDto);
}
