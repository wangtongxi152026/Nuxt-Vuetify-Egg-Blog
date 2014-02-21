import msgboxVue from './message.vue';
// 定义插件对象
import Vue from 'vue';

const MessageInstance = Vue.extend(msgboxVue);
// vue的install方法，用于定义vue插件
let MessageBox = {};
let currentMsg, instance;
MessageBox.install = function(options) {
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageInstance();
    let msgEl = currentMsg.$mount().$el;
    document.body.appendChild(msgEl);
    instance = true;
  };

  // 在Vue的原型上添加实例方法，以全局调用

  Vue.prototype.$message = {
    success(options) {
      if (!instance) {
        initInstance();
      }
      currentMsg.color = 'success';
      currentMsg.message = options;
      currentMsg.show = true;
    },
    err(options) {
      if (!instance) {
        initInstance();
      }
      currentMsg.color = 'err';
      currentMsg.message = options;
      currentMsg.show = true;

      // return currentMsg.err();
    }
  };
};

export default MessageBox;
