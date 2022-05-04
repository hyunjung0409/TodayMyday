package com.example.back.config;

import com.example.back.filter.AuthenticationFilter;
import com.example.back.filter.LoginFilter;
import com.example.back.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private UserService userService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception
    {
        // static 디렉터리의 하위 파일 목록은 인증 무시 ( = 항상통과 )
        web.ignoring().antMatchers("/swagger-resources/**",
                "/swagger-ui.html", "/swagger/**", "/v2/api-docs", "/webjars/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/user/signup").permitAll()
                .antMatchers(HttpMethod.POST, "/user/login").permitAll()
                .antMatchers("/test/**").permitAll()
                .antMatchers("/diary/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/liked/**").permitAll()
                //.antMatchers("/swagger-ui.html", "/swagger/**", "/swagger-resources/**", "webjars/**").permitAll()
                .anyRequest().authenticated();

        //http.formLogin();
                //.usernameParameter("userId");
                //.disable();

        http
                .csrf().disable()      // csrf 비활성화
                .cors().disable()      // cors 비활성화
                .headers().frameOptions().disable()
                .and()
                .addFilterBefore(new LoginFilter("/user/login", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new AuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins("http://localhost:3000");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("http://k6c205.p.ssafy.io");
        config.addAllowedOrigin("http://k6c205.p.ssafy.io:3000");
        config.addAllowedOrigin("http://k6c205.p.ssafy.io:8080");
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setMaxAge(3600L);
//        config.setAllowedOrigins(Arrays.asList("*"));
//        config.setAllowedOrigins("h");
//        config.setAllowedMethods(Arrays.asList("*"));
//        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.applyPermitDefaultValues();

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(new BCryptPasswordEncoder());
    }
}
