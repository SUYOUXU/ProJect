
<template>
    
  <div>
        
    <h1>Jewelry</h1>
      
  </div>
</template>

<script>
export default {
  name: "Jewelry",
  props: [],
  components: {},
  data() {
    return {
      page: 1,
    };
  }, //方法 函数写这里
  methods: {
    async goodslist() {
      let res = await this.$request.get(this.$baseUrl + "/good/goodlist");
      console.log("请求回来的商品管理列表页", res);
    },
  }, //计算属性
  computed: {}, //侦听器
  watch: {}, //过滤器
  filters: {}, //以下是生命周期 //组件创建之前
  beforeCreate() {}, //组件创建之后
  created() {
    this.goodslist();
  }, //页面渲染之前
  beforeMount() {}, //页面渲染之后
  mounted() {}, //页面视图数据更新之前
  beforeUpdate() {}, //页面视图数据更新之后
  updated() {}, //页面销毁之前
  beforeDestroy() {}, //页面销毁之后
  destroyed() {},
};
</script>


<style  >
</style>
