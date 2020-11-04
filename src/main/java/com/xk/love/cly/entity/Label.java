package com.xk.love.cly.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Label {

    private Long id;

    private String content;

    private String location;

    private Date created;

    private String createUser;

    private Date modified;

}
