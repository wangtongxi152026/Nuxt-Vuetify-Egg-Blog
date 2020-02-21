// import axios from 'axios';

// if (process.env === 'development') {
//   axios.defaults.baseURL = '/musc'

// } else {
//   axios.defaults.baseURL = '/api1'
// }
// const ajax = {
//   get (url, params) {
//     return new Promise((resolve, reject) => {
//       if (params) {
//         let paramStr = ''
//         Object.keys(params).forEach(key => paramStr += `${key}=${params[key]}&`)
//         paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'))
//         url += `?${paramStr}`
//       }
//       let promise = axios.get(url)
//       promise.then(res => resolve(res.data)).catch(err => reject(err))
//     })
//   },
//   post (url, params) {
//     return new Promise((resolve, reject) => {
//       let promise = axios.post(url, params)
//       promise.then(res => resolve(res.data)).catch(err => reject(err))
//     })
//   }
// }
// export default ajax
// // export default function ({ $axios, redirect }) {
// //   $axios.onRequest(config => {
// //     console.log('Making request to ' + config.url)
// //   })

// //   $axios.onError(error => {
// //     const code = parseInt(error.response && error.response.status)    if (code === 400) {
// //       redirect('/400')
// //     }
// //   })
// // }