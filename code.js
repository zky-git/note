
//--------------------------------------------------------------->
//判断是否是移动运行环境
var isMobilePlayer = 0;
// 判断是否为移动端运行环境
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    if (window.location.href.indexOf("?mobile") < 0) {
        try {
            if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                // 判断访问环境是 Android|webOS|iPhone|iPod|BlackBerry 则加载以下样式
                isMobilePlayer = 1;
            } else {
                // 判断访问环境是 其他移动设备 则加载以下样式
            }
        } catch (e) {}
    }
} else {
    // 如果以上都不是，则加载以下样式
}

//--------------------------------------------------------------->
// 验证手机号
var check_mobile = /^1(3|5|6|7|8)\d{9}$/;
if (!check_mobile.test(data.address_mobile)) {
	wx.showModal({
	  title: '提示',
	  content: '手机号格式不正确',
	});
	return;
}

//--------------------------------------------------------------->
//验证金额
  clearNoNum(value) {
    //修复第一个字符是小数点 的情况.  
    if (value != '' && value.substr(0, 1) == '.') {
      value = "";
    }

    value = value.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效  
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的       
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数       
    if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
      if (value.substr(0, 1) == '0' && value.length == 2) {
        value = value.substr(1, value.length);
        
        return value;
      }
    }
    return value;
  } 


  //--------------------------------------------------------------->
  //时间戳转换
  timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() + ' ': date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }


    var time = function (timeStamp, that) {
      var totalSecond = timeStamp - Date.parse(new Date()) / 1000;
      var interval = setInterval(function () {
        // 秒数  
        var second = totalSecond;
        // // 天数位  
        // var day = Math.floor(second / 3600 / 24);
        // var dayStr = day.toString();
        // if (dayStr.length == 1) dayStr = '0' + dayStr;
        // 小时位  
        var hr = Math.floor(second / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        // 分钟位  
        var min = Math.floor((second - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位  
        var sec = second - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        that.setData({
          // countDownDay: dayStr,
          countDownHour: hrStr,
          countDownMinute: minStr,
          countDownSecond: secStr,
        });
        totalSecond--;
        if (totalSecond <= 0) {
          clearInterval(interval);
          wx.showToast({
            title: '活动已结束',
          });
          that.setData({
            // countDownDay: '00',
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00',
          });
        }
      }.bind(that), 1000);
    }
    //倒计时2；
    var time2 = function (timeStamp, that) {
      var totalSecond = timeStamp - Date.parse(new Date()) / 1000;
      var interval = setInterval(function () {
        // 秒数  
        var second = totalSecond;
        // // 天数位  
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;
        // 小时位  
        var hr = Math.floor(second / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        // 分钟位  
        var min = Math.floor((second - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位  
        var sec = second - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        that.setData({
          countDownDay: dayStr,
          countDownHour: hrStr,
          countDownMinute: minStr,
          countDownSecond: secStr,
        });
        totalSecond--;
        if (totalSecond <= 0) {
          clearInterval(interval);
          wx.showToast({
            title: '活动已结束',
          });
          that.setData({
            countDownDay: '00',
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00',
          });
        }
      }.bind(that), 1000);
    }


  //--------------------------------------------------------------->
	// 手机视频播放
	bindplay: function (e) {
		wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;  
        var msg = '';
        if (networkType != 'wifi') {
          switch (networkType) {
            case "none": 
              msg = '网络无连接';    
              break;     
            case "unknown": 
              msg = '请切换到可用网络';              
              break;            
            default:             
              msg = '建议在WIFI下播放视频';         
            }          
          app.err_tip(msg)
        }
      }
		})
		var curVideoId = e.target.id;
		if (this.data.prevVideoId && this.data.prevVideoId != curVideoId) {    
			var prevV = wx.createVideoContext(this.data.prevVideoId);
			prevV.pause()
		}
		this.setData({
			prevVideoId: curVideoId
		});
	}

  //--------------------------------------------------------------->
  //设置cookie
  //遇到cookie tf=1的话留在本站，否则跳转移动站
  if (getCookie('tf') != 1) {
    //判断是以下设备后跳转到m站
    if (navigator.userAgent.match(/(iPhone|iPod|Android)/i)) {
        location.href = "//m.qidian.com"
    }
  }else {
    // M站设置了一年，这里fixed
    setCookie('tf', 1, 'qidian.com', '/', 0);
  }
  // start 防劫持
  //设置cookie
  function setCookie(name, value, domain, path, expires) {
    if(expires){
        expires = new Date(+new Date() + expires);
    }
    var tempcookie = name + '=' + escape(value) +
            ((expires) ? '; expires=' + expires.toGMTString() : '') +
            ((path) ? '; path=' + path : '') +
            ((domain) ? '; domain=' + domain : '');
    //Ensure the cookie's size is under the limitation
    if(tempcookie.length < 4096) {
        document.cookie = tempcookie;
    }
  }
  //获取cookie
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
  }

  //--------------------------------------------------------------->
  //添加headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  //--------------------------------------------------------------->
  //小程序添加单独路径
  var pages = getCurrentPages()
  var currentPage = pages[pages.length - 1].route
  
  
  //设置60s倒计时
var time = 60;
var bool = false;
$('.getCode').click(function(){
	var _this = $(this);
	if(bool){
		return false; 
	}else{
		if(!$('input[name="phone"]').val()){
			mui.toast('请输入手机号',{ duration:'short', type:'div' });
			return false;
		}
		time = 60;
	}
	_this.removeClass('active');
	bool = true;

	_this.html(time+'s');
	getVertifycode();
	var timer = setInterval(function(){
		time--;
		if(time<=0){
			time=0;
			clearInterval(timer);
			setTimeout(function(){
				_this.addClass('active');
				_this.html('重新获取');
			},1000)
			bool = false;
			return false;
		}

		_this.html(time+'s');
	},1000)

})
