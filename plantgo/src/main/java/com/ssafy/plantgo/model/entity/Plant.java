package com.ssafy.plantgo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Plant {
    @Id
    private int plant_id;
    private String korName;
    private String schName;
    private String korNameSn;
    private String schNameSn;
    @Column(length = 300)
    private String imgUrl;
    private String genus;
    private String family;
    @Column(columnDefinition = "TEXT")
    private String branchDesc;
    @Column(columnDefinition = "TEXT")
    private String bfofMthd;
    @Column(columnDefinition = "TEXT")
    private String brdMthd;
    @Column(columnDefinition = "TEXT")
    private String bugInfo;
    @Column(columnDefinition = "TEXT")
    private String dstrb;
    @Column(columnDefinition = "TEXT")
    private String farmDesc;
    @Column(columnDefinition = "TEXT")
    private String flwrDesc;
    @Column(columnDefinition = "TEXT")
    private String fruitDesc;
    @Column(columnDefinition = "TEXT")
    private String gemDesc;
    @Column(columnDefinition = "TEXT")
    private String grwEnvDesc;
    @Column(columnDefinition = "TEXT")
    private String leafDesc;

    private String origin;
    @Column(columnDefinition = "TEXT")
    private String foreDstrb;
    @Column(columnDefinition = "TEXT")
    private String peltDesc;
    @Column(columnDefinition = "TEXT")
    private String prtcDesc;
    @Column(columnDefinition = "TEXT")
    private String ramenDesc;
    @Column(columnDefinition = "TEXT")
    private String rootDesc;
    @Column(columnDefinition = "TEXT")
    private String shape;
    @Column(columnDefinition = "TEXT")
    private String stemDesc;
    @Column(columnDefinition = "TEXT")
    private String size;
    @Column(columnDefinition = "TEXT")
    private String useMthd;
    @Column(columnDefinition = "TEXT")
    private String woodDesc;

}
