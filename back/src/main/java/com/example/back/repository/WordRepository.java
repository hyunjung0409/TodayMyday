package com.example.back.repository;

import com.example.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, String> {

    Word findWordByWord(String word);

    @Query(value = "select word from word where word = :word and gender = :gender", nativeQuery = true)
    Word findWordByWordAndGender(@Param(value = "word") String word, @Param(value = "gender") String gender);

    @Query(value = "select * from word", nativeQuery = true)
    List<String> findWordsByGenderAndAge(@Param(value = "year") String year);

//    @Query(value = "select word, ")
//    List<String> findWordsByAge();
}
