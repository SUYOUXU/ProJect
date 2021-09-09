<template>
  <div class="reg">
    <h1 class="h1">用户注册</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        @blur="checkUsersname"
        name="username"
        label="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        :rules="rules.password"
      />
      <van-field
        v-model="vcode"
        autocomplete="off"
        name="vcode"
        label="验证码"
        :rules="rules.vcode"
      >
        <template #extra>
          <div class="vcode" v-html="vcodeSvg" @click="getVcode"></div>
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit"
          >免费注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: "",
      vcode: "",
      vcodeSvg: "",
      rules: {
        username: [
          { required: true, message: "请填写用户名" },
          { response: true, message: "用户名已注册" },
        ],
        password: [{ required: true, message: "请填写密码" }],
        // vcode: [{ required: true, message: "请填写验证码" }],
      },
    };
  },
  methods: {
    async checkUsersname() {
      const data = await this.$request.get(
        "/user/reg?username=" + this.username
      ).then(({data})=>{
          if(data.message==="用户已注册"){
            // this.$store.dispatch('getCartlist')
            alert("用户已注册");
            this.username=""
            this.password=""
          }
          })
      //   console.log(data);
    },
    async onSubmit() {
      console.log(this.username, this.password, this.vcode);
      const { data } = await this.$request.post(
        "/user/register",
        {
          username: this.username,
          password: this.password,
          vcode: this.vcode,
        }
      );
      //跳转页面
      if (data.code === 200) {
        alert("注册成功");
        this.$router.push("/login");
      } else {
        this.$toast("验证码不正确");
      }
    },
    async getVcode() {
      const { data: data } = await this.$request.get(
        "/getCaptcha"
      );

      //   console.log(data);
      this.vcodeSvg = data;
    },
  },
  created() {
    this.getVcode();
  },
};
</script>
<style lang='scss'>
.vcode {
  width: 121px;
  height: 50px;
  overflow: hidden;
  svg {
    height: 50px;
    transform: translateX(-20px);
  }
}
h1 {
  font-family: "Times New Roman", Times, serif;
}
</style>
<style scoped>
</style>

