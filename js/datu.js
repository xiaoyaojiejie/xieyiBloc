// ············大图滚动begin·············
//1获取元素
  var inner = document.getElementById("inner");
  // var firstImg =  document.querySelector("img");
  //只获取一个就返回，没有就null
  var imgList = document.querySelectorAll("#inner img");//获取到的是类数组
  //从ie8就可以使用

  var spanList = document.querySelectorAll(".paganation span");

  //复制第一张到最后面
  var cloneFirst = imgList[0].cloneNode();//复制节点
  inner.appendChild(cloneFirst);//将复制添加到inner最后
  
  //返回的是每张图片的宽度
  var wrap = document.getElementById("wrap");
  var rightBtn = document.querySelector(".right-arrow");
  var leftBtn = document.querySelector(".left-arrow");

  var clickFlag = true;//不能连续点，走完一张才能再点

  var timer = 0;
  function autoGo() {
    var perImgWidth = document.documentElement.clientWidth;
    var begin = inner.offsetLeft;
    var end = - index * perImgWidth;
    var change = end - begin;
    var t = 0;
    var maxT = 30;
    clearInterval(timer);//开启计时器之前，先清除之前的，保证只有一个计时器在运行
    timer = setInterval(function() {
      t++;
      if(t>=maxT) {
        clearInterval(timer);
        clickFlag = true;//表示一张图片的距离已经走完
      }
      // inner.style.left = change/maxT*t + begin + "px";
      inner.style.left = Tween.Bounce.easeOut(t,begin,change,maxT) + "px";

      if(index == spanList.length && t>=maxT) {
        inner.style.left = 0;
        index = 0;
      }
    },30)
    // inner.style.left = - index * perImgWidth + "px";
    for(var j = 0; j < spanList.length; j++) {
        spanList[j].className = "";
      }

    if(index == spanList.length) {
      spanList[0].className = "active";
    }else {
      spanList[index].className = "active";
    }
    
  }
  function next() {
    index++;
    if(index > spanList.length) {
      index = 0;
    }
    autoGo();
  }
  function prev() {
    index--;
    if(index < 0) {
      //如果到最左边了，立刻切换到最后一张
      inner.style.left = - perImgWidth * spanList.length + "px";
      index = spanList.length - 1;
    }

    autoGo();
  }
  //给按钮添加事件
  for(var i = 0; i < spanList.length; i++) {
    spanList[i].index = i;
    spanList[i].onclick = function() {
      index = this.index;
      autoGo();
    }
  }
  //自动走
  var index = 0;
  var autoTimer = setInterval(next,5000);

  //鼠标移动上去事件,清掉计时器
  wrap.onmouseover = function() {
    clearInterval(autoTimer);
  }
  //鼠标离开，重启计时器
  wrap.onmouseout = function() {
    autoTimer = setInterval(next,5000);
  }

  //下一张
  rightBtn.onclick = function(){
    if(clickFlag) {
      next();
    }
    clickFlag = false;
  }

  //上一张
  leftBtn.onclick = function() {
    if(clickFlag) {
      prev();
    }
    clickFlag = false;
  }
  window.onresize=function(){
    inner.style.left = - document.documentElement.clientWidth * index + "px";
  }

/* ············大图滚动end·············*/

// ············瀑布流begin·············
var pubu = document.getElementById("pubu");
var list = pubu.getElementsByTagName("li");
// var pubu_mask = document.getElementById("pubu_mask");
// var tanchuang = document.getElementById("tanchuang");

    //获取从min~max之间的随机整数
    function rnd(min,max) {
      return parseInt(Math.random()*(max-min+1)) + min;
    }

    function createImg() {
      for(var i = 0; i < 13; i++) {
        //找高度最小的li
        var minList = list[0];
        for(var j = 0; j < list.length; j++) {
          if(minList.offsetHeight > list[j].offsetHeight) {
            minList = list[j];
          }
        }
        //将创建的块添加到高度最小的li
        var a=rnd(1,12)
        var newImg = document.createElement("img");
        newImg.src="img/png1/tu"+a+".png";
        minList.appendChild(newImg);
      }
    }
    createImg();

    // 点击变大图
    $("#pubu").on("click","img",function() {
      var img = $(this).clone();
      $("#pubu_mask").show();
      img.appendTo($("#tanchuang")).siblings().remove();
      $("#tanchuang").css({
         marginLeft:-img.context.naturalWidth/2,
        marginTop:-img.context.naturalHeight/2
      })
      $("#pubu_mask").on("click",function() {
        $(this).hide();
      })
      $("#tanchuang").on("click",function(e) {
        e.stopPropagation();
      })
    })
      
    window.onscroll = function() {
      if(pubu.getBoundingClientRect().bottom-300 <= document.documentElement.clientHeight) {
        createImg();
      }
    }
    // 当屏幕小于640的时候
    window.onresize=function() {
      if(document.documentElement.clientWidth<=640) {
        if($("#pubu li").length>2){
          hehe=$("#pubu li").eq(0).clone();
          $("#pubu li").eq(0).remove();
        }
     }else if(document.documentElement.clientWidth>640) {
      if($("#pubu li").length<3){
        hehe.appendTo($("#pubu"));
      }
      }
    }
    
// ················瀑布流end·················

// ················返回顶部begin ·················
    var topBtn = document.getElementById("goTop");
  topBtn.onclick = function() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var end = 0;
    var change = end - scrollTop;
    var t = 0;
    var maxT = 30;
    var timer = setInterval(function() {
      t++;
      if(t>=maxT) {
        clearInterval(timer);
      }
      document.body.scrollTop = Tween.Bounce.easeOut(t,scrollTop,change,maxT);
      document.documentElement.scrollTop = Tween.Bounce.easeOut(t,scrollTop,change,maxT);
    },17)
  }
  // ·················返回顶部end····················