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
          <el-button type="primary" @click="addDialogVisible = true">添加社区</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域-->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <!--索引列-->
        <el-table-column label="社区名称" prop="C_name">
        </el-table-column>
        <el-table-column label="所属游戏" prop="G_id">
        </el-table-column>
        <el-table-column label="创建时间" prop="Found_time">
        </el-table-column>
        <el-table-column label="更新时间" prop="Update_time">
        </el-table-column>
        <el-table-column label="介绍说明" width="80px">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-info" size="mini" @click="showInfoDialog(scope.row.Description)">
            </el-button>
            <!-- <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
        <!-- 状态按钮 -->
        <!-- <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column> -->
        <!-- 修改、删除、权限按钮 -->
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.C_id)">
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.C_id)">
            </el-button>
            <!-- <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 这是“添加用户”所弹出的对话框 -->
    <el-dialog title="添加社区" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="95px">
        <el-form-item label="社区名称" prop="C_name">
          <el-input v-model="addForm.C_name"></el-input>
        </el-form-item>
        <el-form-item label="所属游戏ID" prop="G_id">
          <el-input v-model="addForm.G_id"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="Found_time">
          <el-input v-model="addForm.Found_time"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" prop="Update_time">
          <el-input v-model="addForm.Update_time"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="Description">
          <el-input v-model="addForm.Description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改社区" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="社区名称">
          <el-input v-model="editForm.C_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属游戏ID" prop="G_id">
          <el-input v-model="editForm.G_id"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="Found_time">
          <el-input v-model="editForm.Found_time"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" prop="Update_time">
          <el-input v-model="editForm.Update_time"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="Description">
          <el-input v-model="editForm.Description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详细信息的对话框 -->
    <el-dialog title="详细信息" :visible.sync="infoDialogVisible" width="70%">
      <div>
        {{info_discription}}
      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <!-- <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>

</template>

