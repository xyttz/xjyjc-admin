<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6" :xs="24">
        <class-list @menuClick="menuClick" @resetClassList="resetClassList" />
      </el-col>
      <el-col :span="18" :xs="24">
        <item-list ref="items" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ClassList from './components/classlist'
  import ItemList from './components/itemlist'
  export default {
    name: 'Check',
    components: { ClassList, ItemList },
    data() {
      return {}
    },
    methods: {
      menuClick(row) {
        this.$refs.items.menuClick(row)
      },
      resetClassList() {
        this.menuName = undefined
        this.$refs.items.resetClassList()
      },
    },
  }
</script>

<style scoped>
  .box-card {
    margin-bottom: 20px;
  }
</style>
