<template>
  <div class="app-container">
    <!-- Header 区域 -->
    <span class="mui-icon mui-icon-back arrow-left" @click="back" v-show="isShow"></span>
    <mt-header fixed title="光与影"></mt-header>

    <!-- router-view 区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- tabdar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-items" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-items" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  },
  watch: {
    $route(now, old) {
      //监控路由变换，控制返回按钮的显示
      if (now.path == "/home") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  }
};
</script>

<style scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 52px;
  overflow-x: hidden;
}

.arrow-left {
  position: fixed;
  top: 5px;
  left: 0;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  z-index: 4;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-cative {
  transition: all 0.5s ease;
}

.mui-bar-tab {
  z-index: 2;
}

.mui-icon-ball {
  position: absolute;
  top: 0;
  left: 20px;
}

.mui-bar-tab .mui-tab-items.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-items {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-items .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-items .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>