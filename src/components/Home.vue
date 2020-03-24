<template>
  <el-container class="home-container">
    <!--头-->
    <el-header>
      <div>
        <img src="../assets/gamenew.png" class="headerImg" alt="">
        <span>EPCC-7</span>
      </div>
      <el-button type="info" @click="logout">Log Out</el-button>
    </el-header>

    <!--页面-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <!--侧边栏菜单区域-->
        <el-menu background-color="rgb(46, 48, 59)" text-color="#dbdbdb" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span>账户管理</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$router.push('/login');
      }
    },
  }
</script>

<style lang='less' scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: rgb(49, 49, 49);
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    align-items: center;
    color: #dbdbdb;
    font-size: 40px;

    >div {
      height: 100%;
      align-items: center;

      img {
        height: 100%;
      }

      span {
        position: fixed;
        margin-left: 5px;
        margin-top: 8px;
      }
    }
  }

  .el-aside {
    background-color: rgb(46, 48, 59);
  }

  .el-main {
    background-color: #EAEDF1;
  }
</style>