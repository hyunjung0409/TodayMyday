package com.example.back.repository;

import com.example.back.entity.TestWord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<TestWord, String> {

}
