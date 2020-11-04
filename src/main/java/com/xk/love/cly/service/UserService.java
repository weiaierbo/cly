package com.xk.love.cly.service;

import com.xk.love.cly.entity.User;

import java.util.List;

/**
 * Desc:
 * Author: xk
 * CreateDate: 2020/3/28.
 */
public interface UserService {

    /**
     * 保存
     * @param user
     */
    void save(User user);

    /**
     * 查询列表
     * @return
     */
    List<User> queryList();

    /**
     * 查询用户
     * @param user
     * @return
     */
    User queryUser(User user);
}
