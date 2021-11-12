/*
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:27:46
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-12 10:00:37
 */
// 歌曲信息
class Song {
  constructor({ id, name, singer, album, image, duration, url }) {
    this.id = id;
    this.name = name;
    this.singer = singer;
    this.album = album;
    this.image = image;
    this.duration = duration;
    this.url = url;
  }
}
function filterSinger(singers) {
  let arr = [];
  singers.forEach(item => arr.push(item.name));
  return arr.join('/');
}
export const createTopList = music => {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    image: music.al.picUrl,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  });
};

// 歌曲数据格式化
export const formatTopSongs = function formatTopList(list) {
  let Songs = [];
  list.forEach(item => {
    if (item.id) {
      Songs.push(createTopList(item));
    }
  });
  return Songs;
};

export function createPlayList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.artists.length > 0 && filterSinger(music.artists),
    album: music.album.name,
    image: music.album.picUrl || null,
    duration: music.duration / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  });
}
// 歌曲数据格式化
export const formatSongs = function formatPlayList(list) {
  let Songs = [];
  list.forEach(item => {
    const musicData = item;
    if (musicData.id) {
      Songs.push(createPlayList(musicData));
    }
  });
  return Songs;
};
