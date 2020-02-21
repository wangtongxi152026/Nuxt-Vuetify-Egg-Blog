import { login, getUser } from '~/api/api';
import { setToken, removeToken, getCookie } from '~/util/auth';
import vue from 'vue';
import tocObj from '~/markdown/assets/js/marked/createToc';
const state = {
  drawer: false,
  token: '',
  userinfo: '',
  toc: ''
};
const getters = {};

const mutations = {
  setDrawer: (state, payload) => (state.drawer = payload),
  toggleDrawer: state => (state.drawer = !state.drawer),
  set_token: (state, payload) => {
    setToken(payload);
    state.token = payload;
  },
  logout: state => {
    removeToken();
    state.token = '';
    state.userinfo = '';
  },
  set_user_info: (state, payload) => (state.userinfo = payload),
  set_toc: (state, payload) => (state.toc = payload)
};

const actions = {
   

  nuxtServerInit({ commit }, { req }) {
    console.log(req.headers);
    if (req.headers.cookie) {
      try {
        const Token = getCookie(req.headers.cookie);
        console.log(Token, 'Token');
        commit(set_token, Token);
      } catch (error) {
        console.log(error, 'err');
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
