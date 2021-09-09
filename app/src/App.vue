<template>
  <div id="app">
    <van-tabbar
      v-model="active"
      border-color="#666"
      style="font-weight: 700"
      active-color="rgb(224, 71, 71)"
      route
      
    >
      <van-tabbar-item
        v-for="item in menu"
        :key="item.path"
        :to="item.path"
        :icon="item.icon"
        :badge="item.path==='/cart'? cartlen:null">
        {{ item.test }}</van-tabbar-item
      >
    </van-tabbar>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  test: "App",
  data() {
    return {
      active: 0,
      menu: [
        {
          path: "/home",
          test: "首页",
          icon: "wap-home-o",
        },

        {
          path: "/discover",
          test: "发现",
          icon: "eye-o",
        },
        {
          path: "/cart",
          test: "购物车",
          icon: "cart-o",
          badge:this.$store.state.goodsList.length,
        },
        {
          path: "/mine",
          test: "我的",
          icon: "user-o",
        },
      ],
    };
  },
  computed:{
cartlen(){

  return this.$store.state.goodsList.length
}

  },
  methods: {},

  
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  padding: 15px;
  font: 14px;
}
.price {
  del {
    color: #999;
  }
  span {
    color: #f00;
  }
}

#app {
  padding-bottom: 50px;
}
</style>






