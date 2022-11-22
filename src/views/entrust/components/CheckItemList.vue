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
          <el-input v-model="queryParams.name" clearable placeholder="检测项目名称" style="width: 165px" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        border
        :data="tableList"
        default-expand-all
        highlight-current-row
        row-key="id"
        size="mini"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @row-click="handleRowClick"
      >
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
  import { getEntrustCheckItemList } from '@/api/basic/check'

  export default {
    name: 'EntrustCheckItemList',
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
        dialog: {
          title: undefined,
          visible: false,
        },
        itemClassOptions: [],
        currentRow: undefined,
      }
    },
    created() {
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        getEntrustCheckItemList(this.queryParams).then((response) => {
          this.tableList = response.data
          this.loading = false
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
      handleMenuSelect(node) {
        if (node.id == 0) {
          this.form.component = 'Layout'
        } else {
          this.form.component = undefined
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
