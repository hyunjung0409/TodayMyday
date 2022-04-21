package com.example.back.config;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private String TITLE = "Team Ginnyus";
    private String DESC = "랜덤 단어 SNS";
    private String LICENSE = "Team Ginnyus";
    private String VERSION = "1.0";

    @Bean
    public Docket restApi() {
        Docket d = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.back.controller"))
                .paths(postPaths())
                .build();

        System.out.println(" doc : "+d.getGroupName());
        return d;
    }

    private Predicate<String> postPaths(){

        Predicate<String> path = PathSelectors.any();
        System.out.println("path : "+path.toString());
        return path;
    }

    private ApiInfo apiInfo() {
        ApiInfo info = new ApiInfoBuilder()
                .title(TITLE)
                .description(DESC)
                .version(VERSION)
                .license(LICENSE)
                .build();
        System.out.println("info : "+info);

        return info;
    }
}
