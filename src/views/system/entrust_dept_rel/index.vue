<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div class="clearfix" slot="header">
            <span>部门/职能/区域划分</span>
          </div>
          <!-- 字典列表子组件 -->
          <dept-menu @menuClick="menuClick" @resetPermission="resetPermission" />
        </el-card>
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card class="box-card">
          <div class="clearfix" slot="header">
            <span>{{ dept.name }}委托项目</span>
          </div>
          <!-- 字典数据项子组件 -->
          <entrust-list ref="entrust" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DeptMenu from './components/DeptMenu'
  import EntrustList from './components/EntrustList'

  export default {
    name: 'Menu',
    components: { DeptMenu, EntrustList },
    data() {
      return {
        dept: {
          name: undefined,
        },
      }
    },
    methods: {
      menuClick(row) {
        this.dept.name = row.name ? '【' + row.name + '】' : undefined
        this.$refs.entrust.menuClick(row)
      },
      resetPermission() {
        this.menuName = undefined
        this.$refs.entrust.resetTrusts()
      },
    },
  }
</script>
<style scoped>
  .box-card {
    margin-bottom: 20px;
  }
</style>
