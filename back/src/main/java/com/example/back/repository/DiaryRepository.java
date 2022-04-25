package com.example.back.repository;

import com.example.back.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Diary findDiaryByDno(Long dno);
    Diary deleteDiaryByDno(Long dno);
    List<Diary> findByContentContains(String keyword);

//    @Query(value = "select * from diary where content like '%:keyword%'")
//    List<Diary>searchDiares(@Param("keyword") String keyword);
}
