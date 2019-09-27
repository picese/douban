<template>
  <div>
    <div class="title" v-show="flag">{{ title }}</div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in MainlandBoxOfficeList" :key="item.id">
        <router-link :to="'/home/DetailsPage/MovieDetails/' + item.id + '/'+ title">
          <img class="mui-media-object mui-pull-left" :src="item.subject.images.small">
          <div class="mui-media-body">
            <div class="mui-media-header">
              <span>{{ item.subject.title }}</span>
              <div
                class="score"
              >{{ item.subject.rating.average ? item.subject.rating.average : 0 }}分</div>
            </div>
            <span class="mui-ellipsis">类型:
              <span class="types" v-for="item in item.subject.genres" :key="item.id">{{ item }}</span>
            </span>
            <span class="mui-ellipsis">主演:
              <span v-for="item in item.subject.casts" :key="item.id">{{ item.name }} </span>
            </span>
            <div class="mui-ellipsis">
              上映时间：
              <span>{{ item.subject.pubdates[0]}}</span>
              <span class="more-date">{{ item.subject.pubdates[1]}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      MainlandBoxOfficeList: [],
      title: "",
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
        .jsonp("https://douban.uieee.com/v2/movie/weekly").then(res => {
            if (res.status === 200) {
              this.MainlandBoxOfficeList = res.body.subjects;
              this.title = res.body.title.substring(4);
              Indicator.close();
              this.flag = true;
            }
          },
          res => {
            Toast({
              message: "获取数据失败",
              duration: 3000
            });
          }
        );
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
  max-width: 100px;
  width: 90px;
  height: 110px;
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
  margin-top: 9px;
  font-size: 14px;
}

.mui-ellipsis .more-date {
  display: flex;
  justify-content: center;
  margin-right: 28px;
}

.mui-ellipsis .types{
  margin-right: 4px;
}
</style>
