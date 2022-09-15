package com.ssafy.plantgo.model.repository;

import com.ssafy.plantgo.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.plantgo.model.entity.PhotoCard;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotocardRepository extends JpaRepository<PhotoCard, Integer> {
    Optional<List<PhotoCard>> findByUser(User user);

}
