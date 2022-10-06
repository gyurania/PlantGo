package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MapRepository extends JpaRepository<PhotoCard, Integer> {

    Optional<List<PhotoCard>> findByArea(String area);
}
