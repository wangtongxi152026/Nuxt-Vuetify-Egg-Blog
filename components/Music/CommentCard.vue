<template>
  <v-card class="mx-auto mb-1 card elevation-1">
    <v-list-item class="px-3" three-line>
      <v-list-item-avatar class="mr-4" size="38">
        <img v-lazy="`${item.user.avatarUrl}?param=50y50`" />
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="caption name">{{ item.user.nickname }}</div>

        <div class="caption mb-1 content">{{item.content}}</div>

        <div class="caption time d-flex justify-space-between">
          {{ item.time | format }}
          <span>
            <v-icon class="iconfont mb-1 icon-like"></v-icon>
            {{ item.likedCount }}
          </span>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { add0 } from '~/plugins/util'

export default {
  name: 'CommentCard',
  props: {
    item: {
      type: Object,
    }
  },
  filters: {
    // 格式化时间
    format (time) {
      let formatTime
      const date = new Date(time)
      const dateObj = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      }
      const newTime = new Date()
      const diff = newTime.getTime() - time
      if (newTime.getDate() === dateObj.date && diff < 60000) {//1min内
        formatTime = '刚刚'
      } else if (newTime.getDate() === dateObj.date && diff > 60000 && diff < 3600000
      ) {//1h内
        formatTime = `${Math.floor(diff / 60000)}分钟前`
      } else if (//1天
        newTime.getDate() === dateObj.date &&
        diff > 3600000 &&
        diff < 86400000
      ) {
        formatTime = `${add0(dateObj.hours)}:${add0(dateObj.minutes)}`
      } else if (newTime.getDate() !== dateObj.date && diff < 86400000) {
        formatTime = `昨天${add0(dateObj.hours)}:${add0(dateObj.minutes)}`
        // } else if (newTime.getFullYear() === dateObj.year) {
        //   formatTime = `${dateObj.month + 1}月${dateObj.date}日`
      } else {
        formatTime = `${dateObj.year}年${dateObj.month + 1}月${dateObj.date}日`
      }
      return formatTime
    }
  },
}
</script>

<style scoped>
.iconfont {
  cursor: default;
}
.card {
  background-color: #ccc;
}

.name {
  color: #b77171;
}

.content,
.time {
  color: #333;
}
.icon-like {
  font-size: 15px;
  color: #333;
}
</style>
