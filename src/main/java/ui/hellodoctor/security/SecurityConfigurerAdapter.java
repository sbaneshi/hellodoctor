package ui.hellodoctor.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import ui.hellodoctor.data.domain.User;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    private final JpaUserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/login**", "/api/sign_up**").permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                .and().httpBasic();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(User.PASSWORD_ENCODER);
        provider.setUserDetailsService(userDetailsService);

        auth.authenticationProvider(provider);
    }
}
