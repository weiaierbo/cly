package com.xk.love.cly.controller;

import com.xk.love.cly.entity.User;
import com.xk.love.cly.service.UserService;
import com.xk.love.cly.vo.RestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @Desc:
 * @Author: xk
 * @CreateDate: 2020/3/28.
 */
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping("queryList")
    public List<User> queryList(){
        return userService.queryList();
    }

    @ResponseBody
    @PostMapping("login")
    public RestResponse<User> login(@RequestBody User user, HttpServletRequest request){
        User dbUser = userService.queryUser(user);
        if(dbUser == null) {
            return RestResponse.error("用户名或密码错误");
        }
        HttpSession session = request.getSession();
        session.setAttribute("SESSION_USER",user);
        return RestResponse.successWithData(dbUser);
    }


    @RequestMapping("logout")
    public String logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("SESSION_USER");
        return "index";
    }
}
