package com.ssafy.plantgo.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.plantgo.model.entity.PhotoCard;

@Repository
public interface PhotocardRepository extends JpaRepository<PhotoCard, Integer> {

}
