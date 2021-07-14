<template>
  <div class="home">
<van-search
  v-model="value"
   class="van-search"
  show-action
  
  placeholder="请输入搜索关键词"
  @search="seachItem"
  background="rgb(204, 73, 73)"
>
  <template #action>
    <div @click="seachItem">搜索</div>
  </template>
</van-search>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 动态路由--》-->
      <van-row type="" class="van-row-a">
        <van-col
          span="12"
          v-for="item in goodslist"
          :key="item._id"
          @click="goto('/goods/' + item.id)"
        >
          <!-- <van-row type="">
  <van-col span="12" 
  v-for="item in goodslist" 
  :key="item._id" 
  @click="goto(item._id)"> -->

          <van-image width="100" height="100" :src="item.imgurl" />
          <h5 class="h">{{ item.name }}</h5>
          <div class="price">
            <!-- <del>￥{{ item.price }}</del -->
            <span>￥{{ item.price }}</span>
          </div>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      finished: false,
      goodslist: [],
      value:""
    };
  },

  methods: {
    onLoad() {},

    //用名字传参

    //搜索框回车事件
    async seachItem() {
      const {data:{data:{data}}} = await this.$request.get("/good/list",{

          params:{
            name:this.value,

          }

      });
   
      console.log("this.value=",this.value);
      console.log("data=",data);
      this.goodslist=data; //添加到VM层

      //清空输入框
      
 
    },
    //动态路由
    goto(path) {
      this.$router.push(path);
    },
    // this.$router.push({
    //   // path:'/goods'可用跳转路径
    //   name:'Goods',
    //   query:{id}
    //   //parmas：{id}
    // })
  },
  async created() {
    const {
      data: {
        data: { data: goodslist },
      },
    } = await this.$request.get("/good/list");
    // , {
    // params: {
    //   total: false,
    // },
    // });

    this.goodslist = goodslist;
    console.log("goodslist=", goodslist);
  },

  // components: {

  // }
};
</script>


<style scoped>
.h {
  height: 70px;
  line-height: 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 0px;
}

.van-row-a {
  margin-top: 60px;
}

.van-search {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
}
</style>


