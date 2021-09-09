<template>
  <div class="goodslist">
    <!-- 导航列表 -->
         <van-row 
            type="flex"
            justify="space-between"
            style="flex-wrap:nowrap"
            gutter="10"
        >
            <van-col class="van-col" style="width:100px;margin-left:-15px;">
              <div class="aaa"></div>
                <van-sidebar  class="van-sidebar"
                    v-model="typeid"
                    @change="changeCategory"
                >
                    <van-sidebar-item
                        v-for="item in result"
                        :key="item._id"
                        :title="item.typename"
                    />
                </van-sidebar>
            </van-col>
            <!-- 数据列表 -->
            <van-col>
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="loadMore"
                    offset="50" 
                >
                    <van-row gutter="10">
                        <van-col
                            span="12"
                            v-for="(item,idx) in goodslist"
                            :key="item._id+idx"
                            @click="goto('/goods/'+item.id)"
                        >
                            <van-image
                                width="100"
                                height="100"
                                :src="item.imgurl"
                            />
                            
                            <h4 class="h">{{item.name}}</h4>
                            <div class="price"><span>￥{{item.price}}</span></div>
                        </van-col>
                    </van-row>
                </van-list>
                </van-pull-refresh>
            </van-col>
        </van-row>

  </div>
</template>

<script> 
export default {
  name: 'Discover',
  props:[],
  data(){

      return{
      typeid:0,
      result:[],
      loading :false,
      finished:false,
      goodslist:[],
      page:1,
      refreshing:false

      }
  },

created(){

  this.getCategory()

},

  methods: {


goto(path){
  console.log(path);
this.$router.push(path)
},

onRefresh(){
    this.finished=false
    this.loading=true
    this.goodslist=[]
    this.page=1
    this.getData()

},
    //获取列表文本内容
async getCategory(){
      const {data:{data:result}}= 
      await this.$request.get('/good/goodlist/')
      console.log('result=',result);
      this.getData(result[this.typeid])
     console.log(result[this.typeid]);
        this.result=result
        console.log('this.result',this.result);
    },
//封装拿数据函数
async getData(a){
  if (a===undefined) {
    a=this.result[this.typeid]
  }

  this.loading= true;
 const {data:{data:{data:data}}}=await this.$request.get('/good/list/',{
      params:{
        type:a.typename,
        //  total:false,
          page:this.page, 
      }
  
    })
    
      console.log(data);
      this.goodslist.push(...data)
      console.log('this.goodslist',this.goodslist);
      console.log('this.goodslist=',this.goodslist.length);
      this.loading=false 
      this.refreshing=false;
      console.log(data.total);
      this.finished=this.goodslist.length>=data.total

      console.log('this.finished=', this.finished);
      console.log(this.goodslist);
},

//点击列表获取数据
 changeCategory(index){
  // console.log(index);
    const currentCategory=this.result[index];
    this.goodslist=[]; 
    this.page=1;
    console.log('currentCategory=',currentCategory);
    this.getData(currentCategory)
    // console.log(category);
    
},
    loadMore(){
      console.log("loadMove");
      if (this.result.length>0) {
        
          setTimeout(() => {
             this.getData()
               this.page++;
          }, 1000);
           
           
                
            console.log(123123);
      }
     
    }
  }
}
</script>

<style scoped>

/* .goodslist h4 {
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  max-height: 60px;
} */
 .h{
 height: 70px;
 line-height: 25px;
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 2;
 overflow: hidden;
 margin-right: 2px;
   font-size: 14px;
}
  .van-sidebar{

    position: fixed;
    top: 12px;
    left: 5px;
  }

.aaa{
  width: 80px;
  height: 50px;
}

</style>
