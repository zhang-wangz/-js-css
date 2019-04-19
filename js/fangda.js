var small=document.getElementById("item-detail-big-img");
var big=document.getElementById("big");
var search=document.getElementById("search");
//鼠标移入small时显示search和big
small.onmouseover=function(){
    big.style.display="block";
    search.style.display="block";
}
//鼠标移出small时隐藏search和big
small.onmouseout=function(){
    big.style.display="none";
    search.style.display="none";
}
small.onmousemove=function() {
    var evt = event || arguments[0];
    //获取当前鼠标坐标
    var x = evt.clientX - small.offsetLeft - search.offsetWidth / 2;
    var y = evt.clientY - small.offsetTop - search.offsetHeight / 2;
    //判断当前位置search显示框不能移出small框
    if (x < 0) {
        search.style.left = 0 + "px";
    } else if (x >= small.offsetWidth - search.offsetWidth) {
        search.style.left = small.offsetWidth - search.offsetWidth + "px";
    } else {
        search.style.left = x + "px";
    }
    if (y < 0) {
        search.style.top = 0 + "px";
    } else if (y >= small.offsetHeight - search.offsetHeight) {
        search.style.top = small.offsetHeight - search.offsetHeight + "px";
    } else {
        search.style.top = y + "px";
    }
    //计算放大比例，这个比例是大图片和小图片的比例
    var w = 400 / 170;
    //显示放大区域
    big.style.backgroundPosition = (-search.offsetLeft) * w + "px" + " " + (-search.offsetTop) * w + "px";
}