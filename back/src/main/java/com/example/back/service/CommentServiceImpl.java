package com.example.back.service;

import com.example.back.dto.CommentDto;
import com.example.back.dto.DiaryDto;
import com.example.back.entity.Comment;
import com.example.back.entity.Diary;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.CommentRepository;
import com.example.back.repository.DiaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final DiaryRepository diaryRepository;

    @Override
    public Comment createComment(Long dno, CommentDto commentDto) {

        Diary diary = diaryRepository.findDiaryByDno(dno);

        if(commentDto == null || diary == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

//        Comment save = commentDto.toEntity();

        Comment save = Comment.builder()
                .userId(commentDto.getUserId())
                .content(commentDto.getContent())
                .diary(diary)
                .createdat(LocalDateTime.now())
                .build();

        commentRepository.save(save);
        return save;
    }
}
