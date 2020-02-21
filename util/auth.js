const Cookies = require('js-cookie');
// ? require('js-cookie') : undefined;
const TokenKey = 'blogToken';
//获取服务端cookie
// function getcookiesInServer(req) {
//   let service_cookie = {};
//   req &&
//     req.headers.cookie &&
//     req.headers.cookie.split(';').forEach(function(val) {
//       let parts = val.split('=');
//       service_cookie[parts[0].trim()] = (parts[1] || '').trim();
//     });
//   return service_cookie;
// }
//获取客户端cookie
// function getcookiesInClient(key) {
//   return Cookie.get(key) ? Cookie.get(key) : '';
// }
export function getCookie(TokenKey, strCookie) {
  var arrCookie = strCookie.split(';');

  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split('=');

    if (arr[0].trim() === TokenKey) {
      return arr[1];
    }
  }

  return {};
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

//根据 QueryString 参数名称获取值
export function getQueryStringByName(name) {
  let result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i')
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}
