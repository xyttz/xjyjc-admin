<template>
  <div class="menu-container">
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="menu-2-fill" />
          检测项目分类
        </b>
      </div>
      <!-- 搜索检测项目分类 -->
      <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
        <el-form-item>
          <el-input v-model="queryParams.name" clearable placeholder="分类名称" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table v-loading="loading" border :data="tableList" default-expand-all highlight-current-row row-key="id" size="mini" @row-click="handleRowClick">
        <el-table-column header-align="center" label="分类名称">
          <template slot-scope="scope">
            <vab-icon :icon="'file-list-2-line'" />
            {{ scope.row.checkname }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { getTableListNoPagination, getItemClassOptions } from '@/api/basic/check'

  export default {
    name: 'Menu',
    data() {
      return {
        loading: true,
        ids: [],
        single: true,
        multiple: true,
        queryParams: {
          name: undefined,
        },

        tableList: [],

        title: '新增检测项目信息',
        itemClassOptions: [],
        currentRow: undefined,
      }
    },
    created() {
      // this.loadItemClassOptions()
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        this.resetForm()
        getTableListNoPagination(this.queryParams).then((response) => {
          this.tableList = response.data
          this.loading = false
        })
      },
      loadItemClassOptions() {
        this.itemClassOptions = []
        getItemClassOptions().then((response) => {
          this.itemClassOptions = response.data
          this.$forceUpdate()
        })
      },
      handleReset() {
        this.queryParams.name = undefined
        this.handleQuery()
      },
      handleRowClick(row) {
        const currentRow = JSON.parse(JSON.stringify(row))
        this.currentRow = currentRow
        this.form = currentRow
        this.title = '修改菜单'
        this.$emit('menuClick', row)
      },

      resetForm() {
        this.form = {
          libnum: undefined,
          libname: undefined,
          status: undefined,
          sort: 1,
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      closeDialog() {
        this.resetForm()
        this.dialog = {
          title: undefined,
          visible: false,
        }
      },
    },
  }
</script>

<style scoped>
  .menu-container {
    position: relative;
    margin: 0px 10px 0px 0px;
  }
</style>
