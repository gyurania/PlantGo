package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.Plant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Integer> {

    Page<Plant> findByPlantIdIn(List<Integer> plantIds, Pageable pageable);
}
