import axios from 'axios';
import { formatTopSongs } from '~/plugins/song';
const defaultLimit = 15;
// asyncdata
export function getTopList() {
  return axios.post('/musc/api/toplist', {});
}
// asyncdata
export function topList(idx) {
  return axios.get('/musc/top/list', {
    params: {
      idx
    }
  });
}

// 排行榜列表 asyncdata
export async function getToplistDetail() {
  return axios.get('/musc/toplist/detail');
}

// 推荐歌单 asyncdata
export function getPersonalized() {
  return axios.get('/musc/personalized');
}

// 歌单详情 客服端
export function getPlaylistDetail(id) {
  return axios.get('/musc/playlist/detail', {
    params: {
      id: id
    }
  });
}

// 获取用户歌单列表 客服端
export const getUserPlaylist = uid =>
  axios.get('/musc/user/playlist', { params: { uid } });

// 搜索  客服端
export function search(keywords, page = 0, limit = defaultLimit) {
  return axios.get('/musc/search', {
    params: {
      offset: page * limit,
      limit: limit,
      keywords
    }
  });
}

// 热搜 asyncdata
export function searchHot() {
  return axios.get('/musc/search/hot');
}
// 获取音乐评论 asyncdata
export function getComment(id, page, limit = defaultLimit) {
  return axios.get('/musc/comment/music', {
    params: {
      offset: page * limit,
      limit: limit,
      id
    }
  });
}

//歌词 asyncdata
export function getLyric(id) {
  const url = '/musc/lyric';
  return axios.get(url, {
    params: {
      id
    }
  });
}

// 获取歌曲详情  (search图片) 客服端
export function getMusicDetail(ids) {
  return axios.get('/musc/song/detail', {
    params: {
      ids
    }
  });
}

export function getPlaylistDetails(id) {
  return new Promise((resolve, reject) => {
    getPlaylistDetail(id)
      .then(response => {
        if (response.status === 200 && response.data.code === 200) {
          return response.data.playlist;
        }
        return {};
      })
      .then(playlist => {
        const { trackIds, tracks } = playlist;
        if (!Array.isArray(trackIds)) {
          reject(new Error('获取歌单详情失败'));
          return;
        }
        // 过滤完整歌单 如排行榜
        if (tracks.length === trackIds.length) {
          playlist.tracks = formatTopSongs(playlist.tracks);
          resolve(playlist);
          return;
        }
        // 限制歌单详情最大 500
        const ids = trackIds
          .slice(0, 500)
          .map(v => v.id)
          .toString();
        getMusicDetail(ids).then(data => {
          playlist.tracks = formatTopSongs(data.data.songs);
          resolve(playlist);
        });
      });
  });
}
