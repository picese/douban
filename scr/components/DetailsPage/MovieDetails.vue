<template>
  <div>
    <!-- 电影详情页头部区域 -->
    <ul class="mui-table-view" v-show="flag">
      <li class="mui-table-view-cell mui-media">
        <div class="mui-media-header">
          <div class="mui-media-header-left">{{ movieMsg.title }}</div>
          <div class="mui-media-header-right">
            <div class="score">
                <span class="hollow" v-show="movieMsg.rating.average != 0">
                  <span class="solid" :style="{width:movieMsg.rating.average* 10 + '%'}"></span>
                </span>
                <span>{{ movieMsg.rating.average ? movieMsg.rating.average : '暂无评' }}分 ({{ movieMsg.ratings_count +'人评价'}})</span>
              </div>
          </div>
        </div>
        <div class="mui-media-body-details">
          <div class="mui-media-body-left">
            <img class="mui-media-object mui-pull-left" :src="movieMsg.images.small " />
          </div>
          <div class="mui-media-body-right">
            <div class="mui-ellipsis">
              导演：
              <span>{{ movieMsg.directors[0].name }}</span>
            </div>
            <div class="mui-ellipsiss">
              编剧：
              <span v-for="item in movieMsg.writers" :key="item.id">{{ item.name }}</span>
            </div>
            <div class="mui-ellipsiss">
              主演：
              <span v-for="item in movieMsg.casts" :key="item.id">{{ item.name }}</span>
            </div>
            <div class="mui-ellipsis">
              类型：
              <span v-for="item in movieMsg.genres" :key="item.id">{{ item }}</span>
            </div>
            <div class="mui-ellipsis">
              制片国家/地区：
              <span v-for="item in movieMsg.countries" :key="item.id">{{ item }}</span>
            </div>
            <div class="mui-ellipsis">
              语言：
              <span v-for="item in movieMsg.languages" :key="item.id">{{ item }}</span>
            </div>
            <div class="mui-ellipsis">
              上映日期：
              <span>{{ movieMsg.pubdates[0] }}</span>
            </div>
            <div class="mui-ellipsis">
              片长：
              <span>{{ movieMsg.durations[0] }}</span>
            </div>
            <div class="mui-ellipsis">
              又名：
              <span>{{ movieMsg.aka[0] }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="count">
      <div class="count-btn">{{ movieMsg.wish_count }}人想看</div>
      <div class="count-btn">{{ movieMsg.reviews_count }}人看过</div>
    </div>

    <!-- 电影剧情介绍 -->
    <div class="mui-table-view">
      <h4>电影剧情介绍：</h4>
      <p>{{ movieMsg.summary }}</p>
    </div>

    <!-- 预告片 -->
    <div class="mui-table-view">
      <h4>预告片</h4>
      <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
            <a :href="item.resource_url" v-for="item in movieMsg.trailers" :key="item.id">
              <img :src="item.small" />
              <span class="playBtn"></span>
            </a>
        </div>
      </div>
    </div>

    <!-- 评论 -->
    <ul class="mui-table-view">
      <h4>热门短评</h4>
      <li
        class="mui-table-view-cell mui-media comment"
        v-for="item in popular_comments"
        :key="item.id"
      >
        <img class="mui-media-object mui-pull-left comment-header" :src="item.author.avatar" />
        <div class="mui-media-body">
          <div class="mui-media-body-header">
            <span>{{ item.author.name }}</span>
            <span>{{ item.created_at }}</span>
          </div>
          <p class="mui-ellipsis-content">{{ item.content}}</p>
        </div>
      </li>
      <button class="mint-button mint-button--danger mint-button--large" @click="moreComment" v-show="flag">
        <label class="mint-button-text">查看更多短评</label>
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
      id: this.$route.params.id,
      title: this.$route.params.title,
      movieMsg: {
        rating: {
          max: "",
          average: "",
          min: 0
        },
        reviews_count: "",
        wish_count: "",
        original_title: "",
        collect_count: "",
        images: {
          small: "",
          large: "",
          medium: ""
        },
        alt: "",
        id: "",
        pubdate: "",
        title: "",
        languages: [],
        writers: [{ name: "" }],
        pubdates: "",
        tags: [],
        durations: "",
        genres: [],
        trailers: [],
        casts: [],
        countries: [],
        summary: "",
        directors: [{ name: "" }],
        comments_count: "",
        popular_reviews: [],
        ratings_count: "",
        aka: [],
        clips: [
          {
            medium: "",
            title: "",
            subject_id: "",
            alt: "",
            small: "",
            resource_url: "",
            id: ""
          }
        ]
      },
      popular_comments: [],
      flag:false
    };
  },

  created() {
    Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
      });
    this.getContent();
  },

  methods: {
    getContent() {
      // 获取数据
      this.$http
        .jsonp("https://douban.uieee.com/v2/movie/subject/" + this.id)
        .then(
          res => {
            if (res.status === 200) {
              this.movieMsg = res.body;
              this.popular_comments = this.popular_comments.concat(
                res.body.popular_comments
              );
              Indicator.close();
              this.flag = true;
            }
          },
          res => {
            Toast({
              message: "获取数据失败",
              duration: 2000
            });
          }
        );
    },

    moreComment() {
      // 加载更多
      this.getContent();
    },

    beforeEnter(el) {
      // 动画开始之前的起始位置
      el.style.transform = "translate(0,0)";
    },

    enter(el, done) {
      // 动画执行过程和动画结束之后的状态

      el.offsetWidth;

      const bullPostion = this.$refs.bull.getBoundingClientRect();
      const badgePostion = document
        .getElementById("badge")
        .getBoundingClientRect();

      const Xdist = badgePostion.left - bullPostion.left;
      const Ydist = badgePostion.top - bullPostion.top;

      el.style.transform = `translate(${Xdist}px,${Ydist}px)`;

      el.style.transition = "all 1s ease";

      done();
    },

    afterEnter(el) {
      // 动画完成后
      this.flag = !this.flag;
    }
  }
};
</script>

