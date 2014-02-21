// import { getCookie } from '~/middleware/auth';
//获取服务端cookie
function getcookiesInServer(req) {
  let service_cookie = {};
  req &&
    req.headers.cookie &&
    req.headers.cookie.split(';').forEach(function(val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
  return service_cookie;
}
export default function({ store, route, redirect, req }) {
  const { blogToken } = getcookiesInServer(req);
  if (blogToken) {
    store.commit('blog/set_token', blogToken);
    return store.dispatch('blog/getUserInfo');
  }

  // const routePath = route.path;
  // const extraPath = ['/'];
  // if (!store.state.auth && extraPath.indexOf(routePath) === -1) {
  //   // 跳转到登录页面
  //   return redirect('/');
  // }
}

// const getCookie = function (req) {
//   if (req && req.headers && req.headers.cookie) {
//     const parsed = cookieparser.parse(req.headers.cookie)
//     return parsed
//   } else {
//     return {auth: null, lang: null}
//   }
// }
