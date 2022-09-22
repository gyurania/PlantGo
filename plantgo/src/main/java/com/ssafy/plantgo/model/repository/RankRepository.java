package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankRepository extends JpaRepository<Rank, Long> {

    @Query(value = "SELECT * FROM userrank order by insert_time desc limit 30",nativeQuery = true)
    List<Rank> findAll();
}
