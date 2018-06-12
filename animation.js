 function startMove (ele,obj,fn) {
        clearInterval(ele.timer); //清除之前的定时器，防止定时器的叠加
        ele.timer = setInterval(function(){
           flag = true; //判断是否所有的属性都已经达到目标值
            for(attr in obj){
                 var speed = 0;
                 var currentStyle;
                 if(attr == 'opacity'){ //透明度opacity是小数，所以要做特殊处理
                     currentStyle = Math.round(parseFloat(getStyle(ele,attr))*100);
                 }else {
                     currentStyle = Math.round(parseFloat(getStyle(ele,attr)));
                 }

                 speed = (obj[attr] - currentStyle) / 8; //缓冲运动，速度和距离成正比
                 speed = speed>0 ? Math.ceil(speed) : Math.floor(speed) //取整数，一般属性值没有小数表示
                 if(currentStyle != obj[attr]){
                     flag = false;//表示还有属性值没有达到目标值，要继续执行定时操作
                     if(attr == 'opacity'){
                         ele.style.filter = "alpha(opacity:"+currentStyle+speed +")" ;
                         ele.style.opacity = (currentStyle+speed) / 100 ;
                     }else{
                         ele.style[attr] = currentStyle + speed +'px';
                     }
                    
                 }

            }

            if(flag){ //若所有属性都已经达到目标值，则当前动画已全部完成；清除定时器，执行回调函数

                clearInterval(timer);
                if(fn){
                    fn();
                }
            }
            

        },30);

    }


 function getStyle (obj,attr) {
    if(window.getComputedStyle){ 
        return window.getComputedStyle(obj,null).getPropertyValue(attr);
    }else { 
        return obj.currentStyle.getPropertyValue(attr); //兼容IE
    }

 }