package com.xk.love.cly.dao;

import com.xk.love.cly.entity.Label;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabelMapper {

    Long save(Label label);

    void update(Label label);

    List<Label> listAll();

    void delete(Long id);
}
