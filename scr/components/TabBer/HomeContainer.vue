<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeLists" :key="item.id">
        <img :src="item.images.small" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 导航 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9" v-show="falg">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/Navigation/ShowingUp">
          <img class="mui-icon" src="../../images/1.jpg" alt />
          <div class="mui-media-body">正在热映</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/Navigation/ComingSoon">
          <img class="mui-icon" src="../../images/2.jpg" alt />
          <div class="mui-media-body">即将上映</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/Navigation/NewMovieList">
          <img class="mui-icon" src="../../images/3.jpg" alt />
          <div class="mui-media-body">新片榜</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/Navigation/TOP250">
          <img class="mui-icon" src="../../images/4.jpg" alt />
          <div class="mui-media-body">top250</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/Navigation/EuroBoxOffice">
          <img class="mui-icon" src="../../images/5.jpg" alt />
          <div class="mui-media-body">北美票房榜</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/Navigation/WordOfMouthList">
          <img class="mui-icon" src="../../images/6.jpg" alt />
          <div class="mui-media-body">本周口碑榜</div>
        </router-link>
      </li>
    </ul>
    <!-- 正在热映 -->
    <div class="item">
      <div class="showing" v-show="falg">
        <span class="showing-left">正在热映</span>
        <router-link to="/home/Navigation/ShowingUp">
          <div class="showing-right">
            <span>更多</span>
            <span class="mui-icon mui-icon-more"></span>
          </div>
        </router-link>
      </div>
      <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a v-for="item in swipeLists" :key="item.id">
            <router-link :to="'/home/DetailsPage/MovieDetails/' + item.id +'/'+ title">
              <img :src="item.images.small" />
              <div class="mui-media-body">{{ item.title }}</div>
              <div class="score">
                <span class="hollow" v-show="item.rating.average != 0">
                  <span class="solid" :style="{width:item.rating.average* 10 + '%'}"></span>
                </span>
                <span>{{ item.rating.average ? item.rating.average : '暂无评' }}分</span>
              </div>
            </router-link>
          </a>
        </div>
      </div>
    </div>
    <!-- 即将上映 -->
    <div class="item">
      <div class="showing" v-show="falg">
        <span class="showing-left">即将上映</span>
        <router-link to="/home/Navigation/ComingSoon">
          <div class="showing-right">
            <span>更多</span>
            <span class="mui-icon mui-icon-more"></span>
          </div>
        </router-link>
      </div>
      <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a v-for="item in ComingSoonLists" :key="item.id">
            <router-link :to="'/home/DetailsPage/MovieDetails/' + item.id +'/'+ title">
              <img :src="item.images.small" />
              <div class="mui-media-body">{{ item.title }}</div>
              <div class="score">
                <span>上映时间：{{ item.mainland_pubdate.substr(5) }}</span>
              </div>
            </router-link>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      swipeLists: [],
      ComingSoonLists: [],
      title: '',
      falg:false
    };
  },
  created() {
    Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
    });
    this.getswipe();
    this.getComingSoonLists();
  },
  methods: {
    getswipe() {
      this.$http.jsonp("https://douban.uieee.com/v2/movie/in_theaters?city=梅州&count=10")
        .then(res => {
          if (res.status === 200) {
            this.swipeLists = res.body.subjects;
            this.title = res.body.title;
            Indicator.close();
            this.falg = true;
          } else {
            Toast({
              message: "获取轮播图失败",
              duration: 5000
            });
          }
        });
    },
    getComingSoonLists(){
      this.$http.jsonp("https://douban.uieee.com/v2/movie/coming_soon?count=10")
      .then(res =>{
        if(res.status == 200){
          this.ComingSoonLists = res.body.subjects;
          Indicator.close();
        }else{
          Toast({
              message: "获取列表失败",
              duration: 5000
            });
        }
      });
    }
  }
};
</script>

<style scoped>
/* 轮播图样式 */
.mint-swipe {
  height: 280px;
}

.mint-swipe .mint-swipe-item img {
  width: 100%;
  height: 100%;
}

/* navbar 列表样式 */
.mui-grid-view.mui-grid-9 {
  border: 0;
  background-color: #fff;
}

.mui-icon {
  width: 60px;
  height: 40px;
}

@media (min-width: 400px) {
  .mui-col-sm-3 {
    width: 33.333333%;
  }
}
/* 展示列表 */
.item {
  padding: 8px 0;
}

.showing {
  height: 40px;
  line-height: 40px;
  margin: 14px 5px 0 5px;
  border-bottom: 1px solid #eee;
}

.showing .showing-left {
  float: left;
}

.showing .showing-right {
  float: right;
  color: #333;
  margin-right: -5px;
}

.showing .showing-right .mui-icon-more {
  width: 24px;
  position: relative;
  right: 6px;
}

.mui-scroll-wrapper {
  height: 170px;
  margin-top: 12px;
}

.mui-scroll-wrapper .mui-scroll {
  width: 350%;
  height: 100%;
}

.mui-scroll-wrapper .mui-scroll a {
  width: 10%;
  display: inline-block;
  padding-left: 2px;
}

.mui-scroll-wrapper .mui-scroll a > a {
  width: 100%;
}

.mui-scroll-wrapper .mui-scroll a > img {
  width: 100%;
  height: 124px;
}

.mui-scroll-wrapper .mui-scroll a .mui-media-body {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.mui-scroll-wrapper .mui-scroll .hollow {
  width: 80px;
  height: 13px;
  display: inline-block;
  background: url(../../images/xingxing.png) no-repeat;
  position: relative;
  top: 2px;
}

.mui-scroll-wrapper .mui-scroll .solid {
  height: 13px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../images/xingxing.png) no-repeat left bottom;
}

.mui-scroll-wrapper .mui-scroll .score span {
  color: #666;
}
</style>