<script>
  export default {

    data() {
      // 验证邮箱的规则
      var checkEmail = (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        }

        cb(new Error('请输入合法的邮箱'))
      }

      // 验证手机号的规则
      var checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

        if (regMobile.test(value)) {
          return cb()
        }

        cb(new Error('请输入合法的手机号'))
      }

      // 验证性别
      var checkSex = (rule, value, cb) => {
        const regSex = /Secret|F|M/

        if (regSex.test(value)) {
          return cb()
        }

        cb(new Error('请输入Secret/F/M'))
      }

      // 验证日期 年-月-日
      var checkDate = (rule, value, cb) => {
        const regDate = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))$/

        if (regDate.test(value)) {
          return cb()
        }

        cb(new Error('请以年-月-日格式输入'))
      }

      return {
        // 获取用户列表参数
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        userlist: [],
        total: 0,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 通过这个表单，将新用户的数据进行添加
        addForm: {
          C_name: ''
        },
        // 通过这个验证规则对象，对新用户的数据进行审查
        addFormRules: {
          C_name: [
            { required: true, message: '请输入厂商名', trigger: 'blur' },
            { min: 1, max: 10, message: 'The length of name must in 1~10 characters', trigger: 'blur' }
          ],
          G_id: [
            { required: true, message: '请输入所属游戏ID', trigger: 'blur' }
          ],
          Found_time: [
            { required: true, message: '请输入创建时间', trigger: 'blur' },
            { validator: checkDate, trigger: 'blur' }
          ],
          Update_time: [
            { required: true, message: '请输入更新时间', trigger: 'blur' },
            { validator: checkDate, trigger: 'blur' }
          ]
        },

        // 控制修改用户对话框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象
        editForm: {},
        // 修改表单的验证规则对象
        editFormRules: {
          G_id: [
            { required: true, message: '请输入所属游戏ID', trigger: 'blur' }
          ],
          Found_time: [
            { required: true, message: '请输入创建时间', trigger: 'blur' },
            { validator: checkDate, trigger: 'blur' }
          ],
          Update_time: [
            { required: true, message: '请输入更新时间', trigger: 'blur' },
            { validator: checkDate, trigger: 'blur' }
          ]
        },

        // 控制详细信息对话框的显示与隐藏
        infoDialogVisible: false,

        info_discription: '11',

        // 控制分配角色对话框的显示与隐藏
        // setRoleDialogVisible: false,
        // 需要被分配角色的用户信息
        // userInfo: {},
        // 所有角色的数据列表
        // rolesList: [],
        // 已选中的角色Id值
        // selectedRoleId: ''
      }
    },

    created() {
      this.getUserList()
    },

    methods: {
      async getUserList() {
        const { data: res } = await this.$http.get('communities', { params: this.queryInfo })
        if (res.meta.status !== 200) return this.$message.error('获取社区列表失败')
        console.log(res)
        this.userlist = res.data.communities
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
      // async userStateChanged(userinfo) {
      //   const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      //   if (res.meta.status !== 200) {
      //     userinfo.mg_state = !userinfo.mg_state
      //     return this.$message.error('Update user failed') // 更新用户状态失败
      //   }
      //   this.$message.success('User status updated successfully') // 更新用户状态成功
      // },

      // 监听添加用户对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },

      // 点击按钮，添加新用户
      addUser() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return
          // 可以发起添加用户的网络请求
          const { data: res } = await this.$http.post('communities', this.addForm)

          if (res.meta.status !== 201) {
            return this.$message.error('添加失败！')
          }

          this.$message.success('添加成功！')
          // 隐藏添加用户的对话框
          this.addDialogVisible = false
          // 重新获取用户列表数据
          this.getUserList()
        })
      },

      showInfoDialog(Description) {
        // const {data: res } = await this.$http.get()
        this.info_discription = Description
        this.infoDialogVisible = true
      },

      // 展示修改用户的对话框
      async showEditDialog(C_id) {
        // console.log(M_id)
        const { data: res } = await this.$http.get('communities/' + C_id)

        if (res.meta.status !== 200) {
          return this.$message.error('查询信息失败！')
        }

        this.editForm = res.data
        this.editDialogVisible = true
      },
      // 监听修改用户对话框的关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },
      // 修改用户信息并提交
      editUserInfo() {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return
          // 发起修改用户信息的数据请求
          const { data: res } = await this.$http.put(
            'communities/' + this.editForm.C_id,
            {
              C_name: this.editForm.C_name,
              G_id: this.editForm.G_id,
              Found_time: this.editForm.Found_time,
              Update_time: this.editForm.Update_time,
              Description: this.editForm.Description
              // email: this.editForm.email,
              // mobile: this.editForm.mobile
            }
          )

          if (res.meta.status !== 200) {
            return this.$message.error('更新用户信息失败！')
          }

          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据列表
          this.getUserList()
          // 提示修改成功
          this.$message.success('更新用户信息成功！')
        })
      },

      // 根据Id删除对应的用户信息
      async removeUserById(C_id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        // 如果用户确认删除，则返回值为字符串 confirm
        // 如果用户取消了删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }

        const { data: res } = await this.$http.delete('communities/' + C_id)

        if (res.meta.status !== 200) {
          return this.$message.error('删除失败！')
        }

        this.$message.success('删除成功！')
        this.getUserList()
      },

      // // 展示分配角色的对话框
      // async setRole(userInfo) {
      //   this.userInfo = userInfo

      //   // 在展示对话框之前，获取所有角色的列表
      //   const { data: res } = await this.$http.get('roles')
      //   if (res.meta.status !== 200) {
      //     return this.$message.error('获取角色列表失败！')
      //   }

      //   this.rolesList = res.data

      //   this.setRoleDialogVisible = true
      // },
      // 点击按钮，分配角色
      // async saveRoleInfo() {
      //   if (!this.selectedRoleId) {
      //     return this.$message.error('请选择要分配的角色！')
      //   }

      //   const { data: res } = await this.$http.put(
      //     `users/${this.userInfo.id}/role`,
      //     {
      //       rid: this.selectedRoleId
      //     }
      //   )

      //   if (res.meta.status !== 200) {
      //     return this.$message.error('更新角色失败！')
      //   }

      //   this.$message.success('更新角色成功！')
      //   this.getUserList()
      //   this.setRoleDialogVisible = false
      // },
      // // 监听分配角色对话框的关闭事件
      // setRoleDialogClosed() {
      //   this.selectedRoleId = ''
      //   this.userInfo = {}
      // }

    }
  }
</script>

<style lang="less" scoped>
</style>