package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PlantDto;
import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.repository.PhotocardRepository;
import com.ssafy.plantgo.model.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class PlantServiceImpl implements PlantService{

    private final PlantRepository plantRepository;
    private final PhotocardRepository photocardRepository;
    private final ModelMapper modelMapper;
    private final List<Integer> plantIds;

    @Autowired
    public PlantServiceImpl(PlantRepository plantRepository, PhotocardRepository photocardRepository, ModelMapper modelMapper, List<Integer> plantIds) {
        this.plantRepository = plantRepository;
        this.photocardRepository = photocardRepository;
        this.modelMapper = modelMapper;
        this.plantIds = null;
    }

    @Override
    public List<PlantDto> plantList(UUID memberId, int page) {
        return null;
    }

    @Override
    public List<PlantDto> plantCollected(UUID memberId, int page) {
        return null;
    }

    @Override
    public List<PlantDto> plantNotCollected(UUID memberId, int page) {
        return null;
    }

    @Override
    public List<Integer> getPlantIds(UUID memberId) {
        Optional<List<PhotoCard>> result = photocardRepository.findByUser(User.builder().)
        return null;
    }
}
