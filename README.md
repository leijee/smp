<<<<<<< HEAD
### 简说：从2015年到现在，自学在前端的路上走了也有差不多两年了，回过头来想一下，感觉很多时候为了达到快速开发项目，采用了第三方的插件，对于插件的使用时越来越熟练，也能够用jquery做一些插件的,可是前段时间突然就想，在不采用jquery或者其他的js库的情况下，自己用原生的JavaScript能否实现一些常用的功能呢？于是就花点时间自己，一个是用来总结自己的掌握的知识，一个也想分享一下自己写的，希望能跟更多人交流，学习。

### smp 简介：使用了Javascript+html+css+flexible布局   (因为最开始的时候，随便写写，没有使用sass跟less来写css，后面的时候才想到，整个过程就还是用css来写了，打算写的差不多了，再用gulp构建工具进行基本的压缩合并之类.    功能正在更新中-----   希望能够指出其中的问题,多多交流，互相学习。) 


=======
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
>>>>>>> testbranch
