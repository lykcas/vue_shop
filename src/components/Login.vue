<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--The login form-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- Username -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- Password -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- Button -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Data binding
      loginForm:{
        username: 'admin',
        password:'123456'
      },
      // Validation rules for the login form
      loginFormRules:{
        username:[
          { required: true, message: 'Please enter a user name', trigger: 'blur' },
          { min: 3, max: 10, message: 'The length ranges from 3 to 10 characters', trigger: 'blur' }
        ],
        password:[
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 6, max: 15, message: 'The length ranges from 6 to 15 characters', trigger: 'blur' }
        ]      
      }
    };
  },

  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      console.log(this);
      this.$refs.loginFormRef.resetFields();
    },

    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const {data: res} = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error('Login Failed');
        this.$message.success('Login Success');
        // After successful login, save the token
        window.sessionStorage.setItem('token', res.data.token);
        // After successful login, jump to the '/home' page
        this.$router.push('/home');
      });
    }
  },
  
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}




</style>