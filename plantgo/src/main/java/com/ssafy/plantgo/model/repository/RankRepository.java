package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankRepository extends JpaRepository<Rank, Long> {

	// 최신 데이터 30명 중 수집한 식물 수가 많은 순서대로 반환
	@Query(value = "SELECT * FROM userrank order by insert_time DESC, "
			+ "plants_collects DESC limit 30", nativeQuery = true)
	List<Rank> findAll();
}
