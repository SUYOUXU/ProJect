
<template>
    
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/computer' }"
        >电脑</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/phone' }"
        >手机</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/jewelry' }"
        >珠宝</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/furniture' }"
        >家具</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/TV' }">电视</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 相机列表 -->
    <el-card>
      <el-table
        :data="CameraList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="gender" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="商品介绍" width="600">
        </el-table-column>
        <el-table-column width="300" prop="rfe" label="图片"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 拿到本行的数据修改 -->
            <!-- @click="updateUserDialog(scope.row)" -->
            <el-button
              size="mini"
              type="success"
              @click="updateUserDialog(scope.row)"
              >修改</el-button
            >
            <el-button @click="deluser(scope.row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>

        <!-- 分页 -->
         <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrrntChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="queryInfo.pagesize"
        :total="total"
        layout="total,sizes, prev, pager, next,jumper"
      >
      </el-pagination>
      </el-table>
    </el-card>
  </div>
</template>
<style >
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<script>
export default {
  name: "GoodsList",
  props: [],
  components: {},
  data() {
    return {
      page: 1,
      CameraList: [],
       queryInfo: { id: 0, pagenum: 1, pagesize: 3, query: "" },
       total:0
    };
  }, //方法 函数写这里
  methods: {
    async getCamera() {
      let res = await this.$request.get(this.$baseUrl + "/good/list", {
        params: {
          type: "相机",
        },
      });
      console.log("相机种类请求回来的数据", res.data);
      this.CameraList = res.data;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 11 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 != 0) {
        return "success-row";
      }
      return "";
    },
    // newsize该形参是改变当前页面显示条数，所要改变成的数值
    // 传进来动态改变pagesize
    handleSizeChange(newsize) {
      // this.queryInfo.pagesize = newsize;
      // 重新调用渲染
      // this.getUserList();
    },
    handleCurrrntChange(newpage) {
      // this.queryInfo.pagenum = newpage;
      // this.getUserList();
    },
  }, //计算属性
  computed: {}, //侦听器
  watch: {}, //过滤器
  filters: {}, //以下是生命周期 //组件创建之前
  beforeCreate() {}, //组件创建之后
  created() {
    this.getCamera();
  }, //页面渲染之前
  beforeMount() {}, //页面渲染之后
  mounted() {}, //页面视图数据更新之前
  beforeUpdate() {}, //页面视图数据更新之后
  updated() {}, //页面销毁之前
  beforeDestroy() {}, //页面销毁之后
  destroyed() {},
};
</script>
<style  lang='scss' scoped>
/*.bottom {
    margin-top: 13px;
    line-height: 12px;
  }*/

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-card {
  margin: 3px;
}
</style>
