
/**
 * 模块化 
 **/
(function(global,factory){
	typeof exports === 'function'&& typeof module !== 'undefined'?module.exports = factory():
	typeof define === 'function'&&define.amd?define(factory):(global.smp = factory());
})(this,function(){
	'use strict'//严格模式
	
	console.log('test');
	
	
	function Smp(){
		this.name = 
	}
	
	return Smp;
	return new Smp();
});

//使用
import Smp = require('Smp');

new Smp({
	el:#app,
	data:{
		
	}
});









/**
 * 构造函数模式 
 **/
function Person(name,age,sex){
	if(!(this instanceof Person)){
		return new Person(name,age,sex);
	}
	this.name = name;
	this.age = age;
	this.sex = sex;
	this.getInfo = function(){
		console.log('姓名:'+this.name+'-年龄:'+this.age+'-性别:'+this.sex);
	}
}
var p = new Person('张三',18,'男');
var p1 = Person('小米','5','无');
p.getInfo();
p1.getInfo();



/**
 * 工厂模式 1
 * */
var factory = (function(){
	var test = function(str){
		this.name = str;
		this.getStr = function(){
			return this.name;
		}
	}
	return function(str){
		return new test(str);
	}
})();

var f = new factory('123');
var name = f.getStr();
console.log(name);

/**
 * 工厂模式2 工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。
 * 该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。
 * 这个模式十分有用，尤其是创建对象的流程赋值的时候，比如依赖于很多设置文件等。
 * 并且，你会经常在程序里看到工厂方法，用于让子类类定义需要创建的对象类型
 **/
var page = {};
page.Link = function(){
	this.name = 'link';
	this.getname = function(){
		return name;
	}
}
page.Text = function (){
	this.name = 'text';
	this.getname = function(){
		return name;
	}
}
page.Image = function(){
	this.name = 'image';
	this.getname = function(){
		return name;
	}
}
page.factory = function(str){
	return new page[str];
}
var test1 = page.factory('Link').getname();
var test2 = page.factory('Text').getname();
var test3 = page.factory('Image').getname();
console.log('test1='+test1+'test2='+test2+'test3='+test3);


/**
 * 单例模式 
 **/

var singleton = (function(){
	var instantiated;
	function init(){
		return {
			publicMethod:function(){
				console.log('hello world');
			},
			publicProperty:'test'
		}
	}
	return {
		getInstance:function(){
			if(!instantiated){
				instantiated = init;
			}
			return instantiated;
		}
	}
})();
/*调用公有的方法来获取实例:*/
singleton.getInstance().publicMethod();


/**
 * 观察者模式
 * JS里对观察者模式的实现是通过回调来实现的，
 * 我们来先定义一个pubsub对象，其内部包含了3个方法：订阅、退订、发布。
 * 观察者模式常见的功能例如jquery中事件的注册，我们可以通过观察者模式自定义事件，触发事件
 **/
var pubsub = {};
(function (q) {

    var topics = {}, // 回调函数存放的数组
        subUid = -1;
    
    //订阅方法    (事件注册) 
    q.subscribe = function (topic, func) {
        if (!topics[topic]) {//初始化为一个数组，用于存放事件回调函数
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,//标识
            func: func//回调函数
        });
        return token;
    };
    // 发布方法    (事件触发，执行)
    q.publish = function (topic, args) {
		
        if (!topics[topic]) {//如果不存在topic，直接return
        	console.log('不存在');
            return false;
        }

        setTimeout(function () {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);

        return true;

    };
    //退订方法   (注销事件)
    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
} (pubsub));


//来，订阅一个
pubsub.subscribe('example1', function (topics, data) {
    console.log(topics + ": " + data);
    
});


//发布通知
pubsub.publish('example1', 'hello world!');
pubsub.publish('example1', ['test', 'a', 'b', 'c']);
pubsub.publish('example1', [{ 'color': 'blue' }, { 'text': 'hello'}]);

//自定义事件
var obj = {};
(function(o){
	var topics ={},
		count = -1;
	o.on = function(type,callback){//注册事件
		if(!topics[type]){//type 事件不存在，创建数组存储事件处理方法
			topics[type] = [];
		}
		
		var token = ++count;//用到了闭包特性存放count变量
		topics[type].push({
			fun:callback,
			token:token
		})
		return token;
	}
	
	o.trigger = function(type,args){//事件触发
		if(!topics[type]){
			console.log('不存在');
			return ;
		}
		var types = topics[type];
		var len = types.length;
		while(len--){
			types[len].fun(type,args);
		}
		return true;
	}
	o.off =  function(token){
		for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
	}
})(obj);
//注册look事件
var eventNum = obj.on('look',function(topics,func){
	console.log(topics);
	console.log(args);
});
//触发look事件
obj.trigger('look',function(){
	
});
//取消look事件
obj.off(eventNum);



//1.找出数字数组中最大的数
var Match = (function(){
	var arr = null;
	var len = 0;
	return {
		max:function(arr,len){
			arr = arr;
			len = arr.length;
			var newArr = arr.sort();
			return newArr[len-1];
		}
	}
})();

var arrList = [1,4,5,6,7,3,99,33,55,22,10];
Match.max(arrList);

//2.转化一个数字数组为function数组（每个function都弹出相应的数字）

var arrNum = [2,3,4,5,6,10,7];
var arrFun = [];
function change(arr){
	var fun = function(val){
		return function(){
			return val;
		};
	}
	for(var i=0;i<arr.length;i++){
		arrFun.push(fun(arr[i]));
	}
	return arrFun;
}
var newArr = change(arrNum);
console.log(newArr[0]());

//3.实现如下语法的功能：var a = (5).plus(3).minus(6); //2
	Number.prototype.plus= function(val){
		return parseInt(this.toString())+val;
	};
	Number.prototype.minus= function(val){
		return parseInt(this.toString())-val;
	};
	var a =(5).plus(10).minus(3);
	console.log(a);


//4.给object数组进行排序（排序条件是每个元素对象的属性个数）
var obj1 = {name:'小明'};
var obj2 = {name:'小明',height:'170cm',weight:'65kg'}
var obj3 = {name:'小明',sex:'男'};
var objArr = [obj1,obj2,obj3];



//5.实现如下语法的功能：var a = add(2)(3)(4); //9

function add(num){
	var _add = function(args){
		num+=args;
		return add(num);
	}
	_add.toString = _add.valueOf = function(){
		return num;
	}
	return _add;
}
add(2)(3)(4);


//冒泡排序 方法1
function bubbleSort(arr){
	var len = arr.length;
	var temp;
	var old = Date.now();
	for(var i=0;i<len;i++){
		for(var j=i+1;j<len-1;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
			
		}
	}
	var news = Date.now();
	console.log(news-old);
	return arr;
}
var arrTest = [1,3,4,5,6,7,44,33,22,11,55];
bubbleSort(arrTest);
//冒泡排序 方法2

function bubbleSort(arr){
	var i = arr.length-1;
	while(i>0){
		var pos = 0;
		for(var j=0;j<i;j++){
			if(arr[j]>arr[j+1]){
				pos = j;
				var tmp = arr[j]; 
				arr[j]=arr[j+1];
				arr[j+1]=tmp;
			}
		}
		i = pos; //为下一趟排序作准备
	}
	return arr;
}

var arrTest = [1,3,4,5,6,7,44,33,22,11,55];
bubbleSort(arrTest);