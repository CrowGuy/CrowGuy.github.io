function writeCookie(name, value, days){
  // By default, there is no expiration so the cookie is temporary
  var expires = "";
  
  // Specifying a number of days makes the cookie persistent
  if (days){
	var date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); //計算有效日期時，需把天數換算為毫秒，再把毫秒數加到目前時間上。
	expires = "; expires=" + date.toGMTString();
  }
  
  // Set the cookie to the name, value, and expiration date
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name){
  // Find the specified cookie and return its value
  var searchName = name + "=";
  var cookies = document.cookie.split(';'); //cookie清單使用分號區隔各個cookie
  for(var i=0; i < cookies.length; i++){
	var c = cookies[i];
	while(c.charAt(0) == ' ')
	  c = c.substring(1, c.length);
    if (c.indexOf(searchName) == 0)
	  return c.substring(searchName.length, c.length);
  }
  return null;
}

function eraseCookie(name){
  // Erase the specified cookie
  writeCookie(name, "", -1); // 清除cookie的方式，就是把它改成沒有值，而且有效日期已經過去(-1天)。
}