package com.ssafy.plantgo;

import com.ssafy.plantgo.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class PlantgoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlantgoApplication.class, args);
	}

}
