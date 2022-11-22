<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :xs="24">
        <SMenus @menuClick="menuClick" @resetStandardList="resetStandardList" />
      </el-col>
      <el-col :span="16" :xs="24">
        <SList ref="standards" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SMenus from './components/standardMenu'
  import SList from './components/standardList'

  export default {
    name: 'Index',
    components: { SMenus, SList },
    data() {
      return {}
    },

    methods: {
      menuClick(row) {
        this.$refs.standards.menuClick(row)
      },
      resetStandardList() {
        this.menuName = undefined
        this.$refs.standards.resetStandardList()
      },
    },
  }
</script>

<style scoped>
  .box-card {
    margin-bottom: 20px;
  }
</style>
