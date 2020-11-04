package com.xk.love.cly.config;

import com.xk.love.cly.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author xk
 * @create 2020-07-08 17:50
 */
@Component
public class PrivilegeInteceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        String contextPath = request.getContextPath();
        /*if(uri.indexOf("/login")!=-1){
            return true;
        }*/
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("SESSION_USER");
        if(user == null) {
            response.sendRedirect(request.getContextPath()+"/login.html");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }
}
