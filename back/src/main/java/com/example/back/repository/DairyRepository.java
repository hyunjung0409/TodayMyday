package com.example.back.repository;

import com.example.back.entity.Dairy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DairyRepository extends JpaRepository<Dairy, Long> {

    Dairy findDairyByDno(Long dno);
    Dairy deleteDairyByDno(Long dno);
    List<Dairy> findByContentContains(String keyword);

//    @Query(value = "select * from dairy where content like '%:keyword%'")
//    List<Dairy>searchDiares(@Param("keyword") String keyword);
}
