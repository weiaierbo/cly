package com.xk.love.cly;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 *
 * @author xk
 */
@MapperScan("com.xk.love.cly.dao")
@SpringBootApplication
public class LoveApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(LoveApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(LoveApplication.class);
	}

}
