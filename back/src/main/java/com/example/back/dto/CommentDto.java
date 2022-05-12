package com.example.back.dto;

import com.example.back.entity.Comment;
import com.example.back.entity.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    private Long cno;
    private String userId;
    private String content;
    private LocalDateTime createdat;

    public Comment toEntity() {
        Comment comments = Comment.builder()
                .cno(cno)
                .content(content)
                .userId(userId)
                .createdat(LocalDateTime.now())
                .build();
        return comments;
    }
}
