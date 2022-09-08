package com.ssafy.plantgo.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "photocard")
public class PhotoCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "photocard_id")
	private int photocardId;

	@Column(name = "korName", columnDefinition = "VARCHAR(255)", nullable = false)
	private String korName;

	@Column(name = "schName", columnDefinition = "VARCHAR(255)", nullable = false)
	private String schName;

	@Column(name = "latitude", columnDefinition = "DOUBLE", nullable = false)
	private double latitude;

	@Column(name = "longitude", columnDefinition = "DOUBLE", nullable = false)
	private double longitude;

	@Column(name = "address", columnDefinition = "VARCHAR(255)", nullable = false)
	private String address;

	@Column(name = "photo_url", columnDefinition = "TEXT", nullable = false)
	private String photoUrl;

	@Column(name = "memo", columnDefinition = "TEXT")
	private String memo;

	@Column(name = "plant_id", columnDefinition = "INT", nullable = false)
	private int plantId;

	// Foreign key 회원아이디
	@ManyToOne
	@JoinColumn(name = "member_id", columnDefinition = "BIGINT", referencedColumnName = "id", nullable = false)
	private User user;
}
