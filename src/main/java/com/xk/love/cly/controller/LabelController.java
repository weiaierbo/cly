package com.xk.love.cly.controller;


import com.xk.love.cly.entity.Label;
import com.xk.love.cly.service.LabelService;
import com.xk.love.cly.vo.RestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("label")
@RestController
public class LabelController {

    @Autowired
    private LabelService labelService;

    /**
     * 保存
     * @param label
     * @return
     */
    @PostMapping("save")
    public RestResponse<Long> save(@RequestBody Label label){
        if(label == null || label.getId() != null) {
            RestResponse.error("非法请求!");
        }
        Long id = labelService.save(label);
        return RestResponse.successWithData(id);
    }

    /**
     * 更新
     * @param label
     * @return
     */
    @PostMapping("update")
    public RestResponse<String> update(@RequestBody Label label){
        labelService.update(label);
        return RestResponse.successWithMessage("更新成功");
    }

    /**
     * 获取标记列表
     * @return
     */
    @RequestMapping("listAll")
    public RestResponse<List<Label>> listAll(){
        List<Label> labels = labelService.listAll();
        return RestResponse.successWithData(labels);
    }

    /**
     * 删除
     * @param id
     * @return
     */
    @GetMapping("delete")
    public RestResponse<String> deleteById(Long id){
        labelService.delete(id);
        return RestResponse.successWithMessage("删除成功");
    }
}
