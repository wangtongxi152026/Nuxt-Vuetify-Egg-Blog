// import { defaults, onlyBodys, noFooters } from '~/util/route';

// export default function ({ app: { router }, store }, next) {
//   // console.log(defaults, onlyBodys, noFooters);
//   router.beforeEach((to, from, next) => {

//     console.log(to);
//     next()
//     // if (defaults.some(defaul => to.fullPath === defaul)) { // 判断该路由是否需要登录权限
//     //   next();
//     // } else if (onlyBodys.some(onlyBody => to.fullPath === onlyBody)) {
//     //   store.commit('layout/setNav', false)
//     //   store.commit('layout/setFooter', false)
//     //   next()
//     // } else if (noFooters.some(noFooter => to.fullPath === noFooter)) {
//     //   store.commit('layout/setNav', false)
//     //   store.commit('layout/setFooter', false)
//     //   next()
//     // }
//   })


//   next()

// }


