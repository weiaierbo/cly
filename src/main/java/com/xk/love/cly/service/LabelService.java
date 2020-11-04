package com.xk.love.cly.service;

import com.xk.love.cly.entity.Label;

import java.util.List;

public interface LabelService {


    Long save(Label label);

    void update(Label label);

    List<Label> listAll();

    void delete(Long id);
}
