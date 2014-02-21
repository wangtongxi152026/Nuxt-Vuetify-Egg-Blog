// 补0
export const add0 = num => (num < 10 ? '0' + num : num);
// 歌词时间格式化
export function formatTime(value) {
  let min = Math.floor(value / 60);
  let sec = Math.floor(value % 60);
  return `${add0(min)}:${add0(sec)}`;
}

// 洗牌算法
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(arr) {
  // 复制原数组
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);

    [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
    // let t = _arr[i];
    // _arr[i] = _arr[j];
    // _arr[j] = t;
  }
  return _arr;
}
// 防抖
export function debounce(func, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 歌词解析
export function parseLyric(lrc) {
  let lyrics = lrc.split('\n');
  let lrcObj = [];
  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i]);
    let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
    let timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    let clause = lyric.replace(timeReg, '');
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k];
      let min = Number(String(t.match(/\[\d*/i)).slice(1));
      let sec = Number(String(t.match(/:\d*/i)).slice(1));
      let time = min * 60 + sec;
      if (clause !== '') {
        lrcObj.push({
          time: time,
          text: clause
        });
      }
    }
  }
  return lrcObj;
}

// 格式化时间
export function format(time) {
  let formatTime;
  const date = new Date(time);
  const dateObj = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes()
  };
  const newTime = new Date();
  const diff = newTime.getTime() - time;
  if (newTime.getDate() === dateObj.date && diff < 60000) {
    //1min内
    formatTime = '刚刚';
  } else if (
    newTime.getDate() === dateObj.date &&
    diff > 60000 &&
    diff < 3600000
  ) {
    //1h内
    formatTime = `${Math.floor(diff / 60000)}分钟前`;
  } else if (
    //1天
    newTime.getDate() === dateObj.date &&
    diff > 3600000 &&
    diff < 86400000
  ) {
    formatTime = `${add0(dateObj.hours)}:${add0(dateObj.minutes)}`;
  } else if (newTime.getDate() !== dateObj.date && diff < 86400000) {
    formatTime = `昨天${add0(dateObj.hours)}:${add0(dateObj.minutes)}`;
    // } else if (newTime.getFullYear() === dateObj.year) {
    //   formatTime = `${dateObj.month + 1}月${dateObj.date}日`
  } else {
    formatTime = `${dateObj.year}年${dateObj.month + 1}月${dateObj.date}日`;
  }
  return formatTime;
}

// 节流
export function throttle(cb, delay) {
  // 上次操作的时间
  let lastTime = 0;
  // 计时器
  let timer = null;
  return function() {
    /** @不在时间间隔内 **/
    // 当前操作的时间
    const triggerTime = Date.now();
    // 如果 当前操作的时间 - 上次操作的时间 > 时间间隔，则执行 cb
    if (triggerTime - lastTime > delay) {
      lastTime = triggerTime;
      cb.call(this, ...arguments);
    } else {
      /** @在时间间隔内 **/
      // 用户若一直操作，则重置计时器
      timer && clearTimeout(timer);
      // 设置定时器，到达我们设置的 delay 间隔，就给用户执行一次
      timer = setTimeout(() => {
        lastTime = triggerTime;
        clearTimeout(timer);
        cb.call(this, ...arguments);
      }, delay);
    }
  };
}

export function numberFormat(val) {
  let num = 10000;
  let sizesValue = '';
  if (val < 1000) {
    // 如果小于10000则直接返回
    sizesValue = '';
  } else if (val >= 10000 && val < 99999999) {
    sizesValue = '万';
  } else if (val >= 100000000) {
    sizesValue = '亿';
  }
  // 大于一万则运行下方计算
  let i = Math.floor(Math.log(val) / Math.log(num));
  /**
   * toFixed(0)看你们后面想要取值多少，我是不取所以填了0，一般都是取2个值
   */
  let sizes = (val / Math.pow(num, i)).toFixed(0);
  sizes = sizes + sizesValue;
  return sizes;
}
