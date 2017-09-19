##### &nbsp;&nbsp;&nbsp;&nbsp;从2015年到现在，自学在前端的路上走了也有差不多两年了，回过头来想一下，感觉很多时候为了达到快速开发项目，采用了第三方的插件，对于插件的使用时越来越熟练，也能够用jquery做一些插件的,可是前段时间突然就想，在不采用jquery或者其他的js库的情况下，自己用原生的JavaScript能否实现一些常用的功能呢？于是就花点时间自己，一个是用来总结自己的掌握的知识，一个也想分享一下自己写的，希望能跟更多人交流，学习。

##### &nbsp;&nbsp;&nbsp;&nbsp;smp 简介：使用了Javascript+html+css+flexible布局   (因为最开始的时候，随便写写，没有使用sass跟less来写css，后面的时候才想到，整个过程就还是用css来写了，打算写的差不多了，再用gulp构建工具进行基本的压缩合并之类.    功能正在更新中-----   希望能够指出其中的问题,多多交流，互相学习。)

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
    &lt;link rel="stylesheet" type="text/css" href="css/smp.css"/&gt;</br>
    &lt;link rel="stylesheet" type="text/css" href="css/iconfont.css"/&gt;</br>
    &lt;script src="js/flexible.js"&gt;&lt;/script&gt;

使用相关js组件，需要引入关键文件 &lt;script src=&quot;js/smp.js&quot;&gt;&lt;/script&gt;</br>
####  1.轮播组件的使用
##### html结构
    <div class="smp-slider" id="smp-slider">
   	   <div class="slider-wrapper">
	       <div class="slider-item">
	         	<a href="javascript:void(0)"> <img alt="" src=""/> </a>
	       </div>
	       <div class="slider-item slider-active">
	         	<a href="javascript:void(0)"> <img alt="" src=""/> </a>
	       </div>
	       <div class="slider-item">
	         <a href="javascript:void(0)"> <iimg alt="" src=""/> </a>
	       </div>
   	   </div>
     </div>
##### js使用方法
	smp.slider.init("smp-slider",{
       autoplay:false,//是否自动播放
       playtime:2000,//每2秒切换一张
       pagination:true,//是否显示分页
       currentIndex:1,//默认显示当前第一页，
       durationTime:500,//默认动画效果周期为500ms
       color:'#ccc',//分页背景色
       activeColor:'orange',//分页当前页的颜色
       sliderEnd:function(index){//滑动结束之后触发的方法
       console.log('currentIndex'+index);
       }
	})

#### 2.回到顶部
##### 1）.手动添加html 
	smp.backTop.init('smp-back-top');
##### 2）.无需添加html
    
    smp.backTop.init('smp-back-top');//方式二  注意：不需要再写html，自动创建代码片段
#### 3.弹出框
	var _confirm = $id('confirm');
	var _alert = $id('alert');
	var _success = $id('success');
	var _error= $id('error');
	var _loading= $id('loading');
	var _notify = $id('notify');
	var _actionsheet = $id('actionsheet');
	var SMP_UTILS = smp.utils;
	
	//confirm提示框
	SMP_UTILS.on('click',_confirm,function(){
		smp.dialog.confirm('提示信息','测试一下',function(){
			console.log('你点击了确定');
		});
	});
	//alert提示框
	SMP_UTILS.on('click',_alert,function(){
		smp.dialog.alert('你点击了我',function(){
			console.log('你点击了确定');
		});
	});
	//成功提示
	SMP_UTILS.on('click',_success,function(){
		smp.dialog.toast('成功','success',1000,function(){
			console.log('success');
		});
	});
	//失败提示
	SMP_UTILS.on('click',_error,function(){
		smp.dialog.toast('失败','error',function(){
			console.log('error');
		});
		setTimeout(function(){
			smp.dialog.closeToast();
		},1000);
	});
	//正在加载中提示 
	SMP_UTILS.on('click',_loading,function(){
		smp.dialog.loading('正在加载中..',2000);
	});
	//提示信息
	SMP_UTILS.on('click',_notify,function(){
		smp.dialog.notify({
				msg:'密码错误',
				time:3000,
				fix:'top',
				bgcolor:'#000',
				color:'#fff'
			},function(){
				console.log('消失了');
		});
	});
#### 4.底部菜单弹出框
	SMP_UTILS.on('click',_actionsheet,function(){
		smp.actionsheet.init('smp-actionsheet','open');
	});
	smp.actionsheet.on('open',function(){//弹出之后的回调方法
		console.log('打开了');
	});
	smp.actionsheet.on('close',function(){//关闭之后的回调方法
		console.log('关闭了');
	});
	//可以手动代码触发关闭
	//smp.actionsheet.init('smp-actionsheet','close');
