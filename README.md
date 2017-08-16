# smp
原生javascript+css+html实现UI
 ## smp 简介
smp主要是以移动端为主的小型UI组件库,原生的javascript+html+css进行实现，UI布局是用到flexiable.js
使用了fastclick来解决移动端点击延迟,事件穿透的问题，css上使用sass+compass进行预编译处理。
效果演示地址：http://www.leijee.me

## smp 下载地址
https://github.com/leijee/smp


## 使用说明
在head中需引入的文件，包含组件的基础样式，字体文件，flexiable页面布局</br>
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;css/smp.css&quot;/&gt;</br>
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;css/iconfont.css&quot;/&gt;</br>
&lt;script src=&quot;js/flexible.js&quot;&gt;&lt;/script&gt;</br>

使用相关js组件，需要引入关键文件 &lt;script src=&quot;js/smp.js&quot;&gt;&lt;/script&gt;</br>
####  轮播组件的使用
##### html结构
&lt;div class=&quot;smp-slider&quot; id=&quot;smp-slider&quot;&gt;</br>
&nbsp; &nbsp;			&lt;div class=&quot;slider-wrapper&quot;&gt;</br>
	&nbsp; &nbsp;&nbsp; &nbsp;&lt;div class=&quot;slider-item&quot;&gt;</br>
				&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;	&lt;a href=&quot;javascript:void(0)&quot;&gt;
            &lt;img alt=&quot;&quot; src=&quot;&quot;/&gt;
					&lt;/a&gt;</br>
          	&nbsp; &nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
	&nbsp; &nbsp;&nbsp; &nbsp;&lt;div class=&quot;slider-item slider-active&quot;&gt;</br>
					&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;	&lt;a href=&quot;javascript:void(0)&quot;&gt;
          &lt;img alt=&quot;&quot; src=&quot;&quot;/&gt;
&lt;/a&gt;</br>
				&nbsp;&nbsp; &nbsp;&nbsp;&lt;/div&gt;</br>
	&nbsp; &nbsp;&nbsp; &nbsp;&lt;div class=&quot;slider-item&quot;&gt;</br>
					&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;a href=&quot;javascript:void(0)&quot;&gt;
          &lt;iimg alt=&quot;&quot; src=&quot;&quot;/&gt;
			  &lt;/a&gt;</br>
				&nbsp; &nbsp;&nbsp; &nbsp;&lt;/div&gt;</br>
&nbsp; &nbsp;		&lt;/div&gt;</br>
		&lt;/div&gt;</br>
##### js使用方法
smp.slider.init("smp-slider",{</br>
&nbsp; &nbsp;&nbsp; &nbsp;    autoplay:false,//是否自动播放</br>
&nbsp; &nbsp;&nbsp; &nbsp;    playtime:2000,//每2秒切换一张</br>
&nbsp; &nbsp;&nbsp; &nbsp;    pagination:true,//是否显示分页</br>
&nbsp; &nbsp;&nbsp; &nbsp;    currentIndex:1,//默认显示当前第一页，</br>
&nbsp; &nbsp;&nbsp; &nbsp;    durationTime:500,//默认动画效果周期为500ms</br>
&nbsp; &nbsp;&nbsp; &nbsp;    color:'#ccc',//分页背景色</br>
&nbsp; &nbsp;&nbsp; &nbsp;    activeColor:'orange',//分页当前页的颜色</br>
&nbsp; &nbsp;&nbsp; &nbsp;    sliderEnd:function(index){//滑动结束之后触发的方法</br>
&nbsp; &nbsp;&nbsp; &nbsp;      console.log('currentIndex'+index);</br>
&nbsp; &nbsp;&nbsp; &nbsp;    }</br>
});</br>
