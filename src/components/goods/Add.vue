<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加游戏信息" type="info" center show-icon :closable="false">
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="游戏描述"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="游戏名称" prop="G_name">
              <el-input v-model="addForm.G_name"></el-input>
            </el-form-item>
            <el-form-item label="游戏类别ID" prop="T_id">
              <el-input v-model="addForm.T_id"></el-input>
            </el-form-item>
            <el-form-item label="厂商" prop="M_id">
              <el-input v-model="addForm.M_id"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="G_price">
              <el-input v-model="addForm.G_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="评分" prop="G_rating">
              <el-input v-model="addForm.G_rating"></el-input>
            </el-form-item>
            <el-form-item label="参与人数" prop="Num_of_player">
              <el-input v-model="addForm.Num_of_player" type="number"></el-input>
            </el-form-item>
            <el-form-item label="娱乐时间" prop="playing_time">
              <el-input v-model="addForm.playing_time" type="number"></el-input>
            </el-form-item>
            <el-form-item label="最小年龄限制" prop="age_limit">
              <el-input v-model="addForm.age_limit"></el-input>
            </el-form-item>
            <el-form-item label="官方URL" prop="official_web">
              <el-input v-model="addForm.official_web"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品分类" prop="goods_cat"> -->
              <!-- <el-cascader expand-trigger="hover" :options="catelist" :props="cateProps" v-model="addForm.goods_cat" @change="handleChange"> -->
              <!-- </el-cascader> -->
            <!-- </el-form-item> -->
          </el-tab-pane>
          <!-- <el-tab-pane label="商品参数" name="1"> -->
            <!-- 渲染表单的Item项 -->
            <!-- <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id"> -->
              <!-- 复选框组 -->
              <!-- <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane> -->
          <!-- <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane> -->
          <!-- <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane> -->
          <el-tab-pane label="游戏描述" name="1">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.G_discription"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </el-card>
  </div>
</template>

<script>
// import _ from 'lodash'

export default {
  data() {
    return {
      activeIndex: '0',
      // 添加商品的表单数据对象
      addForm: {
        G_name: '',
        T_id: 0,
        M_id: 0,
        G_price: 0,
        G_rating: 0,
        Num_of_player: 0,
        playing_time: 0,
        age_limit: 0,
        official_web: '',
        G_discription: ''
        // 商品所属的分类数组
        // goods_cat: []
      },
      addFormRules: {
        G_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        T_id: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        M_id: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        G_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        G_rating: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        Num_of_player: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        playing_time: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        age_limit: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        official_web: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      // 商品分类列表
      // catelist: [],
      // cateProps: {
      //   label: 'cat_name',
      //   value: 'cat_id',
      //   children: 'children'
      // },
      // // 动态参数列表数据
      // manyTableData: [],
      // // 静态属性列表数据
      // onlyTableData: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有商品分类数据
    async getCateList() {
      // const { data: res } = await this.$http.get('categories')

      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取商品分类数据失败！')
      // }

      // this.catelist = res.data
      // console.log(this.catelist)
    },
    // 级联选择器选中项变化，会触发这个函数
    // handleChange() {
    //   console.log(this.addForm.goods_cat)
    //   if (this.addForm.goods_cat.length !== 3) {
    //     this.addForm.goods_cat = []
    //   }
    // },
    beforeTabLeave(activeName, oldActiveName) {
      console.log('即将离开的标签页名字是：' + oldActiveName)
      console.log('即将进入的标签页名字是：' + activeName)
      // return false
      // if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
      //   this.$message.error('请先选择商品分类！')
      //   return false
      // }
    },
    async tabClicked() {
      console.log(this.activeIndex)
      // 证明访问的是动态参数面板
      // if (this.activeIndex === '1') {
      //   const { data: res } = await this.$http.get(
      //     `categories/${this.cateId}/attributes`,
      //     {
      //       params: { sel: 'many' }
      //     }
      //   )

      //   if (res.meta.status !== 200) {
      //     return this.$message.error('获取动态参数列表失败！')
      //   }

      //   console.log(res.data)
      //   res.data.forEach(item => {
      //     item.attr_vals =
      //       item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
      //   })
      //   this.manyTableData = res.data
      // } else if (this.activeIndex === '2') {
      //   const { data: res } = await this.$http.get(
      //     `categories/${this.cateId}/attributes`,
      //     {
      //       params: { sel: 'only' }
      //     }
      //   )

      //   if (res.meta.status !== 200) {
      //     return this.$message.error('获取静态属性失败！')
      //   }

      //   console.log(res.data)
      //   this.onlyTableData = res.data
      // }
    },

    add() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项！')
        }
        // 执行添加的业务逻辑
        // lodash   cloneDeep(obj)
        // const form = _.cloneDeep(this.addForm)
        // form.goods_cat = form.goods_cat.join(',')
        // 处理动态参数
        // this.manyTableData.forEach(item => {
        //   const newInfo = {
        //     attr_id: item.attr_id,
        //     attr_value: item.attr_vals.join(' ')
        //   }
        //   this.addForm.attrs.push(newInfo)
        // })
        // // 处理静态属性
        // this.onlyTableData.forEach(item => {
        //   const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
        //   this.addForm.attrs.push(newInfo)
        // })
        // form.attrs = this.addForm.attrs
        // console.log(form)

        // 发起请求添加商品
        // 商品的名称，必须是唯一的
        const { data: res } = await this.$http.post('games', this.addForm)

        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败！')
        }

        this.$message.success('添加商品成功！')
        this.$router.push('/goods')
      })
    }
  },
  // computed: {
  //   cateId() {
  //     if (this.addForm.goods_cat.length === 3) {
  //       return this.addForm.goods_cat[2]
  //     }
  //     return null
  //   }
  // }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
</style>
