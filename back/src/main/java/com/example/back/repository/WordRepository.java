package com.example.back.repository;

import com.example.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, String> {

    Word findWordByWord(String word);
}
