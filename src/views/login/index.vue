<template>
  <div>
    <div id="header" class="pct100 h30">
      <div class="w1000 auto">
        <div class="r group_r">
          <ul class="login l">
            <!-- <li>
              <a href="/member/login.shtml">登录</a>
            </li>
            <li>
              <a href="/95598/useregist/showRegisterPage">注册</a>
            </li>-->
          </ul>
          <div id="phone" class="l">
            <!-- <div class="box l">
              <a href="/common/app.shtml">网上国网</a>
            </div>-->
          </div>
          <div id="weibo" class="l">
            <!-- <a target="_blank" href="http://weibo.com/sgcc">官方微博</a> -->
          </div>
          <div id="about" class="l">
            <!-- <a target="_blank" href="/common/about95598.shtml">关于95598</a> -->
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <div id="logo_search" class="w1000 auto">
      <div class="logo l">
        <a href="http://www.95598.cn/person/index.shtml">
          <img src="/static/images/logo.png" alt="logo" />
        </a>
      </div>
      <div id="city_select" class="l">
        <a class="current">智慧食堂</a>
      </div>

      <div class="l stateTit">
        <span class="f22 fm" id="welcomeMsg">欢迎登录</span>
      </div>
      <div class="clear"></div>
    </div>
    <div class="pct100 login2">
      <div id="Carousel">
        <div class="showImg" style="display: block;">
          <img src="/static/images/loginbg2.jpg" alt />
        </div>
        <div class="showImg" style="display: none;">
          <img src="/static/images/loginbg3.jpg" alt />
        </div>
      </div>

      <div class="w1000 auto mt20 main">
        <div class="login_kuang">
          <div class="form">
            <form id="loginForm" method="post" action="/95598/userlogin/login">
              <input type="hidden" value id="returnUrl" name="url" />
              <input type="hidden" value="01" name="loginway" id="loginway" />
              <ul class="input_common">
                <li class="title">
                  <span>登录</span>
                  <span
                    style="margin-left:10px;color:#ed6c07;font-weight:bold;font-size:14px"
                    id="loginMsg"
                  ></span>
                </li>
                <li class="mb15 userName">
                  <input
                    v-model="loginForm.username"
                    name="loginName"
                    id="loginName"
                    class="h30"
                    type="text"
                    placeholder="卡号"
                  />
                  <div class="tips">卡号</div>
                </li>
                <li class="mb15 passWord">
                  <input
                    v-model="loginForm.password"
                    name="txPwd"
                    id="txPwd"
                    class="h30"
                    type="password"
                    placeholder="请输入密码"
                  />
                  <div class="tips">请输入密码</div>
                </li>

                <li class="mb10 mt10" @click="handleLogin">
                  <a class="submitBtn">登&nbsp;&nbsp;&nbsp;录</a>
                </li>
                <li style="margin-top: 10px;">
                  <!-- <span class="g7">
                    还没有账户？
                    <b>
                      <a href="/95598/useregist/showRegisterPage" class="cff8">免费注册</a>
                    </b>
                  </span>-->
                </li>

                <li
                  class="message"
                  style="margin-top: 5px;"
                >国网公司正在开展95598网站、网上国网、电e宝、e充电等线上渠道账户融合工作，实现一个账户登录多个渠道，欢迎使用体验。</li>
                <li class="mt5">
                  <span class="g7">如有问题，请拨打95598客服热线</span>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div>
        <div class="FT01 mt10">
          <p>国家电网公司 版权所有 Copyright © 2010-2015 State Grid Corporation of China (SGCC). All rights reserved</p>
          <p>
            掌上营业厅：m.95598.cn 客户服务电话：95598
            <a target="_blank" href="/common/app.shtml">手机营业厅下载</a>
          </p>
          <p>京ICP备09055871-2 | 国家电网公司客户服务中心主办</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    async handleLogin() {
      let { username, password } = this.loginForm;
      username = username.trim();
      password = password.trim();
      if (password != "" && password != "") {
        this.$store
          .dispatch("LoginByUsername", this.loginForm)
          .then(() => {
            this.loading = false;
            window.localStorage.setItem("username", this.loginForm.username);
            this.$router.push({ path: "/" });
          })
          .catch(error => {
            this.loading = false;
            this.$message({
              message: error,
              type: "warning"
            });
          });
      } else {
        return this.$message({
          message: `登录信息不完整`,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.loginForm.username = window.localStorage.getItem("username") || "";
  }
};
</script>
<style>
@import url("./reset.css");
@import url("./member.css");
</style>