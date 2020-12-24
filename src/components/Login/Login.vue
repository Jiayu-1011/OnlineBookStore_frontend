<template>
  <div class="parent">
    <div class="div1">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="color:#ffffff">
          <i class="el-icon-s-custom"></i><span>登录</span>
        </div>
        <div style="margin: 30px;"></div>
        <el-form :model="formLabelAlign" :rules="rules">
          <el-form-item class="lazy_input" prop="sid">
            <el-input v-model="formLabelAlign.acc" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item class="lazy_input" prop="pwd">
            <el-input v-model="formLabelAlign.pwd" placeholder="请输入您的密码" show-password
                      @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" style="padding: 0 0 0 8rem;">记住我</el-checkbox>
          <el-link type="info" :underline="false" style="padding: 0 8rem 0 0;float: right" href="/login/register">没有账号？现在注册</el-link>
          <div style="margin: 40px;"></div>
          <center>

            <el-button type="success" @click="login">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-button>
          </center>




        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        acc: '',
        pwd: '',
      },
      checked: false,
      rules: {
        acc: [{
          required: true,
          message: '账号不能为空'
        }],
        pwd: [{
          required: true,
          message: '密码不能为空'
        }]
      }
    };
  },
  methods: {
    login() {
      if (this.formLabelAlign.acc === '' || this.formLabelAlign.pwd === '') {
        this.$message.error('请完整填写表单!');
        return;
      }

      let data = new FormData();
      data.append('account', this.formLabelAlign.acc);
      data.append('password', this.formLabelAlign.pwd);
      this.$axios.post(this.$store.state.url + 'login/', data).then(res => {
        console.log(res);
        if(res.data === 'right'){
          this.$message.success('登录成功！');

          this.$router.push({path: '/home'})

          this.$store.commit('setIdentity', '管理员');
        } else if(res.data === 'wrong') {
          this.$message.error('密码错误！')
        } else {
          this.$message.error('此账号不存在！')
        }

      })
    }
  },
  created: function () {
    console.log(document.cookie);
  }
}
</script>

<style>
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
}

.div1 {
  grid-area: 2 / 2 / 5 / 4;
}

.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 8rem;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}

.el-card__header {
  padding: 18px 20px;
  border-bottom: 1px solid #EBEEF5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #6084ff;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.lazy_input {
  padding: 0 8rem 0 8rem;
}

.el-button--success{
  background-color: #6084ff;
  border-color: #6084ff;
}
</style>
