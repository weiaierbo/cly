package com.xk.love.cly.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author xk
 * @create 2020-07-08 17:11
 */
@ComponentScan("com.xk.love.cly.controller")
//@EnableWebMvc
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private final PrivilegeInteceptor privilegeInteceptor;

    public MvcConfig(PrivilegeInteceptor privilegeInteceptor) {
        this.privilegeInteceptor = privilegeInteceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(privilegeInteceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/login.html","/login")
                .excludePathPatterns("/assets/**")
                .excludePathPatterns("/images/**")
                .excludePathPatterns("/vendors/**")
                .excludePathPatterns("/favicon.ico");;
    }

}
