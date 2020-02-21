// import { defaults, onlyBodys, noFooters } from '~/util/route';

// export default ({ route, store, app: { router } }) => {

//   // console.log(999999999999, route.matched.meta, 'route.fullPath');

//   // console.log(route, 'route', 77777777);
//   // console.log(router, 'router', 8888888888888888);
//   router.beforeEach((to, from, next) => {

//     // console.log(to, 9999999);
//     next()

//     if (defaults.some(defaul => to.fullPath === defaul)) {
//       store.commit('layout/setFooter', true)
//       store.commit('layout/setNav', true)

//       next();

//     } else if (onlyBodys.some(onlyBody => to.fullPath === onlyBody)) {

//       store.commit('layout/setFooter', false)
//       store.commit('layout/setNav', false)

//       next()

//     } else if (noFooters.some(noFooter => { return to.fullPath.indexOf(noFooter) != -1 })) {


//       store.commit('layout/setNav', true)
//       store.commit('layout/setFooter', false)

//       next()
//     } else {
//       store.commit('layout/setFooter', true)
//       store.commit('layout/setNav', true)
//       next();

//     }
//   })

//   console.log('navShow:', store.getters['layout/navShow'])
//   console.log('footerShow:', store.getters['layout/footerShow'])

//   // console.log(context, 'context');
//   // 给上下文对象增加 userAgent 属性（增加的属性可在 `asyncData` 和 `fetch` 方法中获取）

// }