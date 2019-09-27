<template>
  <div>
    <div class="title" v-show="flag">{{ title }} {{ date }}</div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,i) in EuroBoxOfficeList" :key="item.id">
        <div class="num"><span>{{ i + 1 }}</span></div>
        <router-link :to="'/home/DetailsPage/MovieDetails/' + item.subject.id + '/'+ title">
          <img class="mui-media-object mui-pull-left" :src="item.subject.images.small">
          <div class="mui-media-body">
            <div class="mui-media-header">
              <span>{{ item.subject.title }}</span>
              <div class="score">{{ item.box }}美元</div>
            </div>
            <span class="mui-ellipsis">类型:
              <span class="types" v-for="item in item.subject.genres" :key="item.id">{{ item }}</span>
            </span>
            <span class="mui-ellipsis">主演:
              <span v-for="item in item.subject.casts" :key="item.id">{{ item.name }} </span>
            </span>
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
            EuroBoxOfficeList:[],
            title:'',
            date:'',
            flag:false
        }
    },
    created() {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.getLists()
    },
    methods: {
        getLists() {
            this.$http.jsonp("https://douban.uieee.com/v2/movie/us_box").then(res => {
              if (res.status === 200) {
                this.EuroBoxOfficeList = res.body.subjects;
                this.title = res.body.title.substring(4);
                this.date = res.body.date;
                Indicator.close();
                this.flag = true;
              }

        },res => {
          Toast({
              message: "获取数据失败",
              duration: 2000
            });
        })
        }
    }
};
</script>

<style scoped>
.title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #aaa;
    font-size: 15px;
}

.mui-table-view-cell .num {
    font-size: 16px;
    position: absolute;
    top: 11px;
    left: 15px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: #f1df27c7;
    border-radius: 0 0 100% 0;
}

.mui-table-view-cell .num span {
    font-size: 12px;
    color: #131111;
    padding-bottom: 7px;
    padding-right: 5px;
}

.mui-media-body{
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
    font-size: 13px;
    color: #666699;
}

.mui-media-header .score span {
    color:#808080;
    font-size: 12px;
}
.mui-ellipsis {
    color:#808080;
    font-size: 14px;
}
</style>
