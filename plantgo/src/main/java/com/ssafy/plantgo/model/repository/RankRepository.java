package com.ssafy.plantgo.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.plantgo.model.entity.Rank;

@Repository
public interface RankRepository extends JpaRepository<Rank, Long> {

	// 최신 데이터 30명 중 수집한 식물 수가 많은 순서대로 반환
	@Query(value = "SELECT * FROM userrank order by plants_collects DESC " + "limit :count, 30", nativeQuery = true)
	List<Rank> findAll(@Param("count") long count);

	@Query(value = "SELECT COUNT(*) from userrank", nativeQuery = true)
	long countAll();

}
