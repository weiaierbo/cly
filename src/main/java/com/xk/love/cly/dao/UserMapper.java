package com.xk.love.cly.dao;

import com.xk.love.cly.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Desc:
 * Author: xk
 * CreateDate: 2020/3/28.
 */
@Repository
public interface UserMapper {

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
