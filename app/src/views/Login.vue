<template>
  <div class="login">
    <h1>用户登录</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
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
        autocomplete="off"
        v-model="vcode"
        name="vcode"
        label="验证码"
        :rules="rules.vcode"
      >
        <template #extra>
          <div class="vcode" v-html="vcodeSvg" @click="getVcode"></div>
        </template>
      </van-field>

      <van-field name="checkbox">
        <template class="template" #input>
          <!-- <van-checkbox v-model="mdl" shape="square">记住密码</van-checkbox> -->
          <van-button class="lo" native-type="submit" @click="goto('/reg')"
            >注册</van-button
          >
          <van-button class="re" native-type="submit" @click="reset()"
            >重置</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>


<script>
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      vcode: "",
      vcodeSvg: "",

      // mdl: true,
      rules: {
        username: [{ required: true, message: "请填写用户名" }],
        password: [{ required: true, message: "请填写密码" }],
        // vcode: [{ required: true, message: "请填写验证码" }],
      },
    };
  },

  methods: {
    goto(path) {
      this.$router.push(path);
    },
    reset() {
      (this.username = ""), (this.password = ""), (this.vcode = "");
    },

    // 登录
    async onSubmit() {
      console.log(this.username, this.password, this.vcode);
      const { data } = await this.$request.post("/user/login", {
        // headers:{ 
        // Authorization:c.Authorization,},
        username: this.username,
        password: this.password,
        vcode: this.vcode,
        // mdl: this.mdl,
      });
      console.log(data);

      if (data.code === 200) {
        // 保存用户信息到本地
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        const { target = "/mine" } = this.$route.query;
        this.$router.replace(target);

        // ,{
        //     params:{
        //       name:'/Mine',
        //       username: this.username

        //       }

        // }
      } else if (data.code === 400) {
        this.$toast("验证码不正确");
      } else {
        this.$toast("用户名或密码错误");
      }
      // console.log('data=',data);
    },

    // 获取验证码
    async getVcode() {
      const { data } = await this.$request.get("/getCaptcha");

      this.vcodeSvg = data;
    },
  },
  created() {
    this.getVcode();
  },
};
</script>

<style>
.van-field__control {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
}
.lo {
  background-color: rgb(87, 197, 216);
  color: white;
}
.re {
  background-color: rgb(243, 231, 65);
}
</style>

