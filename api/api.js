/*
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2020-02-16 09:41:48
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-12 10:05:32
 */
import ajax from './ajax';

export function login(params) {
  return ajax.post('/blog/login', params);
}
export function logout(params) {
  return ajax.post('/blog/logout', params);
}
export function register(params) {
  return ajax.post('/blog/register', params);
}
export function getUser(params) {
  console.log(params, 'paramsgeuser');
  return ajax.post('/blog/getUser', params);
}

export function getUserInfo() {
  return ajax.get('/blog/getUserInfo');
}

export function addComment(params) {
  return ajax.post('/blog/addComment', params);
}
export function addThirdComment(params) {
  return ajax.post('/blog/addThirdComment', params);
}

export function getCommentList(params) {
  return ajax.post('/blog/getArticleComment', params);
}
export function getArticleList(params) {
  return ajax.post('/blog/getArticleList', params);
}

export function likeArticle(params) {
  return ajax.post('/blog/likeArticle', params);
}
export function getArticleDetail(params) {
  return ajax.post('/blog/getArticleDetail', params);
}
export function addMessage(params) {
  return ajax.post('/blog/addMessage', params);
}
export function getMessageList(params) {
  return ajax.post('/blog/getMessageList', params);
}
export function getMessageDetail(params) {
  return ajax.post('/blog/getMessageDetail', params);
}
export function getLinkList(params) {
  return ajax.post('/blog/getLinkList', params);
}
export function getTagList(params) {
  return ajax.post('/blog/getTagList', params);
}
export function getCategoryList(params) {
  return ajax.post('/blog/getCategoryList', params);
}
export function getTimelineList(params) {
  return ajax.post('/blog/getTimelineList', params);
}
