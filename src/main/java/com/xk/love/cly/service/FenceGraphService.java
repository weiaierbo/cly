package com.xk.love.cly.service;

import com.xk.love.cly.entity.FenceGraph;

import java.util.List;

public interface FenceGraphService {

    Long save(FenceGraph fenceGraph);

    void update(FenceGraph fenceGraph);

    List<FenceGraph> listAll();

    void delete(Long id);

    FenceGraph queryGraphById(Long id);
}
