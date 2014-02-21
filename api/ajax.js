import axios from 'axios';
import { getToken } from '~/util/auth';

axios.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers = {
        Authorization: getToken()
      };
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const ajax = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      if (params) {
        let paramStr = '';
        Object.keys(params).forEach(
          key => (paramStr += `${key}=${params[key]}&`)
        );
        paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'));
        url += `?${paramStr}`;
      }
      let promise = axios.get(url);
      promise.then(res => resolve(res.data)).catch(err => reject(err));
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      let promise = axios.post(url, params);
      promise.then(res => resolve(res.data)).catch(err => reject(err));
    });
  }
};
export default ajax;
// export default function ({ $axios, redirect }) {
//   $axios.onRequest(config => {
//     console.log('Making request to ' + config.url)
//   })

//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status)    if (code === 400) {
//       redirect('/400')
//     }
//   })
// }
