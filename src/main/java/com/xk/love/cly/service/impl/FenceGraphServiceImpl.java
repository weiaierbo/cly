package com.xk.love.cly.service.impl;

import com.xk.love.cly.dao.FenceGraphMapper;
import com.xk.love.cly.entity.FenceGraph;
import com.xk.love.cly.service.FenceGraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FenceGraphServiceImpl implements FenceGraphService {

    @Autowired
    private FenceGraphMapper fenceGraphMapper;

    @Override
    public Long save(FenceGraph fenceGraph) {
        fenceGraph.setCreated(new Date());
        fenceGraphMapper.save(fenceGraph);
        return fenceGraph.getId();
    }

    @Override
    public void update(FenceGraph fenceGraph) {
        fenceGraphMapper.update(fenceGraph);
    }

    @Override
    public List<FenceGraph> listAll() {
        return fenceGraphMapper.listAll();
    }

    @Override
    public void delete(Long id) {
        fenceGraphMapper.delete(id);
    }
}
