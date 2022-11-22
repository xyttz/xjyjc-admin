<template>
  <div class="components-container">
    <el-row>
      <el-col :span="6" :xs="24">
        <check-item-list @menuClick="menuClick" @resetClassList="resetProjects" />
      </el-col>
      <el-col :span="18" :xs="24">
        <project-list ref="projects" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import CheckItemList from './components/CheckItemList'
  import ProjectList from './components/ProjectList'

  export default {
    name: 'Entrust',
    components: { CheckItemList, ProjectList },
    data() {
      return {}
    },
    methods: {
      menuClick(row) {
        this.$refs.projects.menuClick(row)
      },
      resetProjects() {
        this.menuName = undefined
        this.$refs.projects.resetProjects()
      },
    },
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .box-card {
    margin-bottom: 20px;
  }
</style>
