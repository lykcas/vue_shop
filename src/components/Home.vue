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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu background-color="rgb(46, 48, 59)" text-color="#dbdbdb" active-text-color="#409EFF"
          :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true"
          :default-active="activePath">

          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
              @click="saveState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
            <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
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
      <el-main>
        <!-- 路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        // 左侧菜单数据
        menulist: [],
        iconsObj: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        },
        // 是否折叠
        isCollapse: false,
        // 被激活的链接地址
        activePath: ''
      }
    },

    created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },

    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      // 获取所有菜单，并存入list menulist里
      async getMenuList() {
        const { data: res } = await this.$http.get('menus')
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
      },
      // 点击按钮以控制侧边栏的收放
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      // 保存链接的激活状态
      saveState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
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

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: rgb(67, 68, 78);
    font-size: 10px;
    line-height: 24px;
    color: #dbdbdb;
    text-align: center;
    /* letter-spacing: 0.2em; */
    cursor: pointer;
  }
</style>
