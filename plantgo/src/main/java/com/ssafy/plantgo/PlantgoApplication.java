package com.ssafy.plantgo;

import com.ssafy.plantgo.config.AppProperties;
import com.ssafy.plantgo.config.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
@SpringBootApplication
@EnableJpaAuditing
public class PlantgoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlantgoApplication.class, args);
	}

}
