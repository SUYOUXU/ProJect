<template>
  <div class="mine">
    <div v-if="isLogin">
      亲爱的{{userInfo.name}}欢迎回来！
      <van-button 
      type="primary" plain 
      @click="logout">退出登录</van-button>

  <van-grid class="van-grid">
  <van-grid-item icon="pending-payment" text="待付款" />
  <van-grid-item icon="share-o" text="分享" />
  <van-grid-item icon="clock-o" text="带发货" />
  <van-grid-item icon="logistics" text="待收货" />
  <van-grid-item icon="star-o" text="待收货" />
  <van-grid-item icon="location-o" text="发货地址" />
  <van-grid-item icon="coupon-o" text="优惠卷" />
  <van-grid-item icon="cash-back-record" text="退款售后" />
</van-grid>
      
    </div>

    <div v-else>
       <h2>亲！您还未登录，请先登录</h2>
    <van-button  type="primary" plain @click="goto('/login')"
      >去登录</van-button>
    </div>


  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      // writelist: [
      //   {
      //     h1: "亲！您还没有登录，请点击登录进入",
      //   },
      // ],
      userInfo: {},
    };
  },
  components: {},
  computed: {
    isLogin() {
const id  = this.$route.params;
    console.log(id);
// return !!this.userInfo.code
if (JSON.parse(localStorage.getItem('userInfo'))) {
    this.userInfo=   JSON.parse(localStorage.getItem('userInfo'))
  return true;
}else
{
   this.userInfo=''
  return false;
}
 },
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
  
    logout() {
      //退出并删除本地储存
      this.userInfo = {};
      localStorage.removeItem("userInfo");
      this.$router.push("/Mine");
    },
  },

  created() {
    
    //添加并生成账号信息
    let userInfo = localStorage.getItem("userInfo");
    try {
      userInfo = JSON.parse(userInfo) || {};
    } catch {
      userInfo = {};
    }
    this.userInfo = userInfo;
    // console.log(userInfo);

  },


};
</script>

<style>
.van-grid{

  display: flex;
  flex:1;
}
</style>






