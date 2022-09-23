package com.ssafy.plantgo.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USERRANK")
@Builder
public class Rank {

    @JsonIgnore
    @Id
    @Column(name = "RANK_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankSeq;

    @Column(name = "USER_SEQ")
    @NotNull
    private Long userSeq;

    @Column(name = "PLANTS_COLLECTS")
    @NotNull
    private int plantsCollects;

    @Column(name = "INSERT_TIME")
    @NotNull
    private LocalDateTime insertTime;


}
