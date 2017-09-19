/**
 * EcmaScript6 总结 EcmaScript6简称es6
 **/
//遍历器 Generator 函数介绍：
/**
 * Generator函数有两大特征：
 * 1.function* helloWorld() function关键字与函数名之间存在一个*号
 * 2.函数内部存在一个yield表达式，表示不同的内部状态
 * Generator函数  yield表达式的使用:
 * 通过next方法执行，如果执行到yield，结束执行，并且返回一个含有value和done值的对象
 * next方法执行到return 语句的时候 Generator函数结束，done值返回true 
 **/

function* Test(){
	yield 'test1';
	yield 'test2';
	yield 'test3';
	return 'ended';
}
var t= Test();
t.next();

/**
 * 遍历器对象的next方法的运行逻辑如下。（1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
 * 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
 * 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
 * 如果该函数没有return语句，则返回的对象的value属性值为undefined。 
 * yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。（在forEach方法中也不能存在yield表达式，forEach中接受的函数为普通函数，当我们在循环执行yield表达式的时候，可选择for循环的方式取代forEach）
 * 
 **/
(function (){
  yield 1;//报错 Uncaught SyntaxError: Unexpected number
})()



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

/**
 * new.target的使用:
 * 使用new.target 可以判断当前构造函数是否通过new的方式来创建对象;例1：
 * 在使用new class创建对象的时候，new.target 直接指向当前class名字;
 * class继承的时候，new.target指向子类class类名，可以通过new.target限制父类只能作为继承；例2：
 **/
//例1
function Person(name){
	if(new.target !== undefined||new.target === Person){
		this.name = name;
		this.getName = function(){
			return this.name;
		}
	}else{
		throw new Error('使用new关键字，创建对象');
	}
}
var p1 = new Person('小米');
var p2 = Person('小明');
//例2
class Person{
	constructor(name){
		if(new.target === Person){
			throw new Error('当前类只能被继承,不能使用new关键字创建对象');
		}else{
			this.name = name;
		}
	}
}
class User extends Person{
	constructor(name){
		super(name);
		this.getName = function(){
			return this.name;
		}
	}
}
var p = new Person('小米');//出错
var u = new User('小明');
u.getName();
