/**
 * javascript 工具包使用 
 * 核心工具(cookie操作，localStorage操作，sessionStorage操作)
 * 类型判断，dom样式操作，dom节点查找，对象深拷贝跟浅拷贝，
 * Bom操作，等...
 **/

(function(window,doc,defined){
	var defined = defined;
	var _slice = Array.prototype.slice;
	var utils = {};
	window.utils = (function(utils,window){
		var _this = this;//utils
		//dom选择器
		utils.$$ = function(){
			var _selectors = doc.querySelectorAll(selector);
			return _slice.call(_selectors);
		}
		//id选择器
		utils.$id = function(elementStr){
			if(typeof elementStr != 'string'){
				return null;
			}
			return doc.getElementById(elementStr);
		}
		//文档dom元素加载完成之后执行callback函数
		utils.$ready = function(callback){
			if ('addEventListener' in document) {
				document.addEventListener('DOMContentLoaded', function() {
					callback();
				}, false);
			}	
		}
		//编码
		utils.encode = function(str){
			return encodeURIComponent(str);
		}
		//解码
		utils.decode = function(str){
			return decodeURIComponent(str);
		}
		utils.getQueryString = function(str){//获取url上params参数值
			var params = location.search;//?a=name&b=test
			var newparams = params.substr(1);
			var arr1 = newparams.split('&');
			for(var i=0,len=arr1.length;i<len;i++){
				var key = arr1[i].sp
				lit('=')[0];
				var value = arr1[i].split('=')[1];
				if(key == _this.decode(str)){
					return value;
				}
			}
		}
		//cookie操作
		utils.Cookies = (function(){
			return {
				getItem: function (sKey) {
				    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
				  },
				setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
				    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
				    var sExpires = "";
				    if (vEnd) {
				      	switch (vEnd.constructor) {//构造器属性
					        case Number:
					          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					          break;
					        case String:
					          sExpires = "; expires=" + vEnd;
					          break;
					        case Date:
					          sExpires = "; expires=" + vEnd.toUTCString();
					          break;
					        defaul:
					            break;
				     	}
				    }
				    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
				    return true;
				},
				removeItem: function (sKey, sPath, sDomain) {
				    if (!sKey || !this.hasItem(sKey)) { return false; }
				    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
				    return true;
				},
				hasItem: function (sKey) {
				    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
				},
				keys:function () {
				    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
				    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
				    return aKeys;
				}
			}
		})();
		
		//操作localstorage
		utils.l_storage = (function(){
		    if(!window.localStorage){
		        return{
		            getItem: function (sKey) {
		                if(!sKey || !this.hasOwnProperty(sKey)) { return null; }
		                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		            },
		            key: function (nKeyId) {
		                return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
		            },
		            setItem: function (sKey, sValue) {
		                if(!sKey) { return; }
		                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
		                this.length = document.cookie.match(/\=/g).length;
		            },
		            length: (function(){
		                return (document.cookie.match(/\=/g) || window.localStorage).length;
		            })(),
		            removeItem: function (sKey) {
		                if (!sKey || !this.hasOwnProperty(sKey)) { return; }
		                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		                this.length--;
		            },
		            hasOwnProperty: function (sKey) {
		                return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		            }
		        };
		    }
		    return {
		        setItem:function(key,value){
		            window.localStorage.setItem(key,value);
		        },
		        getItem:function(key){
					console.log(key);
		            return window.localStorage.getItem(key);
		        },
		        removeItem:function(key){
		            window.localStorage.removeItem(key);
		        },
		        removeAll:function(){
					window.localStorage.clear();
		        },
		        length:(function(){
		        	return window.localStorage.length;
		        })()
		    }
		})();
		//操作sessionstorage
		utils.s_storage = (function(){
		    if(!window.sessionStorage){
		        return{
		            getItem: function (sKey) {
		                if(!sKey || !this.hasOwnProperty(sKey)) { return null; }
		                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		            },
		            key: function (nKeyId) {
		                return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
		            },
		            setItem: function (sKey, sValue) {
		                if(!sKey) { return; }
		                document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
		                this.length = document.cookie.match(/\=/g).length;
		            },
		            length: (function(){
		                return (document.cookie.match(/\=/g) || window.sessionStorage).length;
		            })(),
		            removeItem: function (sKey) {
		                if (!sKey || !this.hasOwnProperty(sKey)) { return; }
		                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		                this.length--;
		            },
		            hasOwnProperty: function (sKey) {
		                return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		            }
		        };
		    }
		    return {
		        setItem:function(key,value){
		            window.sessionStorage.setItem(key,value);
		        },
		        getItem:function(key){
					console.log(key);
		            return window.sessionStorage.getItem(key);
		        },
		        removeItem:function(key){
		            window.sessionStorage.removeItem(key);
		        },
		        removeAll:function(){
					window.sessionStorage.clear();
		        },
		        length:(function(){
		        	return window.sessionStorage.length;
		        })()
		    }
		})();
		/**
		 *将对象转换成指定格式的字符串如：a=123&b=234 
		 **/
		utils.objData = function(obj){
			
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
		 window.s_extend = function(target,option,deep){
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
		window.throwError = function(msg){
			throw Error(msg);
		}
		/**
		 * 判断是否支持某样式 
		 **/
		window.isExsitCssStyle = function(styleName){
			if(styleName in document.documentElement.style){
				return true;//存在
			}
			return false;//不存在
		}
		var OBJ_TOSRTING = Object.prototype.toString;
		/**
		 *判断option对象是否为空 
		 **/
		window.isEmptyObject = function(option){
			var obj = option;
			for(var i in obj){
				return false;
			}
			return true;
		}
		
		window.isArray = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object Array]"; 
		}
		window.isFunction = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object Function]"; 
		}
		window.isObject = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object Object]"; 
		}
		window.isNumber = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object Number]"; 
		}
		window.isBoolean = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object Boolean]"; 
		}
		window.isString = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object String]"; 
		}
		window.isRegExp = function(obj){
			return OBJ_TOSRTING.call(obj) === "[object RegExp]"; 
		}
		/**
		 * 判断obj是否为一个真实对象
		 **/
		window.isPlainObject = function(obj) {
		    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
		}
		/**
		 * 是否存在class 
		 **/
		utils.hasClass = function(ele,className){
			return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
		}
		/**
		 *添加class 
		 **/
		utils.addClass = function(ele,className){
			if(!utils.hasClass(ele,className)){
				ele.className += " " + className;  
			}
		}
		/**
		 *移除class 
		 **/
		utils.removeClass = function(ele,className){
			if(utils.hasClass(ele,className)){
				var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
				ele.className = ele.className.replace(reg,'');
			}
		}
		
		//判断是否一个整数
		utils.isNumber = function(num){
			return typeof(num)== 'number'&&num%1 === 0;
		}
		/**
		 * 对象obj是否含有自身属性prop 
		 **/
		utils.hasProp = function(obj,prop){
			return Object.prototype.hasOwnProperty.call(obj,prop);
		}
		//遍历自身属性 func两个参数分别是:(key,value)
		utils.eachProp = function(obj,func){
			for(var prop in obj){
				if(utils.hasProp(obj,prop)&&func(prop,obj[prop])){
					break;
				}
			}
		}
		/**
		 * bind方法将func方法绑定到obj对象上 
		 **/
		utils.bind = function(obj,func){
			return function(){
				return func.apply(obj,arguments);
			}
		}
		/**
		 * 返回自身属性值 value
		 **/
		utils.getOwn = function(obj,prop){
		    return utils.hasProp(obj,prop)&&obj[obj];
		}
		/**
		 * 遍历自身属性  
		 * func两个参数分别是:当前自身属性key 当前自身属性对应的值value
		 **/
		utils.eachProp = function(obj,func){
			for(var prop in obj){
				if(utils.hasProp(obj,prop)&&func(prop,obj[prop])){
					break;
				}
			}
		}
		/**
		 * obj对象中的属性是否可枚举 
		 **/
		utils.isEnumer = function(obj,prop){
			return obj&&obj.propertyIsEnumerable(prop);
		}
		/**
		 * dom节点操作 
		 **/
		window.siblings = function(elem){
			var n = (elem.parentNode||{}).firstChild;
			var elemArr = [];
			var sibs = function(n,elem){
				for(;n;n = n.nextSibling){
					if(n.nodeType ===1&&n!==elem){
						
						elemArr.push(n);
					}
				}
				return elemArr;
			}
			return sibs(n,elem);
		}
		/**
		 *设置样式 
		 **/
		window.setStyle = function(ele,option){
			for(var i in option){
				ele.style[i] = option[i];
			}
		}
		/**
		 *获取样式 
		 **/
		window.getStyle = function(ele,attr){
			if(ele.currentStyle){  
		        return obj.currentStyle[attr];  
		    } else{  
		        return getComputedStyle(ele,false)[attr];  
		    }  
		}
		return utils;
	})(utils,window);
	
	
	//数字数组排序（由小到大）
	Array.prototype.sort = function(){
		var newArr = this;
		var len = newArr.length;
		for(var i=0;i<len-1;i++){
			for(var j=i+1;j<len;j++){
				if(oldArr[j]<oldArr[i]){
					var temp;
					temp = oldArr[i];
					oldArr[i]=oldArr[j];
					oldArr[j]=temp;
				}
			}
		}
		return newArr;
	}
	/**
	 * 使用each方法遍历数组，返回当前数组 
	 * func三个参数分别是(数组下标对应的元素,数组下标,当前数组 )
	 **/
	Array.prototype.each = function(){
		var len =this.length;
		for(var i=0;i<len;i++){
			if(this[i]&&func(this[i],i,this)){
				break;
			}
		}
		return this;
	}
	/**
	 *eachReverse方法逆向遍历数组元素，并且在func中返回相关的数据
	 * func三个参数分别是 (数组下标对应的元素,数组下标,当前数组 )
	 **/
	Array.prototype.eachReverse = function(arr,func){
		var i=arr.length-1;
		for(;i>-1;i--){
			if(this[i]&&func(this[i],i.this)){
				break;
			}
		}
		return this;
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
	//将array转换成string对象
	Array.prototype.toString = function(){
	    return this.join('');
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
	
})(window,document);
