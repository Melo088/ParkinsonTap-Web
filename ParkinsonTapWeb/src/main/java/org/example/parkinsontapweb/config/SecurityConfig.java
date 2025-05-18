package org.example.parkinsontapweb.config;

import lombok.RequiredArgsConstructor;
import org.example.parkinsontapweb.Security.AuthFilter;
import org.example.parkinsontapweb.Security.JwtEntryPoint;
import org.example.parkinsontapweb.Security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtEntryPoint jwtEntryPoint;
    private JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    @Bean
    public AuthFilter authFilter() {
        AuthFilter filter = new AuthFilter();
        filter.setJwtProvider(jwtProvider);
        filter.setUserDetailsService(userDetailsService);
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(e -> e.authenticationEntryPoint(jwtEntryPoint))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/evaluated/**").hasAuthority("ROLE_DOCTOR")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(authFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
