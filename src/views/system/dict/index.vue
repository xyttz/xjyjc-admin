<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12" :xs="24">
        <el-card class="box-card">
          <div class="clearfix" slot="header">
            <span>字典列表</span>
          </div>
          <!-- 字典列表子组件 -->
          <dict ref="dictc" @dictClick="dictClick" @resetItem="resetItem" />
        </el-card>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-card class="box-card">
          <div class="clearfix" slot="header">
            <span>{{ dict.name }}数据项</span>
          </div>
          <!-- 字典数据项子组件 -->
          <dict-item ref="dictItem" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Dict from './components/Dict'
  import DictItem from './components/DictItem'

  export default {
    name: 'Dictionary',
    components: { Dict, DictItem },
    data() {
      return {
        dict: {
          name: undefined,
        },
      }
    },
    methods: {
      dictClick(row) {
        this.dict.name = row.name ? '【' + row.name + '】' : undefined
        this.$refs.dictItem.dictClick(row)
      },
      resetItem() {
        this.dict.name = undefined
        this.$refs.dictItem.dictClick()
      },
    },
  }
</script>
