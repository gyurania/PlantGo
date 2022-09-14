package com.ssafy.plantgo.controller;


import com.ssafy.plantgo.model.dto.PlantRequestDto;
import com.ssafy.plantgo.model.dto.PlantResponseDto;
import com.ssafy.plantgo.model.service.PlantService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/plants")
public class PlantController {

    private final PlantService plantService;

    @ApiResponses({
            @ApiResponse(code = 200, message="식물도감 리스트 조회 성공"),
            @ApiResponse(code = 500, message="서버에러"),
    })
    @ApiOperation(value="식물도감 전체 리스트 조회", notes="userSeq, page 필수")
    @PostMapping
    public ResponseEntity<?> getPlantList(@RequestBody PlantRequestDto requestDto){
        PlantResponseDto plantResponseDto = plantService.plantList(requestDto.getUserSeq(), requestDto.getPage());
        return new ResponseEntity<>(plantResponseDto, HttpStatus.OK);
    }

    @ApiResponses({
            @ApiResponse(code = 200, message="식물도감 리스트 조회 성공"),
            @ApiResponse(code = 500, message="서버에러"),
    })
    @PostMapping("/collected")
    @ApiOperation(value="수집된 식물도감 리스트 조회", notes="userSeq, page 필수")
    public ResponseEntity<?> getCollectedPlantList(@RequestBody PlantRequestDto requestDto){
        PlantResponseDto plantResponseDto = plantService.plantCollected(requestDto.getUserSeq(), requestDto.getPage());
        return new ResponseEntity<>(plantResponseDto, HttpStatus.OK);
    }

    @ApiResponses({
            @ApiResponse(code = 200, message="식물도감 리스트 조회 성공"),
            @ApiResponse(code = 500, message="서버에러"),
    })
    @PostMapping("/not-collected")
    @ApiOperation(value="수집되지 않은 식물도감 리스트 조회", notes="userSeq, page 필수")
    public ResponseEntity<?> getNotCollectedPlantList(@RequestBody PlantRequestDto requestDto){
        PlantResponseDto plantResponseDto = plantService.plantNotCollected(requestDto.getUserSeq(), requestDto.getPage());
        return new ResponseEntity<>(plantResponseDto, HttpStatus.OK);
    }
}