<style scoped>
.mui-media-header-left {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 10px;
}

.mui-table-view .mui-media-body-left img {
  line-height: 53px;
  max-width: 116px;
  height: 188px;
}

.mui-media-body-details .mui-media-body-left {
  margin-top: 8px;
}

.mui-media-header-right {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #333;
  margin-top: 12px;
}

.mui-media-header-right .score .hollow {
  width: 80px;
  height: 13px;
  display: inline-block;
  background: url(../../images/xingxing.png) no-repeat;
  position: relative;
  top: 2px;
}

.mui-media-header-right .score .solid {
  height: 13px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../images/xingxing.png) no-repeat left bottom;
}

.mui-media-body-details {
  display: flex;
  flex-direction: row;
  color: #636161;
  font-size: 15px;
}

.mui-media-body-right .mui-ellipsiss {
  white-space: unset;
  padding: 3px 0;
}

.mui-media-body-right .mui-ellipsiss span {
  padding-right: 5px;
}

.mui-media-body-right .mui-ellipsis span {
  padding-right: 5px;
}

.mui-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 3px 0;
}

.count {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 0.1px solid #e2e0e0;
}

.count-btn {
  margin: 20px 20px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  width: 100px;
  height: 30px;
  color: #fff;
  border-radius: 5px;
  background-color: #e54847;
}

.mui-table-view p {
  padding: 0 10px 6px 10px;
}

.mui-scroll-wrapper ul{
  padding: 0;
  margin:0;
}

.mui-table-view a{
  position: relative;
  display: inline-block;
  padding-right: 4px;
}

.mui-table-view a:first-child{
  padding-left: 4px;
}

.mui-segmented-control.mui-scroll-wrapper {
    height: 100px;
}

.mui-table-view .mui-pull-left {
  line-height: 42px;
  max-width: 96px;
  height: 188px;
}

.mui-table-view-cell p {
  margin-bottom: 0;
  color: #0e0e0e;
}

.mui-table-view-cell h4 {
  padding: 6px 0;
  color: #333;
}
.playBtn {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 10px 0 10px 20px;
  border-color: transparent transparent transparent #f9fafb85;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -7px;
}
.mui-table-view h4 {
  padding: 15px 10px 0 10px;
}
.mui-table-view .comment {
  padding: 10px 5px;
}

.mui-table-view .comment .comment-header {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.mui-table-view .mui-media-body-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
}

.mui-table-view .mui-media-body span {
  font-size: 14px;
  color: #333;
}
</style>
