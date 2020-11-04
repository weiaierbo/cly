package com.xk.love.cly.vo;

public class RestResponse<T> {

    private  T data;
    private Integer status;
    private String message;

    public static RestResponse successWithData(Object data){
        RestResponse restResponse = new RestResponse();
        restResponse.data = data;
        restResponse.setStatus(200);
        return restResponse;
    }
    public static RestResponse successWithMessage(String message){
        RestResponse restResponse = new RestResponse();
        restResponse.setMessage(message);
        restResponse.setStatus(200);
        return restResponse;
    }
    public static RestResponse error(String message){
        RestResponse restResponse = new RestResponse();
        restResponse.setMessage(message);
        restResponse.setStatus(400);
        return restResponse;
    }

    public  T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
