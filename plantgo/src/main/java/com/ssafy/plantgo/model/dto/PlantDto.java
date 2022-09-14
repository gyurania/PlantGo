package com.ssafy.plantgo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantDto {

    private int plantId;
    private String korName;
    private String schName;
    private String korNameSn;
    private String schNameSn;
    private String imgUrl;
    private String genus;
    private String family;
    private String branchDesc;
    private String bfofMthd;
    private String brdMthd;
    private String bugInfo;
    private String dstrb;
    private String farmDesc;
    private String flwrDesc;
    private String fruitDesc;
    private String gemDesc;
    private String grwEnvDesc;
    private String leafDesc;
    private String origin;
    private String foreDstrb;
    private String peltDesc;
    private String prtcDesc;
    private String ramenDesc;
    private String rootDesc;
    private String shape;
    private String stemDesc;
    private String size;
    private String useMthd;
    private String woodDesc;
}
