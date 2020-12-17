package com.xk.love.cly.controller;

import com.xk.love.cly.entity.FenceGraph;
import com.xk.love.cly.service.FenceGraphService;
import com.xk.love.cly.vo.RestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("fenceGraph")
@RestController
public class FenceGraphController {

    @Autowired
    private FenceGraphService fenceGraphService;

    /**
     * 保存
     * @param fenceGraph
     * @return
     */
    @PostMapping("save")
    public RestResponse<Long> save(@RequestBody FenceGraph fenceGraph){
        if(fenceGraph == null || fenceGraph.getId() != null) {
            RestResponse.error("非法请求!");
        }
        Long id = fenceGraphService.save(fenceGraph);
        return RestResponse.successWithData(id);
    }

    /**
     * 更新
     * @param fenceGraph
     * @return
     */
    @PostMapping("update")
    public RestResponse<String> update(@RequestBody FenceGraph fenceGraph){
        fenceGraphService.update(fenceGraph);
        return RestResponse.successWithMessage("更新成功");
    }

    /**
     * 获取栅栏图形列表
     * @return
     */
    @RequestMapping("listAll")
    public RestResponse<List<FenceGraph>> listAll(){
        List<FenceGraph> fenceGraphs = fenceGraphService.listAll();
        return RestResponse.successWithData(fenceGraphs);
    }

    /**
     * 删除
     * @param id
     * @return
     */
    @GetMapping("delete")
    public RestResponse<String> deleteById(Long id){
        fenceGraphService.delete(id);
        return RestResponse.successWithMessage("删除成功");
    }

    @GetMapping("queryGraphById")
    public RestResponse<String> queryGraphById(Long id){
        FenceGraph fenceGraph = fenceGraphService.queryGraphById(id);
        return RestResponse.successWithData(fenceGraph);
    }
}
