<template>
  <div class="components-container">
    <!-- 搜索表单 -->
    <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
      <el-form-item>
        <el-input v-model="queryParams.deptName" clearable placeholder="名称" @keyup.enter.native="handleQuery" />
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
      :height="height"
      highlight-current-row
      row-key="id"
      size="mini"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @row-click="handleRowClick"
    >
      <el-table-column label="部门/职能/区域名称">
        <template slot-scope="scope">
          <vab-icon :icon="'at-line'" />
          {{ scope.row.name }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getDeptTableList, getDeptSelectList } from '@/api/system/dept'

  export default {
    name: 'DeptMenuComponent',
    data() {
      return {
        height: this.$baseTableHeight(2) - 30,
        deptOptions: [],
        loading: true,
        ids: [],
        single: true,
        multiple: true,
        queryParams: {
          deptName: undefined,
        },
        tableList: [],
        dialog: {
          title: undefined,
          visible: false,
        },
        form: {
          parentId: undefined,
          name: undefined,
          sort: 1,
          status: 1,
        },
        title: '新增',
        menuOptions: [],
        currentRow: undefined,
        rules: {
          parentId: [{ required: true, message: '请输入字典项名称', trigger: 'blur' }],
        },
      }
    },
    created() {
      this.handleQuery()
    },
    beforeMount() {
      window.addEventListener('resize', this.handleHeight)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleHeight)
    },
    methods: {
      handleHeight() {
        this.height = this.$baseTableHeight(2) - 47
      },
      handleRowClick(row) {
        const currentRow = JSON.parse(JSON.stringify(row))
        this.currentRow = currentRow
        this.form = currentRow
        this.title = '修改'
        this.$emit('menuClick', row)
      },
      handleQuery() {
        getDeptTableList(this.queryParams).then((response) => {
          this.tableList = response.data
          this.loading = false
        })
      },
      handleReset() {
        this.queryParams = {
          name: undefined,
          status: undefined,
        }
        this.handleQuery()
      },
      resetForm() {
        this.form = {
          parentId: undefined,
          name: undefined,
          sort: 1,
          status: 1,
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      loadDeptOptions() {
        getDeptSelectList().then((response) => {
          const deptOption = { id: 0, label: '无', children: response.data }
          this.deptOptions.push(deptOption)
          this.$forceUpdate()

          // this.deptOptions = [
          //   {
          //     id: 0,
          //     label: '无',
          //     children: response.data,
          //   },
          // ]
        })
      },
    },
  }
</script>

<style scoped></style>
