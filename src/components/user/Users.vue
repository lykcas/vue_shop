<template>

  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <!-- 搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域-->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <!--索引列-->
        <el-table-column label="姓名" prop="username">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="电话" prop="mobile">
        </el-table-column>
        <el-table-column label="角色" prop="role_name">
        </el-table-column>
        <!-- 状态按钮 -->
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 编辑、删除 、权限按钮 -->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <!-- 这是添加用户弹出的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="95px" >
          <el-form-item label="Username" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>

</template>

<script>
  export default {

    data() {
      return {
        // 获取用户列表参数
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 5
        },
        userlist: [],
        total: 0,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 通过这个表单，将新用户的数据进行添加
        addForm: {
          username: ''
        },
        // 通过这个验证规则对象，对新用户的数据进行审查
        addFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: blur },
            { min: 3, max: 10, message: 'The length of user must in 3~10 characters', trigger: 'blur'}
          ]
        }
      }
    },

    created() {
      this.getUserList()
    },

    methods: {
      async getUserList() {
        const { data: res } = await this.$http.get('users', { params: this.queryInfo })
        if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
        console.log(res)
        this.userlist = res.data.users
        this.total = res.data.total
        console.log(res)
      },

      // 监听页数改变
      handleSizeChange(newSize) {
        // newSize为用户想要的每页显示XX条的数据，用户决定这个值后，将该值赋值给queryInfo里，并用queryInfo作为参数通过getUserList()方法重新请求数据
        this.queryInfo.pagesize = newSize
        this.getUserList()
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },

      // 监听 switch 开关状态的改变，修改状态值
      async userStateChanged(userinfo) {
        const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        if (res.meta.status !== 200) {
          userinfo.mg_state = !userinfo.mg_state
          return this.$message.error('更新用户失败')
        }
        this.$message.success('更新用户状态成功')
      }

    }
  }
</script>

<style lang="less" scoped>
</style>


<!-- 未绑定
  拿到API后先做什么：
  //1. 修改 侧边栏
  2. 修改 用户管理->用户列表->用户显示格式，添加用户的对话框
  3. 完成 修改用户 和 删除用户

  用户状态修改: P50
  完整的添加用户表单 addForm： P53
    自定义用户信息的验证规则，例如邮箱、手机: P54
    用户表单的重置，即再次打开表单后显示的是空表单： P55
    点击确定后表单的预校验：P56
    调用API接口完成添加用户的操作：P57
  修改用户功能：P58-63
  删除用户功能：P64-65

  权限管理
    分为两种用户：admin和mannufactor
    A是超级管理者，可以做所有事情
    M只能对商品（游戏）进行管理
    角色列表
      未做：P74-84
      分配权限：P85-91
    权限列表 （list结构）
      渲染权限标签：P71
      

  商品管理
    商品（游戏）列表
    商品（游戏）分类

  订单（论坛）管理

  订单（market）管理
    这个可以和论坛的形式一样，只不过这里的帖子名字是游戏/组件的名字+售价

  订单（club）管理
    还没想好
-->

