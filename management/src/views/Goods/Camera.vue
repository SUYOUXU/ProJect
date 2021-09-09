
<template>
    
  <div>
    <!--面包屑导航区 -->
    <!-- <el-bareadcrumb> 面包屑导航包裹的标签 该标签里面自带有插槽 也有写好的样式 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"> 首页 </el-breadcrumb-item>
      <el-breadcrumb-item> 用户管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 用户列表 </el-breadcrumb-item>
    </el-breadcrumb>

    <!--  面包屑后的卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入商品名查询"
            :clearable="true"
            @clear="getUserList"
            v-model="queryInfo.type"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 4份 -->
        <el-col :span="4">
          <el-button @click="switch2" type="primary">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表渲染 element ui的表单使用 -->
      <!-- <el-table> 里面是自带有v-for循环的 -->

      <el-table :data="userlist" style="width: 100%">
        <!-- type="index" 指的是该序号排列按index来做 -->
        <el-table-column label="序号" type="index" width="80">
        </el-table-column>
        <el-table-column label="商品名称" prop="gender" width="100">
        </el-table-column>
        <el-table-column label="商品介绍" prop="name" width="600">
        </el-table-column>
        <el-table-column label="图片" prop="Email" width="200">
          <template slot-scope="scope">
            <img
              :src="scope.row.imgurl"
              alt=""
              style="width: 80px; height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" width="180">
        </el-table-column>

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
      </el-table>
      <!-- @size-change="handleSizeChange"每页的条数改变就会被调用 -->
      <!-- @current-change="handleCurrrntChange"当前页面改变就会被调用 -->
      <!-- :current-page="queryInfo.pagenum"当前的pagenum -->
      <!-- :page-sizes="[100, 200, 300, 400]" 可以选择每页都少条数据 -->
      <!-- :page-size="100"当前情况下每页100条 -->
      <!-- :total="400"数据总数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrrntChange"
        :current-page="queryInfo.page"
        :page-sizes="[3, 5, 6]"
        :page-size="queryInfo.size"
        :total="total"
        layout="total,sizes, prev, pager, next,jumper"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加商品和商品信息"
      width="50%"
      :visible.sync="adduserdialogVisible"
      @close="addUserDialog"
    >
      <el-form ref="addFormRef" :model="addForm" lable-width="80px">
        <el-form-item label="商品名称" prop="gender">
          <el-input v-model="addForm.gender"></el-input>
        </el-form-item>

        <el-form-item label="商品介绍" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>

        <el-form-item label="图片地址" prop="imgurl">
          <el-input v-model="addForm.imgurl"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"></span>
      <el-button @click="adduserdialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addUserEnter">确定</el-button>
    </el-dialog>
    <!-- 修改用户的dialog框 -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="updateUserDialogVisible"
      width="40%"
      @close="updateDialogClosed"
    >
      <el-form ref="updateFormRef" :model="updateForm" label-width="80px">
        <el-form-item label="商品名称" prop="gender">
          <el-input v-model="updateForm.username"></el-input>
        </el-form-item>

        <el-form-item label="商品介绍" prop="name">
          <el-input v-model="updateForm.password" ></el-input>
        </el-form-item>

        <el-form-item label="图片" prop="imgurl">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="updateForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterupdateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  props: [],
  components: {},
  data() {
    // 自定义校验手机号
    var checkmobile = (rule, value, callback) => {
      const regMobile = /^1[3456789]\d{9}$/;
      if (regMobile.test(value)) {
        // 合法手机
        callback();
      }
      callback(new Error("请输入合法的手机号"));
    };

    // 自定义验证邮箱号
    var checkEmail = (rule, value, callback) => {
      const regEmail =
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        // 合法手机
        callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };

    return {
      // query:'' 是我们还可以传递其他信息 没有就不用写
      queryInfo: { page: 1, size: 6, type: "" },
      userlist: [],
      total: 0,
      adduserdialogVisible: false,
      updateUserDialogVisible: false,

      addForm: {
        gender: "",
        name: "",
        imgurl: "",
        price: "",
        type: 0,
        // page:1,
        // size:3
        type:0
      },
      updateForm: {
        gender: "",
        imgurl: "",
        name: "",
        price: "",
        id: "",
      },
    };
  }, //方法 函数写这里
  methods: {
    async getUserList() {
      let res = await this.$request.get(this.$baseUrl + "/good/list", {
        params: this.queryInfo,
      });
      console.log("商品列表请求回来的数据", res);
      this.userlist = res.data.data.data;
      this.total = res.data.data.total;
      console.log("请求回来的总数", res.data.data.total);
    },
    // newsize该形参是改变当前页面显示条数，所要改变成的数值
    // 传进来动态改变pagesize
    handleSizeChange(newsize) {
      this.queryInfo.size = newsize;
      console.log(newsize);
      // 重新调用渲染
      this.getUserList();
    },
    handleCurrrntChange(newpage) {
      this.queryInfo.page = newpage;
      this.getUserList();
    },

    async search() {
      const res = await this.$request.get(this.$baseUrl + "/good/list", {
        params: this.queryInfo,
      });
      console.log("按种类请求回来的数据", res);
      this.userlist = res.data.data.data;
      console.log(this.queryInfo);
    },
    switch2() {
      this.adduserdialogVisible = true;
    },

    // 按下确定添加用户后 调用的函数  查看验证是否通过
    addUserEnter() {
      //  queryInfo: { id: 0, pagenum: 1, pagesize: 3, query: "" }
      var pagenumval = this.queryInfo.page;
      var page = "page";
      this.addForm[page] = pagenumval;

      var pagesizeval = this.queryInfo.size;
      var size = "size";
      this.addForm[size] = pagesizeval;

      // console.log(this.$refs.addFormRef);
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$request.post(
            this.$baseUrl + "/good/updategood",
            {
              params: this.addForm,
            }
          );
          console.log("添加商品请求回来的信息", res);
          this.userlist = res.data.data.data;
          this.total = res.data.data.total;
          this.adduserdialogVisible = false;
        } else {
          console.log("error 添加用户");
          return false;
        }
      });
    },

    // 添加用户后 对话框关闭的时 调用该函数 该函数会用本身自有的resetFields方法清空掉 我们添加时在input框输入的数据
    addUserDialog() {
      this.$refs.addFormRef.resetFields();
    },
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields();
    },
    // 修改用户时被调用的函数
    updateUserDialog(userinfo) {
      this.updateUserDialogVisible = true;
      // 下面是为了点击修改的时候，把原来的数据显示在input框中
      this.updateForm.id = userinfo.id;
      this.updateForm.gender = userinfo.gender;
      this.updateForm.name = userinfo.name;
      this.updateForm.imgurl = userinfo.imgurl;
      this.updateForm.price = userinfo.price;
    },

    enterupdateUser() {
      var pagenumval = this.queryInfo.page;
      var page = "page";
      this.addForm[page] = pagenumval;

      var pagesizeval = this.queryInfo.size;
      var size = "size";
      this.addForm[size] = pagesizeval;

      this.$refs.updateFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.get("/api/deleteuser", {
            params: this.updateForm,
          });
          console.log("res", res);

          this.userList = res.data.data;
          this.total = res.data.total;
          this.updateUserDialogVisible = false;
        }
      });
    },
    // 删除函数时被调用的函数
    async deluser(id) {
      var res = await this.$confirm("确定永久删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => {
        alert("错误操作", err);
      });

      if (res != "confirm") {
        this.$message, info("已取消删除");
        return;
      }

      this.queryInfo.id = id;
      const resdata = await this.$http.get("/api/deleteuser", {
        params: this.queryInfo,
      });

      this.$message.info("删除成功");
      this.userList = resdata.data.data;
      this.total = resdata.data.total;
      this.getUserList();
    },
  }, //计算属性
  computed: {}, //侦听器
  watch: {}, //过滤器
  filters: {}, //以下是生命周期 //组件创建之前
  beforeCreate() {}, //组件创建之后
  created() {
    this.getUserList();
  }, //页面渲染之前
  beforeMount() {}, //页面渲染之后
  mounted() {}, //页面视图数据更新之前
  beforeUpdate() {}, //页面视图数据更新之后
  updated() {}, //页面销毁之前
  beforeDestroy() {}, //页面销毁之后
  destroyed() {},
};
</script>

<style  lang='scss'  scoped >
.el-card {
  margin-top: 25px;
  box-shadow: 0 1px 1px #353333;
}

.el-breadcrumb {
  font-size: 16px;
}
</style>