package com.example.back.repository;

import com.example.back.entity.Dairy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DairyRepository extends JpaRepository<Dairy, Long> {

    Dairy findDairyByDno(Long dno);
}
