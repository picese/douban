<template>
  <div class="container">
    <!-- 搜索框 -->
    <div class="mui-input-row mui-search">
      <input type="search" class="mui-input-clear" placeholder=" 歌手 / 歌曲" v-model="keyWords" @keyup="search">
    </div>

    <!-- 搜索内容 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in musicLists" :key="item.id">
        <!-- <router-link :to="'/home/DetailsPage/MovieDetails/' + item.id + '/'+ title"> -->
          <img class="mui-media-object mui-pull-left" :src="item.image">
          <div class="mui-media-body">
            <div class="mui-media-header">
              <span>{{ item.title}}</span>
              <div class="score">{{ item.rating.average +'分'}}</div>
            </div>
            <span class="mui-ellipsis">{{ item.attrs.singer +  (item.alt_title ? ' · ' + item.alt_title : '') }}</span>
          </div>
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      musicLists:'',
      keyWords:'',
    };
  },
  created(){
    this.search()
  },
  methods: {
    getMusicData(){
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
    });
      this.$http.jsonp("https://douban.uieee.com/v2/music/search?tag="+ this.keyWords).then(res=>{
        if(res.status === 200){
          this.musicLists = res.body.musics;
          Indicator.close();
        }else{
          Toast({
              message: "获取数据失败",
              duration: 5000
            });
        }
      })
    },
    search(keyWords){
      this.getMusicData();
    }
  }
};
</script>

<style scoped>
.app-container .mui-search {
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
}
.app-container .mui-search .mui-placeholder {
    top: 6px;
}
.mui-search:before {
    top: 52%;
}

.app-container .mui-input-row .mui-search .mui-icon-clear {
    top: 12px;
}

.mui-media-body {
  display: flex;
  flex-direction: column;
}

.mui-media-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 6px;
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
  font-size: 15px;
  padding-top: 10px;
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