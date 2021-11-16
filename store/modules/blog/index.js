import { setToken, removeToken, getCookie } from '~/util/auth';

const state = () => ({
  drawer: false,
  token: '',
  userinfo: '',
  toc: ''
});
const getters = {};

const mutations = {
  setDrawer: (state, payload) => {
    state.drawer = payload;
  },
  toggleDrawer: state => {
    state.drawer = !state.drawer;
  },
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
  async getUserInfo({ state, commit }) {
    if (state.userinfo) {
      return;
    }
    try {
      this.$axios.setHeader('Authorization', state.token);
      const result = await this.$axios.get('/blog/getUserInfo');
      commit('set_user_info', result.data.data);
    } catch (error) {
      console.log(error, 'getUserInfo erro');
    }
  },

  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      try {
        const Token = getCookie(req.headers.cookie);
        commit('set_token', Token);
        commit('getUserInfo');
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
