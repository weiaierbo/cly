package com.xk.love.cly.entity;

import lombok.Data;

import java.util.Date;

/**
 * 电子栅栏图形
 */
@Data
public class FenceGraph {
    private Long id;
    private String color;
    private String graphType;
    private String points;
    private String radius;
    private Date created;
    private String createUser;
    private Date modified;

}
