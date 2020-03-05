// import axios from 'axios';
// const cookieparser = require('cookieparser');
// export default function({ req, res }, next) {
//   if (process.server) {
//     if (req.headers !== undefined) {
//       let cookieArr = req.headers.cookie;
//       // console.log(cookieArr, 'cookieArr');
//       //获取cookie然后拆成键值对

//       const getToken = getCookie('blogToken', cookieArr);

//       //设置axios的全局变量.

//       axios.defaults.timeout = 60000; // 响应时间

//       // @requestParams
//       console.log(getToken, 'getToken');
//       axios.defaults.headers.Authorization = getToken;

//       axios.defaults.withCredentials = true;
//     }
//   }
//   next();
// }

// //解析浏览器中的cookies

// function getCookie(name, strCookie) {
//   var arrCookie = strCookie.split(';');

//   for (var i = 0; i < arrCookie.length; i++) {
//     var arr = arrCookie[i].split('=');

//     if (arr[0].trim() === name) {
//       return arr[1];
//     }
//   }

//   return {};
// }
