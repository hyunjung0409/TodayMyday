package com.example.back.repository;

import com.example.back.entity.WordLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordLogRepository extends JpaRepository<WordLog, Long> {

    @Query(value = "select word, timestampdiff(minute, selectedat, now()) as dif from word_log where user_id = :userId having dif < 5", nativeQuery = true)
    List<WordLog> findWordLogsByUserId(String userId);

}
