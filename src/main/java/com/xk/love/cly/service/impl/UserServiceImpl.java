package com.xk.love.cly.service.impl;

import com.xk.love.cly.dao.UserMapper;
import com.xk.love.cly.entity.User;
import com.xk.love.cly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Desc:
 * Author: xk
 * CreateDate: 2020/3/28.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Transactional
    @Override
    public void save(User user) {
        userMapper.save(user);
    }

    @Override
    public List<User> queryList() {
        return userMapper.queryList();
    }

    @Override
    public User queryUser(User user) {
        return userMapper.queryUser(user);
    }
}
