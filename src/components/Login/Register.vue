<template>
  <div class="parent" id="register">
    <div class="div1">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="color:#ffffff">
          <i class="el-icon-s-custom"></i><span >注册</span>
        </div>

        <div style="margin: 30px;"></div>


        <el-form  :model="formLabelAlign">
          <el-form-item class="lazy_input">
            <el-input v-model="formLabelAlign.email" placeholder="请输入您的邮箱"></el-input>
          </el-form-item>
          <el-form-item class="lazy_input">
            <el-input v-model="formLabelAlign.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item class="lazy_input">
            <el-input v-model="formLabelAlign.acc" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item class="lazy_input">
            <el-input v-model="formLabelAlign.pwd" placeholder="请输入您的密码" show-password></el-input>
          </el-form-item>
          <el-form-item class="lazy_input">
            <el-input v-model="formLabelAlign.pwd_t" placeholder="请再次输入您的密码" show-password></el-input>
          </el-form-item>
          <el-form-item id="verify">

            <el-row>
              <el-col :span="10">
                <el-input v-model="formLabelAlign.verify" placeholder="验证码" style="display:inline-block" @keyup.enter.native="sign"></el-input>
              </el-col>

              <el-col :offset="2" :span="12">
                <el-button @click="sendMsg" :disabled="isDisabled">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{buttonName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </el-button>
              </el-col>

            </el-row>
          </el-form-item>


          <div style="margin: 20px;"></div>

          <center>
            <el-button type="danger" @click="register">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-button>
          </center>
          <!-- TODO:用户协议？ -->
          <!-- <center><el-link type="info">用户协议</el-link></center> -->



        </el-form>

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单
      labelPosition: 'right',
      formLabelAlign: {
        email: '',
        name: '',
        acc: '',
        pwd: '',
        pwd_t: '',
        verify: '',
      },
      //验证码按钮
      buttonName: '获取验证码',
      isDisabled: false,
      time: 60
    };
  },
  methods: {
    //发送验证码
    sendMsg() {
      let data = new FormData();
      data.append('email', this.formLabelAlign.email);
      this.$axios.post(this.$store.state.url+'verify/', data).then(res => {
        console.log(res);
        if(res.status === 200) {
          this.$message({
            message: '验证码已发送',
          });
        } else {
          this.$message.error(res.status+'');
        }
      })

      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function() {
        me.buttonName = '（' + me.time + '秒）后重新发送';
        --me.time;
        if(me.time < 0) {
          me.buttonName = "重新发送";
          me.time = 10;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);



    },
    register() {
      if(this.formLabelAlign.pwd !== this.formLabelAlign.pwd_t) {
        this.$message.error('两次密码输入不一致！');
      }

      let data = new FormData();
      // data.append('email', this.formLabelAlign.email);
      data.append('password', this.formLabelAlign.pwd);
      data.append('account', this.formLabelAlign.acc);
      data.append('email', this.formLabelAlign.email);
      data.append('name', this.formLabelAlign.name);
      data.append('verifyCode', this.formLabelAlign.verify);

      console.log(data);

      this.$axios.post(this.$store.state.url+'register/', data).then(res => {
        console.log(res);
        if(res.data === 'success') {
          this.$message({
            message: '注册成功',
          });
          this.$router.push({path:'/'})
        } else {
          this.$message.error(res.data);
        }
      })
    }
  }
}
</script>

<style>
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 0.8fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
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

#register .el-card__header {
  padding: 18px 20px;
  border-bottom: 1px solid #EBEEF5;
  /*border-bottom: 1px solid #ff551a;*/
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #ff551a;
}

.lazy_input {
  padding: 0 8rem 0 8rem;
}

#verify {
  padding: 0 8rem 0 8rem;
}
</style>
