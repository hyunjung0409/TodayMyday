package com.example.back.repository;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Diary findDiaryByDno(Long dno);
    Diary deleteDiaryByDno(Long dno);
    List<Diary> findByContentContains(String keyword);
    List<Diary>findDiaryByWord(String word);

    @Query(value = "select * from diary d where d.user_id = :userId", nativeQuery = true)
    List<Diary>findByUserId(@Param("userId") String userId);

    List<Diary>findAll();


//    @Query(value = "select * from diary where content liked '%:keyword%'")
//    List<Diary>searchDiares(@Param("keyword") String keyword);
}
