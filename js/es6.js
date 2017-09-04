/**
 * EcmaScript6 总结 EcmaScript6简称es6
 **/

//Class基本语法
//javascript中传统的class的定义跟使用方式是通过构造方法来实现的，例如:
function Person1(name,sex){
	this.name = name;
	this.sex = sex;
	this.getname  = function(){
		return this.name;
	}
	this.getSex = function(){
		return this.sex;
	}
}
var p1 = new Person1('小明','男');
p1.getname();
p1.getSex();

class Person2{
	constructor(name,sex){
		this.name = name;
		this.sex = sex;
		this.getName = function(){
			return this.name;
		},
		this.getSex = function(){
			return this.sex;
		}
	}
	toString(){
		console.log('name='+this.name+'sex='+this.sex);
	}
}
var p2 = new Person2('小花','女');
var p22 = new Person2('小米','男');
p2.__proto__.getInfo = function(){
	return '姓名：'+this.name+'性别：'+this.sex;
}
p2.getInfo();
p22.getInfo();

/**
 * 在es6中,使用 class关键字定义一个类，其本质上跟传统的构造函数是差不多的，
 * 两者都是通过new关键字，创建一个实例对象
 * typeof Person  // function
 * Person.prototype.constructor == Person//true
 * 
 * point.hasOwnProperty('x') // true
 * point.hasOwnProperty('y') // true
 * point.hasOwnProperty('toString') // false
 * point.__proto__.hasOwnProperty('toString') // true
 * __proto__ 的使用方式跟 prototype是一样的，都是给函数上添加属性或者方法
 * 
 **/


/**
 * class表达式： 在es6中 class也存在类似于函数表达的用法，例如： 
 **/
var myClass = class my{
	constructor(name,sex){
		this.name = name;
		this.sex = sex;
	}
	getInfo(){
		return this.name+'--'+this.sex;
	}
}
var m = new myClass('小明','男');
m.getInfo();
myClass.name // "my"
/**
 * 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，
 * 所以函数的许多特性都被Class继承，包括name属性。
 * 
 **/


/**
 * 使用上述表达式方式的时候，myClass为当前类的名字，而my只是作为当前类内部使用的名字
 * 如果my在内部不需要使用到,可以直接使用 
 **/
var myClass = class{
	constructor(name,sex){
		this.name = name;
		this.sex = sex;
	}
	getInfo(){
		return this.name+'--'+this.sex;
	}
}
var m = new myClass('小米','无');
m.getInfo();

/**
 * class表达式   自执行class
 **/
var m = new myClass{
	constructor(name,sex){
		this.name = name;
		this.sex = sex;
	}
	getInfo(){
		return this.name+'--'+this.sex;
	}
}('小米','无');
m.getInfo();

//class 的取值函数（getter）和存值函数（setter）

