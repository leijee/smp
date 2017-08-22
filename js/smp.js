/**
 * time:2017/7/21
 * author:雷杰
 **/
//使用querySelectorAll 获取dom对象
function $$(selector){
	var _selectors = document.querySelectorAll(selector);
	return Array.prototype.slice.call(_selectors);
}
//id选择器
function $id(elementStr){
	if(typeof elementStr != 'string'){
		return null;
	}
	return document.getElementById(elementStr);
}
//html节点加载完成之后执行的方法
function $ready(callback){
	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			callback();
		}, false);
	}	
}
//对cookie的操作
var Cookies = (function(){
	
	var encodeStr = function(str){
		var str = encodeURIComponent(str);
		return str;
	}
	var decodeStr = function(str){
		var str = decodeURIComponent(str);
		return str;
	}
	
	return {
		set:function(key,value,option){
			var options =option||{expire:3};
			
			
		},
		get:function(key){
			
		},
		hasItem:function(key){
			
		},
		keys:function(){
			
		},
		removeItem:function(){
			
		}
	}
	
})();



(function(window,factory){
	if(typeof define == 'function'&&define.amd){
		define(function(){
			return factory(window);
		});
	}else{
		factory(window);
	}
}(this,function(window){
	
	var doc = document,handle;//添加的事件处理函数handle
	/**
	 * 选择器方法 
	 **/
	var Smp = function(){
		window._this = this;
		if(typeof(Smp) == 'function'){
			
		}
	}
	
	Smp.prototype.utils = {
		pageScroll: function () {
            var w_height = document.documentElement.clientHeight;
            var islock = false;
            var _body =$$('body')[0];
            return {
                lock: function () {
                    if (islock)return;
                    islock = true;
					setStyle(_body,{height:w_height,overflow:'hidden'});
					
                },
                unlock: function () {
                    islock = false;
					setStyle(_body,{height:'auto',overflow:'auto'});
                }
            };
        }(),
		queryString: function(param){//获取url上参数的值
			var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg),
            qs = '';
	        if (r != null)qs = decodeURIComponent(r[2]);
	        return qs;
		},
		isSupport: function(obj){//检查当前浏览器是否支持obj对象
			var checkObj = obj;
			if(window[checkObj]){
				return true;
			}else{
				throw new Error('该浏览器不支持【'+checkObj+'】对象');
				return false;
			}
		},
		localStorage:{
			set: function(key,value){
				if(_this.utils.isSupport('localStorage')){
					localStorage.setItem(key,value);
				}
			},
			get: function(key){
				if(_this.utils.isSupport('localStorage')){
					return localStorage.getItem(key);
				}
			},
			remove: function(key){
				if(_this.utils.isSupport('localStorage')){
					if(key){
						localStorage.removeItem(key);
					}else{
						localStorage.removeItem();
					}
				}
			}
		},
		sessionStorage:{
			set: function(key,value){
				if(_this.utils.isSupport('sessionStorage')){
					sessionStorage.setItem(key,value);
				}
			},
			get: function(key){
				if(_this.utils.isSupport('sessionStorage')){
					return sessionStorage.getItem(key);
				}
			},
			remove: function(key){
				if(_this.utils.isSupport('sessionStorage')){
					if(key){
						sessionStorage.removeItem(key);
					}else{
						sessionStorage.removeItem();
					}
				}
			}
		},
		on: function(type,elem,handleFun,bool){
			var that = this;
			handle = function(e){
				handleFun(e);
			}
			
			if(isBoolean(bool)){
				bool = false;
			}
			
			if(elem == 'undefined'||elem == null){
				throw new Error('elem must be node type');
			}else{
				elem.addEventListener(type,handle,bool);
			}
			if(isArray(elem)){
				for(var i =0,len = elem.length;i<len;i++){
						elem[i].addEventListener(type,handle,bool);
				}
			}
		},
		off: function(type,elem,handleFun){
			var that = this;
			handle = function(){
				handleFun();
			}
			elem.removeEventListener(type,handle);
		}
	}

	Smp.prototype.dialog ={
		//询问框,title  标题，content内容,opts对象为设置的参数,sureFun 点击确定之后执行的回调方法
		confirm:function(title,content,opts,sureFun){
			var cId = 'Smp_confirm';
			
			if(!isString(title)){
				throw new Error('The title must be of type string');
			}
			if(!isString(content)){
				throw new Error('The content must be of type string');
			}
			var callback = null;

			if(isFunction(arguments[2])){//如果第三个参数opts是函数，那么将代替sureFun成为回调函数
				callback = opts;
			}else{
				callback = arguments[3];
			}
			var dom = doc.createElement('div');
			dom.setAttribute('class','mask-black-dialog');
			dom.setAttribute('id',cId)
			var confirmStr ='<div class="m-confirm">'
								+'<div class="confirm-header">'
									+'<strong class="confirm-title">'+title+'</strong>'
								+'</div>'
								+'<div class="confirm-body">'+content+'</div>'
								+'<div class="confirm-foot">'
									+'<a href="javascript:;" class="confirm-btn default btn-cancel">取消</a> <a href="javascript:;" class="confirm-btn primary btn-sure">确定</a>'
								+'</div>'
							+'</div>';
			dom.innerHTML = confirmStr;
			$$('body')[0].appendChild(dom);
			var sureBtn = $$(".confirm-btn.btn-sure")[0];
			var cancelBtn = $$(".confirm-btn.btn-cancel")[0];
			
			var removeDialog = function(){
				$$('body')[0].removeChild(dom);
				_this.utils.pageScroll.unlock();
			}
			
			_this.utils.on('click',sureBtn,function(){
				callback();
				removeDialog();
			});
			_this.utils.on('click',cancelBtn,function(){
				removeDialog();
			});
			_this.utils.pageScroll.lock();
		},
		alert:function(content,callback){
			var cId = 'Smp_alert';
			if(!isString(content)){
				throw new Error('The content must be of type string');
			}
			var dom = doc.createElement('div');
			dom.setAttribute('class','mask-black-dialog');
			dom.setAttribute('id',cId)
			var alertStr ='<div class="m-confirm">'
								+'<div class="confirm-body alert">'+content+'</div>'
								+'<div class="confirm-foot">'
									+'<a href="javascript:;" class="confirm-btn primary btn-sure">确定</a>'
								+'</div>'
							+'</div>';
			dom.innerHTML = alertStr;
			$$('body')[0].appendChild(dom);
			var sureBtn = $$(".confirm-btn.btn-sure")[0];
			var cancelBtn = $$(".confirm-btn.btn-cancel")[0];
			_this.utils.pageScroll.lock();
			_this.utils.on('click',sureBtn,function(){
				if(isFunction(arguments[1])){
					callback();
				}
				$$('body')[0].removeChild(dom);
				_this.utils.pageScroll.unlock();
			});
		},
		toast:function(msg,type,timeout,callFun){
			var cId = 'Smp_toast'
			var timer = null;
        	var callback = null;
        	
        	if(type == 'undefined'){
        		type = 'success';//默认为success
        	}
        	var iconHtml = '';
            if (type == 'success' || type == 'error') {
                iconHtml = '<div class="' + (type == 'error' ? 'toast-error-ico' : 'toast-success-ico') + '"></div>';
            }
        	if(typeof msg ==''){
        		throw new Error('The msg is must be fill');
        	}
        	var dom = doc.createElement('div');
			dom.setAttribute('class','mask-black-dialog');
			dom.setAttribute('id',cId)
            var toastStr ='<div class="m-toast ' + (iconHtml == '' ? 'none-icon' : '') + '">'
                			+iconHtml+'<p class="toast-content">' + (msg || '') + '</p>'
                		  +'</div>';
            _this.utils.pageScroll.lock();
			dom.innerHTML = toastStr;
            $$('body')[0].appendChild(dom);
        	
        	if(isFunction(timeout)){//没有设置超时时间，直接使用回调函数
        		callback = timeout;
        	}else if(isNumber(timeout)){
        		callback = callFun;
        		timer = setTimeout(function(){
	        		_this.utils.pageScroll.unlock();
	        		$$('body')[0].removeChild(dom);
	        		callback();
	        		clearTimeout(timer);
	        	},timeout);
        	}else{
        		throw new Error('类型错误');
        	}
		},
		closeToast:function(callback){
			_this.utils.pageScroll.unlock();
    		$$('body')[0].removeChild($$('#Smp_toast')[0]);
    		if(isFunction(callback)){
    			callback();
    		}
		},
		loading:function(text,timeout){//时间不填的话默认一直显示正在加载中
			var cId = 'Smp_loading';
			if(!isString(text)){
				throw new Error('The text must be of type string ');
			}
			var timer = null; 
			var dom = doc.createElement('div');
			dom.setAttribute('class','mask-black-dialog');
			dom.setAttribute('id',cId)
            var loadingStr ='<div class="m-loading">' 
                    		+'<div class="loading-icon"></div>' 
                    		+'<div class="loading-txt">' + (text || '数据加载中') + '</div>'
            		     +'</div>'; 
			dom.innerHTML = loadingStr;
            $$('body')[0].appendChild(dom);
            _this.utils.pageScroll.lock();
            if(timeout!='undefined'&& typeof timeout == 'number'){
            	timer = setTimeout(function(){
            		_this.utils.pageScroll.unlock();
					$$('body')[0].removeChild($$('#Smp_loading')[0]);
					clearTimeout(timer);
            	},timeout);	
            }
		},
		closeLoding:function(){
			_this.utils.pageScroll.unlock();
			$$('body')[0].removeChild($$('#Smp_loading')[0]);
		},
		notify:function(params,callFun){//callback  消失之后执行的回调函数
			var cId = 'smp_notify';
			var timer = null;
			var defaults = {
				msg:'', //msg:默认内容
				time:2000, //time默认消失时间
				fix:'top', //fix显示出现位置
				bgcolor:'#000',//默认背景颜色
				color:'#fff'//默认字体颜色
			};
			var options = s_extend(defaults,params);
			if(options == ''||!isObject(options)){
				throw new Error('The params cannot be empty or must be object type');
			}
			var _msg = options.msg;
			var _time = options.time;
			var _fix = options.fix;
			var _position = '';
			var _bgcolor = options.bgcolor;
			var _color = options.color;
			
			var notifys_Out = 'notify-upOut';
			if(_fix == 'top'){
				_position = 'notify-top';
				notifys_Out = 'notify-upOut';
			}else if(_fix == 'bottom'){
				_position = 'notify-bottom';
				notifys_Out = 'notify-downOut';
			}else{
				throw new Error('fix must be top or bottom');
			}
			var dom = doc.createElement('div');
			dom.setAttribute('id',cId)
            var notifytStr ='<div class="m-notify '+_position+'" style="background:'+_bgcolor+';color:'+_color+'">' + _msg + '</div>';
			dom.innerHTML = notifytStr;
            $$('body')[0].appendChild(dom);
			timer = setTimeout(function(){
				addClass($$('.m-notify')[0],notifys_Out);
				$$('.m-notify')[0].addEventListener('webkitAnimationEnd',function(){
					$$('body')[0].removeChild(dom);
					clearTimeout(timer);
					if(isFunction(callFun)){
						callFun();
					}
				});
			},_time);
		}
	}
	/**
	 *支持主流浏览器的轮播，更适用于移动端 
	 *使用方式 smp.slider.init('smp-slider',option);smp-slider是当前轮播组件的id名
	 * option是一个对象，通过传入的参数自定义轮播
	 **/
	Smp.prototype.slider = {
		init:function(ele,option){
			if(!isString(ele)){
				throwError('请传入轮播组件id');
			}
			var option = option||{};//设置参数
			var timer = null;//设置一个定时器
			var default_opt = {
				autoplay:false,//默认不自动播放
				playtime:2000,//每2秒切换一张
				pagination:true,//是否显示分页
				color:'#333',//分页的颜色
				activeColor:'#46B8DA',//选中分页按钮颜色
				positionY:'bottom',//分页显示位置 top,bottom
				currentIndex:2,//默认显示当前第一页，
				durationTime:500,//默认动画效果周期为500ms
				sliderStart:null,//开始滑动
				sliderEnd:null //结束滑动
			};
			
			var current_opt = s_extend(default_opt,option);
			var autoplay = current_opt.autoplay;
			var pagination = current_opt.pagination;
			var paginationColor = current_opt.paginationColor;
			var currentIndex = current_opt.currentIndex;
			var positionY = current_opt.positionY;
			var playtime = current_opt.playtime;
			var durationTime = current_opt.durationTime+'ms';
			var distance = 40;//滑动距离
			var p_color = default_opt.color;//滑块颜色
			var activeColor = default_opt.activeColor;//选中当前的滑块的颜色
			
			var sliders = $$("#"+ele)[0];//id为ele的 slider的元素
			var wrapperWidth = parseInt(getStyle(sliders,'width'));//获取当前slider的宽度
			var wrapper = $$("#"+ele+">.slider-wrapper")[0];//获取当前slider下面的滑块wrapper
			var sliderItem = $$("#"+ele+" .slider-item");
			var itemLen = sliderItem.length;
			
		    var refremPage = function(){
		    	wrapperWidth = parseInt(getStyle(sliders,'width'));
				sliderItem = $$("#"+ele+" .slider-item");
				itemLen = sliderItem.length;
		        for(var i =0;i<itemLen;i++){
					setStyle(sliderItem[i],{width:wrapperWidth+'px'});
				}
		    }
		    window.addEventListener('resize', refremPage, false);
			window.addEventListener('pageshow', refremPage, false);
			for(var i =0;i<itemLen;i++){
				setStyle(sliderItem[i],{width:wrapperWidth+'px'});
				var pageX;
				var currPageX;
				var val;
				(function(i){
					sliderItem[i].addEventListener('touchstart',function(e){
						pageX = e.changedTouches[0].clientX;
						if(autoplay){//自动播放滑动滑块时关闭自动播放,清除定时器
							clearInterval(timer);
						}
					});
					sliderItem[i].addEventListener('touchmove',function(e){
						currPageX = e.changedTouches[0].clientX;
						val = parseInt(currPageX)-parseInt(pageX);
						if(i==0){//第一页
							if(val>distance){
								currentVal = distance;
							}else{
								currentVal = val;
							}
						}else {//中间页
							if(val<0){
								if(val<-distance){
									currentVal = '-'+(wrapperWidth*i + distance);
								}else{
									currentVal = '-'+(wrapperWidth*i + Math.abs(val));
								}
							}else if(val>0){
								if(val>distance){
									currentVal = '-'+(wrapperWidth*i - distance);
								}else{
									currentVal = '-'+(wrapperWidth*i - Math.abs(val));
								}
							}
						}
						setStyle(wrapper,{transform:'translate3d('+currentVal+'px,0px,0px)',webkitTransform:'translate3d('+currentVal+'px,0px,0px)'});
					})
					sliderItem[i].addEventListener('touchend',function(e){
						endPageX = e.changedTouches[0].clientX;
						currentIndex = i+1;
						var leftWidth;
						if(i == 0){//当前是第一页
							if(val<-distance){
								leftWidth = "-"+(wrapperWidth*i+wrapperWidth);
								currentIndex +=1;
							}else{
								leftWidth = 0;
							}
						}else if(i< itemLen-1){
							if(val<0&&(val<-distance||val == -distance)){//向左滑
								leftWidth = "-"+(wrapperWidth*i+wrapperWidth);
								currentIndex += 1;
							}else if(val<0&&val>-distance){
								leftWidth = "-"+(wrapperWidth*i);
							}else if(val>0&&val<distance){//向右滑 <distance时
								leftWidth = "-"+(wrapperWidth*i);
							}else if(val>0&&(val>distance||val == distance)){//向右滑 >distance时
								leftWidth = "-"+(wrapperWidth*i-wrapperWidth);
								currentIndex -= 1;
							}
						}else if(i && i == itemLen-1){//最后一页
							if(val<0&&val<-distance){//向左滑
								leftWidth = "-"+(wrapperWidth*i);
							}else if(val<0&&(val>-distance||val == -distance)){
								leftWidth = "-"+(wrapperWidth*i);
							}else if(val>0&&val<distance){//向右滑 <distance时
								leftWidth = "-"+(wrapperWidth*i);
							}else if(val>0&&(val>distance||val == distance)){//向右滑 >distance时
								leftWidth = "-"+(wrapperWidth*i-wrapperWidth);
								currentIndex -=1;
							}
						}
						if(currentIndex>itemLen){
							currentIndex = itemLen;
						}
						setStyle(wrapper,{webkitTransform:'translate3d('+leftWidth+'px,0px,0px)',transitionDuration:durationTime});
						if(autoplay){//是否自动播放
							timer = setInterval(starts,playtime);//自动播放切换滑块之后开启自动播放，开启定时器
						}
						setActive(currentIndex);
						if(isFunction(current_opt.sliderEnd)){//滑动结束执行的方法
							current_opt.sliderEnd(currentIndex,this);//当前元素的下标以及当前元素
						}
					})
				}(i));
			}
			active(currentIndex);
			var lefts;//根据当前显示的index，计算出当前的位置
			lefts =(currentIndex == 1)?0:"-"+(wrapperWidth*(currentIndex-1));
			setStyle(wrapper,{webkitTransform:'translate3d('+lefts+'px,0px,0px)',transitionDuration:durationTime});
			if(pagination){//是否显示分页按钮
				//分页
				var pagStr = document.createElement('ul');
				addClass(pagStr,'slider-pagination');
				addClass(pagStr,positionY)
				var liStr='';
				for(var i =0;i<itemLen;i++){
					if(currentIndex == i+1){//currentIndex 为当前显示页
						liStr+='<li class="active" style="background:'+activeColor+'"></li>';
					}else{
						liStr +='<li style="background:'+p_color+'"></li>';
					}
				}
				pagStr.innerHTML = liStr;
				$$("#smp-slider")[0].appendChild(pagStr);
				var paginationList = $$('.slider-pagination li');
				var p_len = paginationList.length;
				for(var p= 0;p<p_len;p++){
					(function(p){
						_this.utils.on('click',paginationList[p],function(e){
							currentIndex = p+1;
							var leftWidth = "-"+(wrapperWidth*p);
							setStyle(wrapper,{webkitTransform:'translate3d('+leftWidth+'px,0px,0px)',transitionDuration:durationTime});
							setActive(currentIndex);
						})
					}(p));
				}
			}
			
			function active(_index){
				var _index = _index;
				for(var j = 0;j<itemLen;j++){
					if((_index) == j+1){
						addClass(sliderItem[j],'slider-active');
					}else{
						removeClass(sliderItem[j],'slider-active');
					}
				}
			}
			
			function setActive(i){//动态设置分页按钮
				var pagination_li = $$('.slider-pagination li');
				currentIndex = i || currentIndex;
				var li_len = pagination_li.length;
				for(var j =0;j<li_len;j++){
					if((currentIndex) == j+1){
						
						addClass(pagination_li[j],'active');
						setStyle(pagination_li[j],{background:activeColor});
					}else{
						removeClass(pagination_li[j],'active');
						setStyle(pagination_li[j],{background:p_color});
					}
				}
				active(currentIndex);
			}
			
			
			
			//是否自动播放
			if(autoplay){
				clearInterval(timer);
				timer = setInterval(starts,playtime);
			}
			function starts(){
				var leftWidth;
				current_opt.sliderEnd(currentIndex);
				if(currentIndex == itemLen+1){
					setActive(itemLen);
				}else{
					setActive(currentIndex);
				}
				if(currentIndex< itemLen+1){
					leftWidth =(currentIndex == 1)?0:"-"+(wrapperWidth*(currentIndex-1));
					currentIndex = currentIndex + 1;
				}else if(currentIndex == itemLen){
					leftWidth = 0;
					currentIndex = 1;
				}
				if(currentIndex>itemLen){
					currentIndex = 1;
				}
				setStyle(wrapper,{webkitTransform:'translate3d('+leftWidth+'px,0px,0px)',transitionDuration:durationTime});
			}
		}
		,apiInit:function(){
			console.log('使用api的方式,初始化slider-api');
		}
	}
	Smp.prototype.Search = {
		init:function(ele,searchBtn,option){
			var _search = $$('#'+ele)[0];
			if(!_search){
				throw new Error('对象不存在');
			}
			var defaults = {
				showHistory:true//显示搜索历史
			};
			var options = s_extend(defaults,option);
			var _close = $$('.search-bar .close')[0];//清空搜索内容按钮
			var searchBar = $$('.search-bar input')[0];//搜索内容
			var delete_history = $$('#delete-history')[0];//清空历史记录
			var _back = $$('.search-back .back')[0];//返回按钮
			var _sureSearch = $$('.search-sure .sure-btn')[0];
			
			var search_history = $$('#'+ele+' .search-history')[0];//搜索历史
			var search_hot = $$('#'+ele+' .search-hot')[0];//搜索热门
			var search_result = $$('#'+ele+' .search-result')[0];//动态搜索结果
			var _historyList = $$('#'+ele+' .search-history .historyList')[0];
			
			var getHistory = function(key){
				var historyRecord = _this.utils.localStorage.get(key)||'[]';
				var obj = JSON.parse(historyRecord);
				return obj;
			}
			var showHistory = function(key){
				var historyData = getHistory(key);
				var dataStr = '';
				if(historyData.length>0){
					for(var i=0,len=historyData.length;i<len;i++){
						dataStr+='<li class="tag"><a href="#">'+historyData[i].text+'</a></li>';
					}
				}
				_historyList.innerHTML = dataStr;
				if(_historyList.innerHTML !=''){
					setStyle(search_history,{display:'block'});
				}else{
					setStyle(search_history,{display:'none'});
				}
				setStyle(search_hot,{display:'block'});
				setStyle(search_result,{display:'none'});
			}
			showHistory('history');
			var setHistory = function(key,value){
				var obj = getHistory(key);
				var flag = 0;
				if(obj.length ===0){
					obj.push(value);
				}else{
					for(var i in obj){
						if(JSON.stringify(value)!= JSON.stringify(obj[i])||obj.length === 0){
							
							flag +=1;
						}else{
							flag +=0;
							return ;
						}
					}
					if(flag){
						obj.push(value);
					}
				}
				
				_this.utils.localStorage.set(key,JSON.stringify(obj,function(tt,val){
					return val;
				}));
			}
			var searchValue = '';
			var zh_Lock = false;
			var result_or_history = function(zh_Lock,callFun_result,callFun_history){
				if(!zh_Lock){
					if(searchValue != ''){//显示搜索结果
						setStyle(search_history,{display:'none'});
						setStyle(search_hot,{display:'none'});
						setStyle(search_result,{display:'block'});
						if(isFunction(callFun_result)){
							callFun_result();
						}
					}else{//显示搜索历史
						setStyle(search_history,{display:'none'});
						setStyle(search_hot,{display:'block'});
						setStyle(search_result,{display:'none'});
						if(isFunction(callFun_history)){
							callFun_history();
						}
					}
				}
			}
			_this.utils.on('compositionstart',searchBar,function(e){
				zh_Lock = true;
			},true);
			_this.utils.on('compositionend',searchBar,function(e){
				zh_Lock = false;
				result_or_history(zh_Lock,null,null);
			},true);
			_this.utils.on('input',searchBar,function(e){
				searchValue = e.target.value;
				result_or_history(zh_Lock,null,null);
			},true);
			_this.utils.on('click',delete_history,function(e){
				_this.dialog.confirm('提示信息','是否删除历史记录',function(){
					_historyList.innerHTML = '';
					setStyle(search_history,{display:'none'});
					_this.utils.localStorage.remove('history');
				})
			});
			_this.utils.on('click',_back,function(){
				setStyle(_search,{display:'none'});
			});
			_this.utils.on('click',_sureSearch,function(e){
				var searchText = searchBar.value;
				if(searchText!=''){
					setHistory('history',{text:searchText});
				}
				setStyle($$('#smp-search')[0],{display:'none'});
			});
			_this.utils.on('click',_close,function(e){
				searchBar.value = '';
				if(searchBar.value == ''){
					if(_historyList.innerHTML!=''){
						setStyle(search_history,{display:'block'});
						showHistory('history');
					}
					setStyle(search_hot,{display:'block'});
					setStyle(search_result,{display:'none'});
				}
			});
			
			smp.utils.on('click',$$('#'+searchBtn)[0],function(){
				setStyle($$('#smp-search')[0],{display:'block'});
				showHistory('history');
			});
			
			function changeBgcolor(){
				var scroll_top =  window.document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop;
				
				var opt = 0;
				if(scroll_top<1000){
					opt = scroll_top*0.001;
				}else{
					opt = 1;
				}
				setStyle($id('search-bg'),{opacity:opt});
			}
			document.addEventListener('scroll',changeBgcolor);
			
		},
		on:function(ele,callback){
			var zh_Lock = false;
			_this.utils.on('compositionstart',ele,function(e){
				zh_Lock = true;
			},true);
			_this.utils.on('compositionend',ele,function(e){
				zh_Lock = false;
				
				if(!zh_Lock){
					console.log('');
				}
				
			},true);
			_this.utils.on('input',ele,function(e){
				var searchValue = e.target.value;
				if(zh_Lock){
				}
			},true);
		}
	}
	//回到顶部
	function backTop(ele){
		if(ele == undefined){
			var ele = _this.backTop.create();
		}
		//指定的顶部滚动高度为100
		var winHeight =  document.body.clientHeight;//可见区域高度
		var docHeight = getStyle($$('body')[0],'height');//内容的高度
		var topVal = parseInt(docHeight)*0.15;//文档高度的15%作为判断的临界值
		var backTopBtn = $$('#'+ele)[0];
		var scrollTop =  window.document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop;
		var setScroll = function(scrollTop){
			if(scrollTop>topVal){
				addClass(backTopBtn,'animatedFadeIn');
				setStyle(backTopBtn,{display:'block'});
			}else{
				removeClass(backTopBtn,'animatedFadeIn');
				setStyle(backTopBtn,{display:'none'});
			}
		}
		setScroll(scrollTop);
		//给窗口添加一个滚动事件
		window.addEventListener('scroll',function(){
			scrollTop = window.document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop;
			setScroll(scrollTop);
		});
		backTopBtn.addEventListener('click',function(){
			document.body.scrollTop = 0;
			window.document.documentElement.scrollTop = 0;
		});
	}
	
	/**
	 *回到顶部   smp.backTop.init('smp-back-top');
	 **/
	Smp.prototype.backTop ={
		init:function(ele){
			backTop(ele);
		},
		create:function(){
			var id = 'smp-back-top';
			var div = document.createElement('div');
			addClass(div,'smp-back-top');
			addClass(div,'animated');
			div.id = id;
			div.innerHTML = '<i class="iconfont icon-less"></i>';
			$$('body')[0].appendChild(div);
			return id;
		}
	}
	/**
	 *图片出现在可见区域里的时候，显示图片 
	 **/
	function lazyLoadImg(timeover){
		var lazyImg = $$('.lazy-img');
		var img_len = lazyImg.length;
		var winHeight =  document.documentElement.clientHeight;//可见区域高度
		var scrollTop =  window.document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop;
		for(var i=0;i<img_len;i++){
			var img_top = lazyImg[i].offsetTop;
			if((img_top>scrollTop)&&(scrollTop+winHeight)>img_top){//图片出现在可见区域
				lazyImg[i].setAttribute('src',lazyImg[i].getAttribute('data-src'));
			}
		}
		window.addEventListener('scroll',function(){
			var lazyImg = $$('.lazy-img');
			var img_len = lazyImg.length;
			var scrollTop =  window.document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop;
			for(var i=0;i<img_len;i++){
				var img_top = lazyImg[i].offsetTop;
				if((img_top>scrollTop)&&(scrollTop+winHeight)>img_top){//图片出现在可见区域
					(function(i){
						setTimeout(function(){
							lazyImg[i].setAttribute('src',lazyImg[i].getAttribute('data-src'));
						},timeover);
					})(i);
				}
			}
		});
	}
	/**
	 * 懒加载 
	 **/
	Smp.prototype.Loading= {
		lazyLoading:function(option){//图片出现在可见区域里的时候，显示图片 
			var option = option||{};
			var defaults = {
				timeover:250//图片显示的延迟时间
			};
			var obj_option = s_extend(defaults,option);
			lazyLoadImg(obj_option.timeover);
		}
	}
	
	/**
	 * 设置进度条bar 
	 **/
	function setBar(){
		var lineBar = $$('.lineBar .progress-bar');
		var time = 2;//2秒实现动画
		var s = 0;//毫秒设置50ms
		var timer = [];
		
		var circleBar = $$('.circleBar .progress-bar');
		var r_circleBar = $$('.circleBar .progress-bar .rightBar');
		var l_circleBar = $$('.circleBar .progress-bar .leftBar');
		if(lineBar){//线性 progress-bar
			var line_len = lineBar.length;
			var lineBarVal = 0;
			for(var i=0;i<line_len;i++){
				lineBarVal = parseInt(lineBar[i].getAttribute('bar-value'));
				lineBarVal = lineBarVal<0?0:lineBarVal>100?100:lineBarVal;//设置最小0最大100
				setStyle(lineBar[i],{width:lineBarVal+'%'});
			}
		}
		if(circleBar){
			var cir_len = circleBar.length;
			var circleBarVal = [];
			var deg = [];
			var flag = true;
			
			var d = [];
			var l = [];
			var r = [];
			var c = [];
			var handles = [];
			for(var j=0;j<cir_len;j++){
				circleBarVal[j] = parseInt(circleBar[j].getAttribute('bar-value'));
				circleBarVal[j] = circleBarVal[j]<0?0:circleBarVal[j]>100?100:circleBarVal[j];//设置最小0最大100
				deg[j] = 3.6*circleBarVal[j]+45;//默认需要加45度
				d[j] = 0;
				l[j] = 0;
				r[j] = 0;
				c[j] = 0;
				(function(j){
					if(circleBarVal[j]<51){
						timer[j] = setInterval(function(){
							r[j]= 3.6*(d[j]);
							r_circleBar[j].style.webkitTransform = "rotate("+ (45+r[j]).toFixed(2)+"deg)";
							d[j] ++;
							if(d[j]>circleBarVal[j]){
								clearInterval(timer[j])
							}
						},s);
					}
					if(circleBarVal[j]>50){
						timer[j]= setInterval(function(){
							r[j]= 3.6*(d[j]);
							if(c[j] <51&&flag){
								r_circleBar[j].style.webkitTransform = "rotate("+ (45+r[j])+"deg)";
							}
							d[j] ++;
							c[j] ++;
							if(c[j] >50){
								d[j] =50;
								flag =false;
								l[j]++;
								handles[j] = function(){
									console.log('test');
									l_circleBar[j].style.webkitTransform = "rotate("+ (45+parseInt(l[j])*3.6).toFixed(2)+"deg)";
									r_circleBar[j].removeEventListener('webkitTransitionEnd',handles[j]);
								}
								r_circleBar[j].style.webkitTransform = "rotate("+ 225+"deg)";
								r_circleBar[j].addEventListener('webkitTransitionEnd',handles[j]);
								console.log('aaaaaa');
							}
							if((c[j])>circleBarVal[j]){
								clearInterval(timer[j]);
							}
						},s);
					}
				})(j)
			}
		}
	}
	setBar();
	
	
	/**
	 * smp-news-msg 新闻消息滚动
	 **/
	
	Smp.prototype.newsMsg = (function(ele){
		var newsMsg = function (ele){
			var msgList = $$("."+ele)[0];
			var msgItem = $$("."+ele+" li");
			var itemLen = msgItem.length;
			var itemHeight = 0,allHeight;
			var timer = null;
			if(itemLen>0){
				itemHeight = parseInt(getStyle(msgItem[0],'height'));
			}
			allHeight = itemHeight*itemLen;
			var currentVal = 0;
			if(timer){
				clearInterval(timer);
			}
			timer = setInterval(function(){
				if(Math.abs(currentVal) == (allHeight-itemHeight)){
					currentVal = 0;
				}else{
					currentVal+=itemHeight;
				}
				setStyle(msgList,{transform:'translate3d(0px,'+(-currentVal)+'px,0px)',webkitTransform:'translate3d(0px,'+(-currentVal)+'px,0px)'});
			},2000);
		}
		return {
			init:function(ele){
				newsMsg(ele);
			}
		}
	})();
	
	
	/**
	 * 到达底部加载更多 
	 **/
	Smp.prototype.bottomLoading = {
		init:function(callFun){
			var _loading = this;
			var windowHeight = document.documentElement.clientHeight;//可见区域高度
			window.addEventListener('scroll',function(){
				var docHeight = document.body.scrollHeight;//文档高度
				var scrollTop =  window.document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop;
				if(scrollTop+windowHeight>=docHeight){//到达底部
					console.log('到达底部');
					if(isFunction(callFun)){
						callFun(_loading.Loading);
					}
				}
			});
		},
		Loading:function(){
			var loadingId = 'loadingImg';
			var loadingDiv = document.createElement('div');
			loadingDiv.id = 'loadingImg';
			addClass(loadingDiv,'loadingImg');
			return {
				showLoading:function(){//创建正在加载的动画
					loadingDiv.innerHTML = '<img src="./img/loading9.gif">';
					$$('body')[0].appendChild(loadingDiv);
				},
				hideLoading:function(){//销毁正在加载的动画
					var loadingDiv = $$('#loadingImg')[0];
					if(loadingDiv){
						//移除当前节点
						loadingDiv.parentNode.removeChild(loadingDiv);
					}
				}
			}
		}()
	}
	/**
	 * 底部弹出菜单栏 
	 **/
	Smp.prototype.actionsheet= (function(){
		var _flag = false;
		var c_flag = false;
		var eType = '';//事件类型
		var openHandle = null;//打开事件时候执行的方法
		var closeHandle = null;//关闭事件时候执行的方法
		var body = $$('body')[0];//获取body
		var cancelBtn = $$('#J_Cancel')[0];//获取取消按钮
		var coverNode = $$('.mask-black')[0];//获取遮罩层
		var cover = null;//遮罩层
		cover = document.createElement('div');
		addClass(cover,'mask-black');
		return {
			init:function(ele,type){
				var ele = $$('#'+ele)[0];//获取当前的元素
				var cancel = function(){//关闭   触发close事件
					if(hasClass(ele,'toggle')){
						removeClass(ele,'toggle');
					}
					if(coverNode!=null&&coverNode!=undefined){
						body.removeChild(coverNode);
					}else if(cover){
						body.removeChild(cover);
					}else{
						console.log('cover不存在');
					}
					if(isFunction(closeHandle)){
						smp.actionsheet.handle(closeHandle);
					}
				}
				var open = function(){//打开   触发open事件
					body.appendChild(cover);
					addClass(ele,'toggle');
					if(isFunction(openHandle)){
						smp.actionsheet.handle(openHandle);
					}
				}
				if(type == 'open'){
					open();
					if(!_flag){//只添加一次事件
						_flag = true;
						cancelBtn.addEventListener('click',cancel);
					}
				}else if (type == 'close'){
					if(cover){
						cancel();
					}
				}
				if(!c_flag){//添加一次事件
					c_flag = true;
					cover.addEventListener('click',function(e){
						var e = e||window.event;
						cancel();
						e.preventDefault();
						e.cancelable;
					});
				}
			},
			on:function(type,callback){//自定义事件，监听actionsheet开启与关闭 事件
				if(type&&type == 'open'){
					eType = 'open';
					openHandle = callback;
				}else if(type&&type == 'close'){
					eType = 'close';
					closeHandle = callback;
				}
			},
			handle:function(callback){//事件触发
				callback();
			}
		}
	}());
	
	/**
	 * 添加百度地图 
	 **/
	Smp.prototype.setBaiduMap = {
		init:function(ele,option){
			var option = option||{},
				_w,
				_h,
				zoomC,
				scaleC,
				setZoom,
				_theme,
				_icon;
			var defaults = {
				width:'100%',
				height:'200px',
				zoomControl: false, // 是否开启地图缩放控件
		    	scaleControl: false, // 是否开启地图比例尺控件
				setZoom:11,
				theme:0,
				icon:'',
			}
			var obj_option = s_extend(defaults,option);
			var mapId = $id(ele);
			_w = obj_option.width;//设置地图宽度
			_h = obj_option.height;//设置地图高度
			zoomC = obj_option.zoomControl;//
			scaleC = obj_option.scaleControl;//
			setZoom = obj_option.setZoom;//
			_theme = obj_option.theme;//主题风格
			_icon = obj_option.icon;//自定义标注图
			setStyle(mapId,{width:_w,height:_h});
			var map = null;
			var getMap = function(){
				return new BMap.Map(ele);
			}
			map = !map?getMap():map;
			var poi = new BMap.Point(113.448054, 22.491276);
			map.centerAndZoom(poi, setZoom);
			map.enableScrollWheelZoom(zoomC);//启用滚轮放大缩小
			map.addControl(new BMap.NavigationControl());// 添加平移缩放控件
			map.addControl(new BMap.MapTypeControl());//添加地图类型控件
			if(scaleC){
				map.addControl(new BMap.ScaleControl());// 添加比例尺控件
			}
			var myIcon = null;
			if(_icon!= ''){
				myIcon = new BMap.Icon(_icon, new BMap.Size(300,157));//定义自己的标注
			}
			var marker = new BMap.Marker(poi,{icon:myIcon}); //创建marker对象
			map.addOverlay(marker); //在地图中添加marker
			var setTheme = function(_theme){//设置主题风格
				var themes = ['normal','light','dark','redalert','googlelite','grassgreen','midnight','pink','darkgreen','bluish','grayscale','hardedge'];
				map.setMapStyle({style:themes[_theme]});
			}
			setTheme(_theme);
			var intoBaidu = function(){
				var a_div = document.createElement('div');
				a_div.id = 'intoBaidu';
				a_div.innerHTML = '<a href = "http://api.map.baidu.com/marker?location=22.491276,113.448054&title=中山雅居乐长江高尔夫会所&content=中山雅居乐长江高尔夫会所&output=html&src=appName|yourAppName">打开app</a>';
				$$('body')[0].appendChild(a_div);
			}
			intoBaidu();
		}
	}
	/**
	 *公用的ajax请求方式  
	 *使用ajax的时候，需要当前页面与请求的url必须是同域下(浏览器的同源策略)
	 * 同源策略：协议相同，域名相同，端口号相同
	 **/
	function _ajax(option,type){
		if(isObject(option)&&type == 'undefined'){
			var option = isObject(option)?option:{};
			var defaults = {
				method:'get',//默认get请求
				async:true,//默认异步方式
				data:null,//请求参数为null
				contentType:'application/x-www-form-urlencoded',//请求参数的格式
				cache:true,//是否开启缓存(针对于get方法)
				succFun:null//数据获取成功之后的回调函数
			};
			var obj_option = s_extend(defaults,option);
			var method = obj_option.method.toLowerCase();
			var url = obj_option.url;//请求的url，目的地址
			var data = obj_option.data;
			var async = obj_option.async;
			var contentType = obj_option.contentType;
			var succFun = obj_option.succFun;
		}else if(isString(option)){
			var url = option;//get方式直接传入一个 string类型的url
		}
		var xhr =null;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		if(type == 'get'){
			method = 'get';
		}
		if(type == 'post'){
			method = 'post';
		}
		if(method == 'get'){
			data = null;
		}
		xhr.open(method,url,async);
		ajax.setRequestHeader("Content-Type", contentType);
		xhr.send(data);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){//已成功接收请求信息
				if(xhr.status == 200){//返回成功
					var responseData = xhr.responseText;
					if(isFunction(succFun)){
						succFun(responseData);
					}
				}else{
					throwError(xhr.status);//请求成功，返回失败状态码)
				}
			}else{
				throwError('请求中...');
			}
		}
	}
	/**
	 *使用ajax获取数据，不直接指定获取方式 
	 **/
	Smp.prototype.ajax = function(option){
		_ajax(option);
	}
	/**
	 *使用get方式获取数据   使用方式：smp.getData('http://www.test.com/test?req1=abc&req2=3');
	 **/
	Smp.prototype.getData = function(url){
		_ajax(url,'get');
	}
	/**
	 *使用post方式获取数据 
	 * 无需指定请求类型，请求参数需要传入一个对象，与ajax方式类似
	 **/
	Smp.prototype.postData = function(Option){
		_ajax(option,'post');
	}
	/**
	 *core方法 
	 **/
	var OBJ_TOSRTING = Object.prototype.toString;
	
	/**
	 *将对象转换成指定格式的字符串如：a=123&b=234 
	 **/
	function objData (obj){
		if(!isObject(obj)){
			throw new Error('obj is not Object'); 
		}
		var dataArr =[];
		for(var i in obj){
			var dataStr =i+'='+obj[i];
			dataArr.push(dataStr);
		}
		return dataArr.join('&');
	}
	/**
	 *实现对象复制
	 **/
	function s_extend(target,option,deep){
		var deep = false;
		var clone;
		if(deep == 'undefined' || deep == null){
			deep = false;
		}
		for(var name in option){
			var scr = target[name];
			var copy = option[name];
			if(!deep){//浅复制
				target[name] = option[name];
			}else{//深复制
				if(target === copy){
					continue;
				}
				if(isArray(copy)&&isPlainObject(copy)){
					if(isArray(copy)){//如果是数组的话就直接替换
						clone = src && isArray( src ) ? src : [];
					}else if(isPlainObject(copy)){//如果是对象的话
						clone = src && isObject( src ) ? src : {};
					}
					target[name] = s_extend(clone,copy,deep);
				}else{
					target[name] = copy;
				}
			}
		}
		return target;
	}
	/**
	 *抛出错误信息 
	 **/
	function throwError(msg){
		throw Error(msg);
	}

	/**
	 *判断option对象是否为空 
	 **/
	function isEmptyObject(option){
		var obj = option;
		for(var i in obj){
			return false;
		}
		return true;
	}
	function isArray(obj){
		return OBJ_TOSRTING.call(obj) === "[object Array]"; 
	}
	function isFunction(obj){
		return OBJ_TOSRTING.call(obj) === "[object Function]"; 
	}
	function isObject(obj){
		return OBJ_TOSRTING.call(obj) === "[object Object]"; 
	}
	function isNumber(obj){
		return OBJ_TOSRTING.call(obj) === "[object Number]"; 
	}
	function isBoolean(obj){
		return OBJ_TOSRTING.call(obj) === "[object Boolean]"; 
	}
	function isString(obj){
		return OBJ_TOSRTING.call(obj) === "[object String]"; 
	}
	function isRegExp(obj){
		return OBJ_TOSRTING.call(obj) === "[object RegExp]"; 
	}
	/**
	 * 是否为一个window对象
	 **/
	function isWindow(obj){
		return obj != null && obj == obj.window
	}
	/**
	 * 判断obj是否为一个真实对象
	 **/
	function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	}
	/**
	 * 是否存在class 
	 **/
	function hasClass(ele,className){
		return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	/**
	 *添加class 
	 **/
	function addClass(ele,className){
		if(!hasClass(ele,className)){
			ele.className += " " + className;  
		}
	}
	/**
	 *移除class 
	 **/
	function removeClass(ele,className){
		if(hasClass(ele,className)){
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			ele.className = ele.className.replace(reg,'');
		}
	}
	
	/**
	 * 对象obj是否含有自身属性prop 
	 **/
	function hasProp(obj,prop){
		return Object.prototype.hasOwnProperty.call(obj,prop);
	}
	
	/**
	 * bind方法将func方法绑定到obj对象上 
	 **/
	function bind(obj,func){
		return function(){
			return func.apply(obj,arguments);
		}
	}
	/**
	 * 返回自身属性值 value
	 **/
	function getOwn(obj,prop){
	    return hasProp(obj,prop)&&obj[obj];
	}
	/**
	 * 遍历自身属性  
	 * func两个参数分别是:当前自身属性key 当前自身属性对应的值value
	 **/
	function eachProp(obj,func){
		for(var prop in obj){
			if(hasProp(obj,prop)&&func(prop,obj[prop])){
				break;
			}
		}
	}
	/**
	 * obj对象中的属性是否可枚举 
	 **/
	function isEnumer(obj,prop){
		return obj&&obj.propertyIsEnumerable(prop);
	}
	/**
	 *each方法遍历数组元素，并且在func中返回相关的数据
	 * func三个参数分别是 数组下标对应的元素 数组下标  当前数组 
	 **/
	function each(arr,func){
		if(arr){
			for(var i=0,len=arr.length;i<len;i++){
				if(arr[i]&&func(arr[i],i.arr)){
					break;
				}
			}
		}
	}
	/**
	 *eachReverse方法逆向遍历数组元素，并且在func中返回相关的数据
	 * func三个参数分别是 数组下标对应的元素 数组下标  当前数组 
	 **/
	function eachReverse(arr,func){
		if(arr){
			for(var i=arr.length-1;i>-1;i--){
				if(arr[i]&&func(arr[i],i.arr)){
					break;
				}
			}
		}
	}
	/**
	 *设置样式 
	 **/
	function setStyle(ele,option){
		for(var i in option){
			ele.style[i] = option[i];
		}
	}
	/**
	 *获取样式 
	 **/
	function getStyle(ele,attr){
		if(ele.currentStyle){  
	        return obj.currentStyle[attr];  
	    } else{  
	        return getComputedStyle(ele,false)[attr];  
	    }  
	}
	/**
	 *将String类型转换成Array类型 
	 **/
	function toArray(tag){
		try{
			return Array.prototype.slice.call(tag);
		}catch(e){
			var arr = [];
			for(var i =0;i<tag.length;i++){
				arr[i] = tag[i];
			}
			return arr;
		}
	}
	/**
	 *将Array类型转换成String类型 
	 **/
	function tostring(arr){
		return arr.join('');
	}
	/**
	 *获取兄弟元素节点 Array
	 **/
	function siblings(elem){
		var n = (elem.parentNode||{}).firstChild;
		var elemArr = [];
		var sibs = function(n,elem){
			for(;n;n = n.nexSibling){
				if(n.nodeType ===1&&n!==elem){
					elemArr.push(n);
				}
			}
			return elemArr;
		}
		return sibs(n,elem);
	}
	/**
	 *判断是否一个整数 
	 **/
	function isNumber(num){
		return typeof(num)== 'number'&&num%1 === 0;
	}
	/**
	 * 移除数组中指定位置 
	 **/
	Array.prototype.deleteIndex = function(index){
		var len = this.length;
		var index = index;
		if(index>len-1){//下标超过数组最大值的时候，移除最后一个
			index =  len-1;
		}
		if(index<0&&Math.abs(index)>len-1){
			index = 0;
		}
		return this.splice(index,1);
	}
	
	/**
	 *给字符串添加一个倒序的方法 
	 * this.split('') 将当前字符串转换成一个数组，调用数组的reverse方法，将数组倒序排列，倒序之后
	 * 使用join('')方法，将数组转换成字符串
	 **/
	String.prototype.reverse = function(){
		return Array.prototype.reverse.call(this.split('')).join('');
	}
	/**
	 *将string类型转换成array类型 
	 **/
	String.prototype.toArray = function(){
		try{
			return Array.prototype.slice.call(this);
		}catch(e){
			var arr = [];
			for(var i =0;i<this.length;i++){
				arr[i] = this[i];
			}
			return arr;
		}
	}
	Array.prototype.toString = function(){//将array转换成string对象
	    return this.join('');
	}
	var smp = new Smp();
	window._this = smp;//将smp对象设置为全局window中的_this
	window.smp = smp;
}))

