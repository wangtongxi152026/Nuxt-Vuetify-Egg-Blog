<template>
  <v-container fluid class="container">
    <ul class="timeline-wrapper">
      <ModuleTransition>
        <li v-show="recoShowModule" class="desc">Yesterday Once More!</li>
      </ModuleTransition>
      <ModuleTransition
        :delay="String(0.08 * (index + 1))"
        v-for="(item, index) in Timelines"
        :key="index"
      >
        <li v-show="recoShowModule">
          <h3 class="year">{{item.year}}</h3>
          <ul class="year-wrapper">
            <li v-for="(subItem, subIndex) in item.data" :key="subIndex">
              <span class="date">{{subItem.start_time| dateFormat}}</span>
              <span class="title">{{subItem.title}}</span>
            </li>
          </ul>
        </li>
      </ModuleTransition>
    </ul>
  </v-container>
</template>

<script>
import { getTimelineList } from '~/api/api'

import ModuleTransition from '~/components/Transtion/ModuleTransition'
import moduleTransitonMixin from '~/components/Transtion/moduleTransiton'

export default {

  async asyncData ({ $axios }) {
    const result = await $axios.get('blog/getTimelineList', { keyword: "", pageNum: 1, pageSize: 10 })
    const Timelines = result.data.data.list
    let map = new Object();
    let resultArray = new Array();
    for (let i = 0; i < Timelines.length; i++) {
      let item = Timelines[i]
      let year = new Date(item.start_time).getFullYear()
      if (!map[year]) {
        let array = new Array();
        array.push(item);
        map[year] = { year: year, data: array };
      } else {
        let temp = map[year];
        temp.data.push(item);
        map[year] = temp;
      }
    }
    for (let key in map) {
      resultArray.unshift(map[key]);
    }
    return { Timelines: resultArray }
  },

  mixins: [moduleTransitonMixin],
  name: 'TimeLine',
  components: { ModuleTransition },
  filters: {
    dateFormat (date, type) {
      function renderTime (date) {
        const dateee = new Date(date).toJSON()
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
      }
      date = renderTime(date)
      const dateObj = new Date(date)
      const mon = dateObj.getMonth() + 1
      const day = dateObj.getDate()
      return `${mon}-${day}`
    }
  },
}
</script>


<style lang="stylus" scoped>
.timeline-wrapper {
  box-sizing: border-box;
  max-width: 740px;
  margin: 8rem auto 4rem;
  position: relative;
  list-style: none;

  &::after {
    content: ' ';
    position: absolute;
    top: 14px;
    left: 0px;
    z-index: -1;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: #d4c4c4;
  }

  .desc, .year {
    position: relative;
    color: #2c3e50;
    font-size: 16px;

    &:before {
      content: ' ';
      position: absolute;
      z-index: 2;
      left: -24px;
      top: 50%;
      margin-left: -4px;
      margin-top: -4px;
      width: 8px;
      height: 8px;
      background: #fff;
      border: 1px solid #eaecef;
      border-radius: 50%;
    }
  }

  .year {
    margin: 80px 0 0px;
    color: #2c3e50;
    font-weight: 700;
    font-size: 26px;
  }

  .year-wrapper {
    padding-left: 0 !important;

    li {
      display: flex;
      padding: 30px 0 10px;
      list-style: none;
      border-bottom: 1px dashed #c3b2b2;
      position: relative;

      &:hover {
        .date {
          color: #3eaf7c;

          &::before {
            background: #3eaf7c;
          }
        }

        .title {
          color: #3eaf7c;
        }
      }

      .date {
        width: 40px;
        line-height: 30px;
        color: #584242;
        font-size: 12px;

        &::before {
          content: ' ';
          position: absolute;
          left: -23px;
          top: 41px;
          width: 7px;
          height: 7px;
          margin-left: -4px;
          background: #fff;
          border-radius: 50%;
          border: 1px solid #eaecef;
          z-index: 2;
        }
      }

      .title {
        line-height: 30px;
        color: #584242;
        font-size: 16px !important;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: width 960px) {
  .timeline-wrapper {
    margin: 0 1.2rem;
  }
}
</style>
