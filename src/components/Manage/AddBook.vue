<template>
  <div id="addBook" style="width: 90%;">

    <div>
      <span>添加图书</span>
      <span style="font-size: 15px;color: red;">(带*的为必填项)</span>
    </div>
    <el-form style="margin-top: 20px;width: 80%;display: flex;" :rules="rules" :model="bookInfo">
      <div style="width: 50%;">

        <el-form-item prop="name" label="书名">
          <el-input v-model="bookInfo.name" placeholder="请输入书名："></el-input>
<!--          <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item prop="price" label="价格">
          <el-input v-model="bookInfo.price" placeholder="请输入价格："></el-input>
<!--          <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item prop="inventory" label="库存量">
          <el-input v-model="bookInfo.inventory" placeholder="请输入库存量："></el-input>
<!--          <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item label="种类">
          <el-select v-model="bookInfo.bookClass" placeholder="请选择书的种类：">
            <el-option v-for="item in classArr" :label="item" :value="item" :key="item"></el-option>
          </el-select>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="bookInfo.writer" placeholder="请输入作者："></el-input>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="bookInfo.publisher" placeholder="请输入出版社："></el-input>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item label="出版日期">
          <el-date-picker type="date" v-model="bookInfo.publishTime" placeholder="请选择出版日期"></el-date-picker>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item label="评价等级">
          <el-select v-model="bookInfo.commentLevel" placeholder="请选择评价等级（0-5）：">
            <el-option v-for="item in new Array(6).keys()" :label="item" :value="item" :key="item"></el-option>
          </el-select>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea" v-model="bookInfo.briefIntro" placeholder="请输入简介："
            style="width: 90%;" maxlength="20" show-word-limit
            resize="none" :rows="4"
          ></el-input>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>

      </div>

      <div style="width: 50%;">

        <el-form-item>
          <div>
            <span>上传图书封面图片(*.jpg/*.png)</span>
            <span
              style="margin-left:10px;color: #6084ff;text-decoration-line: underline;cursor: pointer;"
              v-if="bookInfo.coverFile !== ''" @click="bookInfo.coverFile=''"
            >删除</span>
          </div>

          <div>

            <input type="file" @change="upload" accept=".jpg,.png">
            <img :src="bookInfo.coverFile? bookInfo.coverFile : defaultUrl" style="width: 200px;height: 200px;">
          </div>

          <!--        <span style="color: red;">*</span>-->
        </el-form-item>
        <el-form-item>
          <div>
            <div>
              <span>上传电子书(*.pdf/*.txt)</span>
              <span
                style="margin-left:10px;color: #6084ff;text-decoration-line: underline;cursor: pointer;"
                v-if="bookInfo.eBookFile !== ''" @click="bookInfo.eBookFile=''"
              >删除</span>
            </div>
            <input type="file" @change="upload" accept=".txt,.pdf">
          </div>
          <!--        <span style="color: red;">*</span>-->
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitAddAction">添加图书</el-button>
        </el-form-item>
        <div v-if="submitted" style="color: red;font-weight: 600;margin: 20px 0 0 0;">页面会在{{countDown}}秒后自动刷新</div>


      </div>




    </el-form>


  </div>
</template>

<script>
import util from "../../utils/util";

export default {
  name: "AddBook",
  data(){
    return{
      bookInfo: {
        name: '',
        price: '',
        salesPerMonth: '',//可选
        publishTime: '',
        publisher: '',
        commentLevel: '',//可选
        inventory: '',//库存
        briefIntro: '',
        bookClass: '',//选择
        coverFile: '',
        writer: '',
        eBookFile: '',

      },
      classArr: [
        '儿童类',
        '科学类',
        '英语类',
        '教材类',
      ],
      rules: {
        name: [{
          required: true,
          message: '书名不能为空',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '价格不能为空',
          trigger: 'blur'
        }],
        inventory: [{
          required: true,
          message: '库存量不能为空',
          trigger: 'blur'
        }],



      },
      fileList: [],
      uploadImgUrl: '',
      defaultUrl: '',
      submitted: false,
      countDown: 5,



    }
  },
  methods: {
    upload(e){
      console.log(e.currentTarget.files[0]);
      let file = e.currentTarget.files[0];
      if(file === undefined) return;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);

      reader.onload = e => {
        console.log(e);
        if(file.type === 'image/jpeg' || file.type === 'image/png'){
          that.bookInfo.coverFile = e.target.result;
        } else if(file.type === 'application/pdf' || file.type === 'text/plain'){
          that.bookInfo.eBookFile = e.target.result;
        }
      }

    },
    submitAddAction(){
      console.log(this.bookInfo);
      if(this.bookInfo.name==='' || this.bookInfo.price==='' || this.bookInfo.inventory==='') {
        this.$message.warning('请填写必填项！');
        return;
      }

      let data = new FormData();
      for(let key in this.bookInfo){
        if(this.bookInfo[key] === '') {
          continue;
        }
        if(key === 'bookClass'){
          data.append(key, util.hashBackBookClass(this.bookInfo[key]));
        } else if(key==='publishTime') {
          if(this.bookInfo[key]==='') {
            continue;
          } else {
            data.append(key, util.formatDate(this.bookInfo[key]))
          }
        }
        else {
          data.append(key, this.bookInfo[key]);
        }
      }
      this.$axios({
        url: this.$store.state.url + 'addBook/',
        method: 'POST',
        data: data,
      }).then(res => {
        console.log(res);
        if(res.status === 200){
          this.$message.success('添加图书成功！');
          this.submitted = true;
          setTimeout(() => {
            location.reload();
          }, 5000);
          setInterval(() => {
            this.countDown--;
          }, 1000)
        } else {
          this.$message.error('添加图书失败');
        }

      })

    },


  },
  created() {

  }
}
</script>

<style scoped>
#addBook .el-form .el-form-item .el-input{
  width: 90%;
}

</style>
