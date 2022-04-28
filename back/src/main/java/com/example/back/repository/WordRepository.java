package com.example.back.repository;

import com.example.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, String> {

    Word findWordByWord(String word);

    @Query(value = "select word, sum(:year) as total from word group by word", nativeQuery = true)
    List<String> findWordsByGenderAndAge(@Param("year") String year);

//    @Query(value = "select word, ")
//    List<String> findWordsByAge();
}
