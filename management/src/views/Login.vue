
<template>
    
  <div class="login">
    <div class="loginBox">
      <el-form
        :rules="rules"
        class="loginForm"
        label-width="80px"
        ref="loginformref"
        :model="formdata"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="formdata.username"
            prefix-icon="iconfont icon-yonghuming"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="formdata.password"
            prefix-icon="iconfont icon-mima"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="buttons">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
          
  </div>
</template>

<script>
export default {
  name: "Login",
  props: [],
  components: {},
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 18,
            message: "长度在3到10个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 18,
            message: "长度在3到18个字符",
            trigger: "blur",
          },
        ],
      },
    };
  }, //方法 函数写这里
  methods: {
    // 重置
    reset() {
      console.log("reset");
      console.log("loginformref", this.$refs.loginformref);
      this.$refs.loginformref.resetFields();
    },
    // 验证该表单是否通过
    login() {
      this.$refs.loginformref.validate(async (valid) => {
        // console.log(valid);
        if (!valid) {
          // element ui 的提示组件
          this.$message({
            showClose: true,
            message: "请输入正确的用户名和密码",
            type: "error",
          });

          return;
        }

        const res = await this.$request.post(this.$baseUrl + "/user/login", {
          username: this.formdata.username,
          password: this.formdata.password,
        });
        console.log("登录后返回的信息", res);
        console.log(this.formdata.username);
        console.log(this.formdata.password);
        // 判断登录是否成功

        if (res.data.code !== 200) {
          this.formdata.username = "";
          this.formdata.password = "";
          alert("登录失败");
          return;
        }
        // 登录成功后
        this.$message({
          message: "登录成功",
          type: "success",
        });
        // 登录成功后存储token
        // sessionStorage是会话级别的存储
        // console.log(res.data.data.Authorization);
        window.sessionStorage.setItem("token", res.data.data.Authorization);
        // console.log(res.data.data.Authorization);

        // 再跳到，登录成功之后呈现的页面
        this.$router.push("/home");
      });
    },
  }, //计算属性
  computed: {}, //侦听器
  watch: {}, //过滤器
  filters: {}, //以下是生命周期 //组件创建之前
  beforeCreate() {}, //组件创建之后
  created() {}, //页面渲染之前
  beforeMount() {}, //页面渲染之后
  mounted() {}, //页面视图数据更新之前
  beforeUpdate() {}, //页面视图数据更新之后
  updated() {}, //页面销毁之前
  beforeDestroy() {}, //页面销毁之后
  destroyed() {},
};
</script>


<style  lang='scss'scoped >
.login {
  background-color: rgb(0, 218, 218);
  height: 100vh;
  .loginBox {
    width: 450px;
    height: 350px;
    background-color: #ffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: url(https://z3.ax1x.com/2021/06/14/27XJzQ.gif);

    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      background-color: #ffffff;
    }

    .loginForm {
      position: absolute;
      bottom: 36px;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;

      .buttons {
        display: flex;
      }
    }
  }
}
</style>
