package com.xk.love.cly;

import com.xk.love.cly.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	private UserService userService;

	@Test
	void contextLoads() {
	}

	@Test
	public void test(){
		/*User user = new User();
		user.setSex(1);
		user.setUsername("xxx2");

		userService.save(user);*/
	}

}
