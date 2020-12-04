(function ($) {
    "use strict";
    let localUser = sessionStorage.getItem('localUser');
    let user = JSON.parse(localUser);
    let hasAdminRole = false;
    //权限
    if(user && user.role == 0){
        hasAdminRole = true;
    }

    // 百度地图API功能
    var map = new BMap.Map('map');
    var poi = new BMap.Point(104.06, 30.67);
    map.centerAndZoom(poi, 16);
    map.enableScrollWheelZoom();
    /*map.setMapStyleV2({
        styleId: 'c25a02c1dea37afe58f2100e2b7401b9'
    });*/
    /*var copyCtrl = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
    map.addControl(copyCtrl);
    var bs = map.getBounds();
    copyCtrl.addCopyright({id: 2, content: "版权说明：小宇定制",bounds: bs});
    console.log(copyCtrl);
    $("span[_cid |='1']").css("display","none");*/
    //定位
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
        } else {
            //alert('百度地图定位服务错误,' + this.getStatus());
            $("#operateResult").text('百度地图定位服务错误');
            $("#operateResultModal").modal("show");
        }
    }, {enableHighAccuracy: true})

    var overlays = [];
    var graphObj = {"id":null,"color":"red","graphType": "", "points": ""};
    var overlaycomplete = function (e) {
        overlays.push(e.overlay);

        var drawingModeType = e.drawingMode;    //获取所画图形类型   e.overlay.iQ   Polygon   Circle
        submitFencePoints(e.overlay,drawingModeType);
        bindMenuToOverlay(e.overlay,drawingModeType);
        /*locPoints.forEach(function(value) {

        });*/
        /*if (drawingModeType == "circle") {
                //圆
                if(BMapLib.GeoUtils.isPointInCircle(value, e.overlay)) {
                    cirCount++;
                }
            } else if (drawingModeType == "rectangle" || drawingModeType == "polygon") {
                //矩形  或  多边形
                if(BMapLib.GeoUtils.isPointInPolygon(value, e.overlay)) {
                    polyCount++;
                }
            }
        }*/

    };

    /**
     * 提取画好的图形数据
     * @param overLay
     * @param drawingModeType
     */
    function generateGraphObj(overLay,drawingModeType) {

        graphObj.graphType = drawingModeType;
        if(drawingModeType == 'circle'){
            graphObj.radius = overLay.getRadius();
            var center = overLay.getCenter();
            graphObj.points = JSON.stringify([{"lng":center.lng,"lat":center.lat}]);
        } else {
            var points = overLay.getPath();
            var pointStr = JSON.stringify(points);
            graphObj.points = pointStr;
        }
        graphObj.color = overLay.getStrokeColor();
    }

    var styleOptions = {
        strokeColor: "red",    //边线颜色。
        //fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.4,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
    //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: hasAdminRole, //是否显示工具栏 true
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);

    function clearAll() {
        for (var i = 0; i < overlays.length; i++) {
            map.removeOverlay(overlays[i]);
        }
        overlays.length = 0
    }


    /**
     * 绑定菜单到图形覆盖物
     * @param overlay
     * @param drawingModeType
     */
    function bindMenuToOverlay(overlay,drawingModeType) {
        //权限
        if(!hasAdminRole){
            return;
        }

        var removeOverlay = function (e, ee, marker) {
            map.removeOverlay(marker);
            if(marker.da ==null){// || !isNumber(marker.da)
                //alert("还未保存到服务器!");
                return;
            }
            if(marker.da.indexOf("polygon") == -1){
                return;
            }
            var id = marker.da.substring(7);

            $.ajax({
                //请求方式
                type : "get",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url : "fenceGraph/delete",
                //数据
                data : {"id":id},
                //请求成功
                success : function(result) {
                    if(result.status == 200) {
                        $("#operateResult").text('删除成功!');
                    } else {
                        $("#operateResult").text('删除出错!');
                    }
                    $("#operateResultModal").modal("show");

                },
                //请求失败，包含具体的错误信息
                error : function(e){
                    //alert("异常");
                    $("#operateResult").text('异常!');
                    $("#operateResultModal").modal("show");
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        }

        var openEditing = function (e, ee, marker) {
            if(graphObj.id != null && graphObj.id !='' && graphObj.id != marker.da){
                alert("请保存上一个图形后再开始新的编辑!");
                return;
            }
            //赋值，确保只能对其中一个进行编辑
            graphObj.id = marker.da;
            marker.enableEditing();
        }
        var closeEditing = function (e, ee, marker) {
            marker.disableEditing();

            //保存
            submitFencePoints(marker,drawingModeType);
        }
        var markerLabel = function (e, ee, marker) {
            labelPoint = {'lng': e.lng, 'lat': e.lat};
            $("#exampleModal").modal('show');
        }
        //创建右键菜单
        var markerMenu = new BMap.ContextMenu();
        markerMenu.addItem(new BMap.MenuItem('删除', removeOverlay.bind(overlay)));

        markerMenu.addItem(new BMap.MenuItem('编辑', openEditing.bind(overlay)));
        markerMenu.addItem(new BMap.MenuItem('保存', closeEditing.bind(overlay)));
        markerMenu.addItem(new BMap.MenuItem('标记', markerLabel.bind(overlay)));
        /*var marker = new BMap.Marker(point);
        map.addOverlay(marker);*/
        overlay.addContextMenu(markerMenu);
    }

    /**
     * 提交电子栅栏数据
     * @param marker
     * @param drawingModeType
     */
    function submitFencePoints(marker,drawingModeType) {
        generateGraphObj(marker,drawingModeType);
        graphObj.id = null;
        var id=marker.da;
        if(id !=null && id != undefined && id.indexOf("polygon") != -1){//isNumber(marker.da)
            graphObj.id = id.substring(7);
            updateGraph(graphObj);
        } else {
            saveFencePoints(marker);
        }
        graphObj = {};
    }



    /**
     * 搜索使用
     * @type {BMap.Autocomplete}
     */
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "searchContent"
            , "location": map
        });

    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        $("#searchResultPanel").html(str);
    });

    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        var searchContent = _value.province + _value.city + _value.district + _value.street + _value.business;
        $("#searchResultPanel").html("onconfirm<br />index = " + e.item.index + "<br />searchContent = " + searchContent);

        setPlace(searchContent);
    });

    let searchMarker = null;
    function setPlace(searchContent) {
        //map.clearOverlays();    //清除地图上所有覆盖物
        if(searchMarker != null){
            map.removeOverlay(searchMarker);
        }
        function myFun() {
            if (local.getResults() == null || local.getResults().length <= 0) {
                return;
            }
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            searchMarker = new BMap.Marker(pp);
            map.addOverlay(searchMarker);    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(searchContent);
    }

    $('#searchButton').on('click', function () {
        var searchContent = $("#searchContent").val();
        setPlace(searchContent);
        //var $btn = $(this).button('loading')
        // business logic...
        //$btn.button('reset')
    })

    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    function saveFencePoints(marker) {

        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "fenceGraph/save",
            //数据
            data : JSON.stringify(graphObj),
            //请求成功
            success : function(result) {
                if(result.status == 200) {
                    $("#operateResult").text('保存成功!');
                    marker.da = "polygon"+result.data;
                } else {
                    $("#operateResult").text('保存出错!');
                }
                $("#operateResultModal").modal("show");
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                //alert("异常");
                $("#operateResult").text('异常!');
                $("#operateResultModal").modal("show");
            }
        });
    }

    /**
     * 更新图形栅栏
     * @param graphObj
     */
    function updateGraph(graphObj){
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "fenceGraph/update",
            //数据
            data : JSON.stringify(graphObj),
            //请求成功
            success : function(result) {
                if(result.status == 200) {
                    $("#operateResult").text(result.message);
                } else {
                    $("#operateResult").text('更新出错!');
                }
                $("#operateResultModal").modal("show");
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    var labelPoint = {};
    var labelArray = new Array();

    function saveLabel() {
        var labelContent = $("#message-text").val();
        var pointObj = new BMap.Point(labelPoint.lng, labelPoint.lat);
        var label = genetateLabelObj(labelContent,pointObj);
        map.addOverlay(label);

        //labelArray.push(label);

        var data = {"location":JSON.stringify(label.point),"content":labelContent};
        var param = JSON.stringify(data);
        $.ajax({
            //请求方式
            type : "post",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "label/save",
            //数据
            data : param,
            //请求成功
            success : function(result) {
                if(result.status == 200) {
                    $("#operateResult").text('添加标记成功!');
                    $("#message-text").val("");
                    label.da = "label"+result.data;
                } else {
                    $("#operateResult").text('添加标记出错!');
                }
                $("#operateResultModal").modal("show");
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });


        //labelPoint = {};

        //菜单
        bindMenuToLabel(label);

        $('#exampleModal').modal('hide');

    }

    function bindMenuToLabel(labelObj) {
        //权限
        if(!hasAdminRole){
            return;
        }
        var removeOverlay1 = function (e, ee, marker) {
            map.removeOverlay(marker);
            if(marker.da.indexOf("label") == -1){
                return;
            }
            var id = marker.da.substring(5);
            $.ajax({
                //请求方式
                type : "get",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url : "label/delete",
                //数据
                data : {"id":id},
                //请求成功
                success : function(result) {
                    if(result.status == 200) {
                        $("#operateResult").text('删除标记成功!');
                    } else {
                        $("#operateResult").text('删除标记出错!');
                    }
                    $("#operateResultModal").modal("show");

                },
                //请求失败，包含具体的错误信息
                error : function(e){
                    //alert("异常");
                    $("#operateResult").text('异常!');
                    $("#operateResultModal").modal("show");
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        }

        var enableEditing1 = function (e, ee, marker) {
            marker.enableEditing();
        }
        //创建右键菜单
        var markerMenu1 = new BMap.ContextMenu();
        markerMenu1.addItem(new BMap.MenuItem('删除标记', removeOverlay1.bind(labelObj)));
        //markerMenu1.addItem(new BMap.MenuItem('编辑标记', enableEditing1.bind(labelObj)));
        labelObj.addContextMenu(markerMenu1);

    }

    /**
     * 生成标记对象
     * @param labelContent
     * @param pointObj
     * @returns {BMap.Label}
     */
    function genetateLabelObj(labelContent,pointObj) {
        var opts = {
            position: pointObj,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(0, 0)    //设置文本偏移量
        }
        var label = new BMap.Label(labelContent, opts);  // 创建文本标注对象
        label.setStyle({
            color: "red",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑"
        });
        return label;
    }
    function listAllFencePoints() {
        $.ajax({
            //请求方式
            type : "get",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "fenceGraph/listAll",
            //数据
            data : null,
            //请求成功
            success : function(result) {
                if(result.status == 200) {
                    //初始化电子栅栏
                    initFenceGraphs(result.data);
                } else {
                    $("#operateResult").text('加载图形数据出错!');
                    $("#operateResultModal").modal("show");
                }

            },
            //请求失败，包含具体的错误信息
            error : function(e){
                $("#operateResult").text('异常!');
                $("#operateResultModal").modal("show");
            }
        });
    }

    function initFenceGraphs(fenceGraphs){
        if(!fenceGraphs) {
            return;
        }
        if(fenceGraphs.length <= 0) {
            return;
        }

        fenceGraphs.forEach(function(item) {
            var graphType = item.graphType;
            var points = JSON.parse(item.points);
            var pointsArr = new Array();
            for(var i in points){//parseFloat(
                pointsArr.push(new BMap.Point(points[i].lng,points[i].lat));
            }

            let fenceGraphObj;
            if (graphType == "circle") {
                //圆
                /*if(BMapLib.GeoUtils.isPointInCircle(value, e.overlay)) {
                    //cirCount++;
                }*/
                var circleCenter = new BMap.Point(points[0].lng,points[0].lat);
                fenceGraphObj = new BMap.Circle(circleCenter,item.radius,styleOptions); //创建圆

            } else if (graphType == "rectangle" || graphType == "polygon") {
                //矩形  或  多边形
                /*if(BMapLib.GeoUtils.isPointInPolygon(value, e.overlay)) {
                    //polyCount++;
                }*/
                fenceGraphObj = new BMap.Polygon(pointsArr,styleOptions);
            } else if(graphType == 'polyline') {
                fenceGraphObj = new BMap.Polyline(pointsArr,styleOptions);
            }
            fenceGraphObj.setStrokeColor(item.color);
            fenceGraphObj.setFillColor(item.color);
            fenceGraphObj.da = "polygon"+item.id;
            map.addOverlay(fenceGraphObj);

            bindMenuToOverlay(fenceGraphObj,graphType);
        })
    };

    function listAllLabels() {
        $.ajax({
            //请求方式
            type : "get",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "label/listAll",
            //数据
            data : null,
            //请求成功
            success : function(result) {
                if(result.status == 200) {
                    //初始化标记
                    initLabels(result.data);
                } else {
                    $("#operateResult").text('加载标记数据出错!');
                    $("#operateResultModal").modal("show");
                }

            },
            //请求失败，包含具体的错误信息
            error : function(e){
                $("#operateResult").text('异常');
                $("#operateResultModal").modal("show");
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }

    function initLabels(labels){
        if(!labels || labels.length <= 0){
            return;
        }

        labels.forEach(function(item) {
            var pointJson = JSON.parse(item.location);
            var point = new BMap.Point(pointJson.lng,pointJson.lat);
            var labelContent = item.content;

            var labelObj = genetateLabelObj(labelContent,point);
            labelObj.da = "label"+item.id;

            map.addOverlay(labelObj);
            bindMenuToLabel(labelObj);
        })
    }

    function customComponent(){
        // 定义一个控件类,即function
        function ZoomControl(){
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
            this.defaultOffset = new BMap.Size(10, 60);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
            // 创建一个DOM元素
            var div = document.createElement("div");
            div.id="selectColor";
            // 添加文字说明
            div.appendChild(document.createTextNode("边框颜色选择器"));
            // 设置样式
            div.style.cursor = "pointer";
            div.style.border = "1px solid gray";
            div.style.backgroundColor = "white";
            // 绑定事件,点击一次放大两级
            /*div.onclick = function(e){
                //map.setZoom(map.getZoom() + 2);
                //document.getElementById("selectColor").style.backgroundColor="#e53234";
            }*/
            // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        }
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        map.addControl(myZoomCtrl);
        $('#selectColor').colpick({
            colorScheme:'dark',
            layout:'rgbhex',
            color:'ff8800',
            onSubmit:function(hsb,hex,rgb,el) {
                $("#selectColor").css('background-color', '#'+hex);
                graphObj.color = '#'+hex;
                drawingManager.circleOptions.strokeColor = '#'+hex;
                $(el).colpickHide();
            }
        })
    }
    initPage();

    function initPage() {
        $("#saveLabel").on('click', saveLabel);
        if(hasAdminRole) {
            customComponent();
        }
        listAllFencePoints();
        listAllLabels();
    }


})(jQuery);