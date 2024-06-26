/*
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2022-11-14 15:46:45
 * @LastEditors: wangtongxi
 * @LastEditTime: 2024-06-25 23:16:27
 */
import { deviceType } from '~/util/deviceType';
export default function(context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent;
  // 给全局上下文添加一个属性来保存我们返回的匹配信息
  context.deviceType = deviceType(context.userAgent);
  // 这里注入到store,是因为我部分页面需要判断机型请求不同的数据,
  // 你们没有用到的话可以移除
  console.log({deviceType:context.deviceType.type})
  // debugger;
  context.store.commit('music/SetDeviceType', context.deviceType.type);
  // 若是判断UA非移动端的,就在这里做处理了..
  // context.redirect(status,url) 这个可以重定向到外部网站
  // 若是内部访问可以直接用router对象push
  if (context.deviceType.type === 'pc') {
    //
  }
}
