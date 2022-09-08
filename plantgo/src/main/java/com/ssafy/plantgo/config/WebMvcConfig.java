package com.ssafy.plantgo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Enabling CORS
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final long MAX_AGE_SECS = 3600;

    @Value("${app.cors.allowedOrigins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // cors적용할 url패턴
                .allowedOrigins(allowedOrigins) // 자원 공유 오리진 지정
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // 요청 허용 메서드
                .allowedHeaders("*") // 요청 허용 헤더
                .allowCredentials(true) // 요청 허용 쿠키
                .maxAge(MAX_AGE_SECS);
    }
}
