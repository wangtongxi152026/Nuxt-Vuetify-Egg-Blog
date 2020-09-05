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
    
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]]
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
        lrcObj.push({ time: time, text: clause });
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
