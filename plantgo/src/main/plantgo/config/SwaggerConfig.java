package com.ssafy.plantgo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.util.UriComponentsBuilder;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.DefaultPathProvider;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;

import static springfox.documentation.spring.web.paths.Paths.removeAdjacentForwardSlashes;

@Configuration
public class SwaggerConfig{


    @Bean
    public Docket api() {
        //Server localServer = new Server("local", "http://localhost:8000", "for testing", Collections.emptyList(), Collections.emptyList());
        //Server testServer = new Server("test", "https://i7a201.p.ssafy.io", "for testing", Collections.emptyList(), Collections.emptyList());
        return new Docket(DocumentationType.OAS_30)
                //.servers(testServer, localServer)
                .groupName("Queant")
                .apiInfo(apiInfo())
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.plantgo.controller"))
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("PlantGo API")
                .description("<h2>SSAFY PlantGo API Reference for Developers</h2>"
                        //"<img src=\"/api/img/Queant.png\" style=\"width:10px; height:10px;\">"
                )
                .termsOfServiceUrl("https://edu.ssafy.com")
                .license("SSAFY License")
                .licenseUrl("https://www.ssafy.com/ksp/jsp/swp/etc/swpPrivacy.jsp").version("1.0").build();
    }

}
