package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.Plant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PlantRepository extends JpaRepository<Plant, Integer> {

    Page<Plant> findByPlantIdIn(Set<Integer> plantIds, Pageable pageable);
    Page<Plant> findByPlantIdNotIn(Set<Integer> plantIds, Pageable pageable);

    @Query(value = "select * from plant where sch_name like %:name%", nativeQuery = true)
    public Plant findByScientificname(@Param(value="name") String name);

    @Query(value = "SELECT * FROM plant order by RAND() limit 1",nativeQuery = true)
    public List<Plant> findAll();

    Plant findByPlantId(int plant_id);
}
