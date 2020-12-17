package com.xk.love.cly.dao;

import com.xk.love.cly.entity.FenceGraph;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 栅栏mapper
 */
@Repository
public interface FenceGraphMapper {

    /**
     * 保存
     * @param fenceGraph
     * @return
     */
    Long save(FenceGraph fenceGraph);

    /**
     * 更新
     * @param fenceGraph
     */
    void update(FenceGraph fenceGraph);

    /**
     * 查询所有
     * @return
     */
    List<FenceGraph> listAll();

    /**
     * 删除
     * @param id
     */
    void delete(Long id);

    /**
     * 根据id查询
     * @param id
     * @return
     */
    FenceGraph queryGraphById(Long id);
}
