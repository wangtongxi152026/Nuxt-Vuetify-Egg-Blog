// ***** 处请填写你申请的 OAuth App 的真实内容
const config = {
  oauth_uri: 'https://github.com/login/oauth/authorize',
  redirect_uri: 'http://wangtongxi.cn/login',
  client_id: '008817c8d4abf09edd76',
  client_secret: '3024249996cb5d2fdda0327d5001d4596c7af03c'
};

// 本地开发环境下
if (process.env.NODE_ENV === 'development') {
  config.redirect_uri = 'http://localhost:3002/login';
  config.client_id = '1fd86be092e5d0a45ef4';
  config.client_secret = 'a036a3a967f101682fa0b894a473d726b0bff0db';
}
export default config;
