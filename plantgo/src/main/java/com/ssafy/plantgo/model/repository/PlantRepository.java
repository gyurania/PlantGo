package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, Integer> {
}
