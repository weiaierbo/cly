package com.xk.love.cly.dao;

import com.xk.love.cly.entity.FenceGraph;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FenceGraphMapper {

    Long save(FenceGraph fenceGraph);

    void update(FenceGraph fenceGraph);

    List<FenceGraph> listAll();

    void delete(Long id);
}
