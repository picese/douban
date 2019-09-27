<template>
  <div>
    <div class="title" v-show="flag">{{ title }}</div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in TOPList" :key="item.id">
        <router-link :to="'/home/DetailsPage/MovieDetails/' + item.id + '/'+ title">
          <img class="mui-media-object mui-pull-left" :src="item.images.small">
          <div class="mui-media-body">
            <div class="mui-media-header">
              <span>{{ item.title }}</span>
              <div class="score">{{ item.rating.average ? item.rating.average : 0 }}分</div>
            </div>
            <span class="mui-ellipsis">类型:
              <span class="types" v-for="item in item.genres" :key="item.id">{{ item }}</span>
            </span>
            <span class="mui-ellipsis">主演:
              <span v-for="item in item.casts" :key="item.id">{{ item.name }} </span>
            </span>
            <div class="mui-ellipsis">
              上映时间：
              <span>{{ item.pubdates[0]}}</span>
              <span class="more-date">{{ item.pubdates[1]}}</span>
            </div>
          </div>
        </router-link>
      </li>
      <button class="mint-button mint-button--danger mint-button--large" @click="moreList" v-show="flag">
        <label class="mint-button-text">加载更多</label>
      </button>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      TOPList: [],
      title: "",
      count: 20,
      flag:false
    };
  },
  created() {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    this.getLists();
  },
  methods: {
    getLists() {
      this.$http
        .jsonp(
          "https://douban.uieee.com/v2/movie/top250?count=" +
            this.count +""
        )
        .then(res => {
          if (res.status === 200) {
            this.TOPList = res.body.subjects;
            this.title = res.body.title.substring(4);
            Indicator.close();
            this.flag = true;
          }
        },res => {
          Toast({
              message: "获取数据失败",
              duration: 3000
            });
        });
    },
    moreList() {
      this.count += 20;
      this.getLists();
    }
  }
};
</script>

<style scoped>
.title {
  height: 50px;
  line-height: 3;
  letter-spacing: 2px;
  text-align: center;
  color: #aaa;
  font-size: 15px;
}

.mui-media-body {
  display: flex;
  flex-direction: column;
}

.mui-media-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.mui-table-view .mui-media-object {
  line-height: 42px;
  max-width: 70px;
  width: 58px;
  height: 64px;
}

.mui-media-header .score {
  color: #ff0000;
  font-size: 15px;
}

.mui-media-header .score span {
  color: #808080;
  font-size: 12px;
}
.mui-ellipsis {
  color: #808080;
  font-size: 14px;
}

.mui-ellipsis .more-date {
  display: flex;
  justify-content: center;
  margin-right: 56px;
}
.mui-ellipsis .types{
  margin-right: 4px;
}
</style>
