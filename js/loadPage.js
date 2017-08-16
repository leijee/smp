//页面进入之后显示正在加载中
var loadPage = (function (){
	var ID = 'isLoadPage';
	var flag = false;
	var body = document.querySelector('body');
	return {
		showLoading:function(){//显示正在加载
			var div = document.createElement('div');
			div.id = ID;
			div.innerHTML = '<img class="loading" src="./img/loading2.gif">';
			if(!flag){
				body.appendChild(div);
				body.style.overflow = 'hidden';
				flag = true;
			}
		},
		hideLoading:function(){//加载完毕
			if(flag){
				var _div = document.getElementById('isLoadPage');
				_div.parentNode.removeChild(_div);
				body.style.overflow = 'auto';
			}
		}
	}
})();


