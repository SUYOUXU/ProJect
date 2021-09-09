<template>
  <div class="cart-page">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="$router.back()"
      @click-right="goHome()"
    />
    <van-steps disabled>
      <van-step>购物车</van-step>
      <van-step>下单</van-step>
      <van-step>付款</van-step>
      <van-step>交易完成</van-step>
    </van-steps>

    <van-card
      v-for="item in goodsList"
      :key="item.id"
      :price="item.price"
      :title="item.name"
      :thumb="item.imgurl"
      @click-thumb="gotoDetail(item.id)"
    >
      <!-- <van-checkbox v-model="checkAll"></van-checkbox> -->

      <template #tags>
        <van-tag plain type="danger">满300减30</van-tag>
        <van-tag plain type="danger">假一赔十</van-tag>
      </template>
      <template #footer>
        <van-button
          style="margin-top: 16px; width: 35px; height: 30px"
          type="danger"
          icon="delete-o"
          size=""
          @click="deleteGoods(item.id)"
        ></van-button>
      </template>
      <template #num>
        <van-stepper
          :value="item.qty"
          theme="round"
          button-size="22"
          @change="changeQty($event, item.id)"
        />
      </template>
    </van-card>
    <div style="margin-top: 20px">
      <van-button type="danger" plain size="small" @click="clearAllCart"
        >清空购物车</van-button
      >
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations, mapActions }  from "vuex";
export default {
  data() {
    return {
      checkAll: false,
    };
  },
  computed: {
    totalPrice() {
      return (
        this.goodsList.reduce((prev, item) => prev + item.price * item.qty, 0) *
        100
      );
    },
    goodsList() {
      return this.$store.state.goodsList;
    },
    // checkAll() {},
    changeQty() {},

    getCartData() {
      this.$request
        .post("/order/details", {
          headers: {
            Authorization: c.Authorization,
          },
          state: 0,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            const goodsLists = [data.data, ...this.$store.state.goodsList];
            this.$store.commit("updateCart", goodsLists);
          }
        });
    },
  },
  methods: {
    goHome() {
      // this.$router.replace('/home')
      this.$router.replace({
        path: "/home",
      });
    },

    clearCart(id, goodsList) {
      const newGoodsList = goodsList.filter((item) => item.id !== id);
      console.log("newGoodsList=", newGoodsList);
      this.$store.commit("updateCart", newGoodsList);

      
    },

    deleteGoods(id) {
      // console.log("id=", id);
   
      // console.log("goodsList", goodsList);
      const newGoodsList = this.$store.state.goodsList.filter((item) => item.id !== id);
      // console.log("newGoodsList=", newGoodsList);
      this.$store.commit("updateCart", newGoodsList);
      goodsList();
      // this.$request
      //   .post("/order/delect", {
      //     delectarray: id,
      //   })
      //   .then(({ data }) => {
      //     if (data.code === 200) {
      //     }
      //   });
    },

    clearAllCart() {
      const goodsList = this.$store.state.goodsList;
      const ids = this.$store.state.goodsList.id;
      console.log("id=", id);
      console.log("goodsList", goodsList);
      clearCart(id, goodsList);
      goodsList();
    },

    onSubmit() {},
  },

  created() {
    // getCartData();
  },
};
</script>
<style scoped>
.cart-page {
  padding-bottom: 30px;
}

.van-steps {
  text-align: start;
}
</style>