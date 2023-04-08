(function ($) {

 function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = decodeURIComponent(r[2]);
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    let ak = sessionStorage.getItem('ak');


window.BMap_loadScriptTime = (new Date).getTime();
var baidu = '<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=3.0&ak='+ak+'&services=&t=20230317105246"></script>';
$("head").append(baidu);

setTimeout(function(){
var scriptqq = "<script type=\"text/javascript\" src=\"http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js\"></script>";
    $("head").append(scriptqq);
},1200);

var scriptqq1 = "<link rel=\"stylesheet\" href=\"http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css\"/>";
   $("head").append(scriptqq1);

   setTimeout(function(){
   var scriptqq2 = "<script type=\"text/javascript\" src=\"http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.js\"></script>";
      $("head").append(scriptqq2);
   var scriptqq3 = "<script type=\"text/javascript\" src=\"http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js\"></script>";
      $("head").append(scriptqq3);
   },1500);

var scriptqq4 = "<link rel=\"stylesheet\" href=\"http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.css\"/>";
         $("head").append(scriptqq4);

   setTimeout(function(){
    var scriptContent1 = "<script type=\"text/javascript\" src=\"assets/js/map/mapsoso.js?v=1.52\"></script>";
   $("head").append(scriptContent1);
   },1600);

})(jQuery);

