package com.xk.love.cly.service.impl;

import com.xk.love.cly.dao.LabelMapper;
import com.xk.love.cly.entity.Label;
import com.xk.love.cly.service.LabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LabelServiceImpl implements LabelService {

    @Autowired
    private LabelMapper labelMapper;


    @Override
    public Long save(Label label) {
        label.setCreated(new Date());
        labelMapper.save(label);
        return label.getId();
    }

    @Override
    public void update(Label label) {
        labelMapper.update(label);
    }

    @Override
    public List<Label> listAll() {
        return labelMapper.listAll();
    }

    @Override
    public void delete(Long id) {
        labelMapper.delete(id);
    }
}
