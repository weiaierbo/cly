package com.xk.love.cly.entity;

import lombok.Data;

/**
 * @Desc:
 * @Author: xk
 * @CreateDate: 2020/3/28.
 */
@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private Integer sex;
    /**
     * 0管理员 1普通用户
     */
    private Integer role;

    private String ak;
}
