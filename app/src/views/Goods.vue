<template>
  <div class="goods">
    <!-- 商品详情 -->
    <van-nav-bar
      class="van-nav-bar"
      :title="data.name"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="goBack()"
      @click-right="goHome()"
    />

    <img :src="data.imgurl" width="300" height="300" alt="" />
    <div class="jin">
      <h2>{{ data.name }}</h2>
      <div class="price">
        <!-- <del>￥{{ data.price }}</del -->
        <span>￥{{ data.price }}</span>
        <p>类型：{{ data.gender }}</p>
      </div>
    </div>

    <van-cell class="van-cell" title="同类热门商品" value="" />

    <!-- 同类热门商品 -->
    <!-- <van-list
      v-model="loading"  
      :finished="finished"
      finished-text="没有更多了" -->

    <!-- 动态路由--》 -->
    <van-row class="van-row" type="">
      <van-col
        span="12"
        v-for="item in hotlist"
        :key="item._id"
        @click="getData2(item.id)"
      >
        <!-- <van-row type="">
        <van-col span="12" 
        v-for="item in goodslist" 
        :key="item._id" 
        @click="goto(item._id)"> -->
        <van-image width="120" height="120" :src="item.imgurl" />
        <h5 class="h">{{ item.name }}</h5>
        <div class="price">
          <span>￥{{ item.price }}</span>
          <p>类型：{{ item.gender }}</p>
        </div>
      </van-col>
    </van-row>
    <!-- </van-list> -->

    <van-goods-action style="z-index: 3">
      <van-goods-action-icon icon="chat-o" text="客服" />

      <van-goods-action-icon
        icon="cart-o"
        :badge="cartlen"
        text="购物车"
        @click="gotoCart"
      />

      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addcart"
      />

      <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
    </van-goods-action>
    <!-- <h1>Goods</h1> -->
  </div>
</template>

<script>
export default {
  name: "Goods",
  data() {
    return {
      data: {},
      hotlist: [],
      loading: false,
      finished: false,
      page: 0,
      refreshing: false,
    };
  },
  watch: {
    "$route.path": function (newVal) {
      this.getData();
    },
  },
  methods: {
    //加入购物车传参
    addcart() {
      console.log("addcart");
      const { gender, id, imgurl, name, price, _id } = this.data;
      const goods = {
        id,
        imgurl,
        name,
        price,
        _id,
        qty: 1,
      };
      const C = localStorage.getItem("userInfo");
      console.log("C=", C);
      // const goodsList = [];
      // const arr = this.$store.state.goodsList;
      // console.log("arr=", arr);
      // arr.forEach(item => {
      //   if (arr == null) {
      //     goodsList = [goods, ...this.$store.state.goodsList];
      //     console.log("goodsList=", goodsList);
      //   } else if (item.id == goods.id) {
      //     goodsList = this.$store.state.goodsList;
      //   } else {
      //     goodsList = [goods, ...this.$store.state.goodsList];
      //     console.log("goodsList=", goodsList);
      //   }
      // });
      const goodsList = [goods, ...this.$store.state.goodsList];
      this.$store.commit("updateCart", goodsList);
      // this.$request
      //   .post("/order/addcar", {
      //     Headers: {
      //       Authorization: C.Authorization,
      //     },
      //     goodid: this.data.id,
      //     number: 1,
      //     rowsprice: this.data.price,
      //   })

      //   .then(({ data }) => {
      //     if (data.code === 200) {
      //       //重新从服务器获取一份购物车数据
      //       // this.$store.dispatch('getCartlist')
      //       //本地操作：直接修改本地的VUEx
      //     }
      //     console.log(
      //       "this.$store.state.goodsList=",
      //       this.$store.state.goodsList
      //     );
      //   });
    },
    buyNow() {
      console.log("buyNow");
    },
    //点击去购物车
    gotoCart() {
      this.$router.push("/cart");
      console.log("gotoCart");
    },
    //返回上一页
    goBack() {
      this.$router.back();
    },
    //返回首页
    goHome() {
      // this.$router.replace('/home')
      this.$router.replace({
        path: "/home",
      });
    },
    //在详情页点击获取商品的数据，直接在原页显示
    async getData2(id) {
      this.$router.push({
        name: "Goods",
        params: { id },
      });
    },
    //获取信息及
    async getData() {
      const { id } = this.$route.params;
      console.log("id=", id);
      const {
        data: {
          data: { data: data },
        },
      } = await this.$request.get("/good/getgood?goodid=" + id);
      console.log("data", data);
      this.data = data[0];
      this.getHotList(data[0]);
      console.log("this.data=", this.data);
    },
    //更多相关商品信息
    async getHotList(a) {
      console.log("a=", a);

      const {
        data: { data: res },
      } = await this.$request.get("/good/list/", {
        params: {
          type: a.gender,
          // page: 0,
        },
      });
      console.log(res);
      this.hotlist = res.data;
      console.log("hotlist=", this.hotlist);
    },
  },
  components: {},
  computed: {
    cartlen() {
      return this.$store.state.goodsList.length;
    },
  },

  created() {
    //   console.log('Goods',this.$route);
    this.getData();
  },

  // mounted() {
  //   this.$store.commit("showTabbar", false);
  // },
  // destroyed() {
  //   this.$store.commit("showTabbar", true);
  //   this.$store.state.tabbarVisibility=true
  // },
};
</script>

<style scoped>
.price {
  font-size: 20px;
  text-align: left;
}
.ee {
  display: flex;
  justify-content: space-between;
}

.van-nav-bar {
  font-weight: 700;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: rgb(180, 41, 41);
}
.van-nav-bar__text {
  font-size: 20px;
}
.h {
  height: 70px;
  line-height: 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.van-cell {
  background-color: rgb(224, 71, 71);
  margin: 25px auto;
  font-size: 24px;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: aliceblue;
}
</style>




