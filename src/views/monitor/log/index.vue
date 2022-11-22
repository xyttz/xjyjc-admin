<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryParams">
      <el-form-item>
        <el-input v-model="queryParams.oprName" clearable placeholder="操作员名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.operModul" clearable placeholder="操作模块" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="queryParams.start_d" placeholder="操作开始时间" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="queryParams.end_d" placeholder="操作结束时间" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="handleQueryFrom">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" border :data="pageList" :height="height" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column header-align="center" label="操作模块" prop="operModul" width="100px" />
      <el-table-column header-align="center" label="操作类型" prop="operType" width="100px" />
      <el-table-column header-align="center" label="操作描述" prop="operDesc" width="150px" />
      <el-table-column header-align="center" label="操作员名称" prop="operName" width="100px" />
      <el-table-column header-align="center" label="操作方法" prop="operMethod" width="200px;" />
      <el-table-column header-align="center" label="请求URI" prop="operUri" />
      <el-table-column header-align="center" label="请求IP" prop="operIp" width="140px;" />
      <el-table-column header-align="center" label="操作时间" prop="operCrtTime" width="160px;" />
      <el-table-column header-align="center" label="操作系统" prop="operSysOs" width="140px;" />
      <el-table-column header-align="center" label="浏览器版本" prop="operExploOs" width="140px;" />
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" plain size="mini" type="primary" @click="handleView(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="1000px" @close="close">
      <detail :info-data="form" :req="req" :rsp="rsp" />
    </el-dialog>
  </div>
</template>

<script>
  import { list } from '@/api/monitor/log'
  import detail from './components/detail'

  export default {
    name: 'LogMonitor',
    components: { detail },

    data() {
      return {
        height: this.$baseTableHeight(1) - 70,
        // 遮罩层
        loading: false,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
        },
        queryParams: {
          name: undefined,
        },
        pageList: [],
        dialog: {
          title: undefined,
          visible: false,
        },
        form: {},
        rsp: {},
        req: {},
        rules: {},
      }
    },

    created() {
      // this.handleQuery()
      this.loadData()
    },
    methods: {
      loadData() {},

      close() {
        console.log('点击了关闭按钮======')
        // this.form = {}
      },

      handleQuery() {
        this.loading = true
        this.pageList = []

        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        list(this.queryParams).then((response) => {
          this.pageList = response.data
          this.pagination.total = response.total
          this.loading = false
        })
      },
      handleQueryFrom() {
        this.$refs['queryForm'].validate((valid) => {
          if (valid) {
            this.handleQuery()
          }
        })
      },
      handleReset() {
        this.pagination = {
          page: 1,
          limit: 10,
          total: 0,
        }
        this.queryParams = {
          id: undefined,
          unitid: undefined,
        }
        this.handleQuery()
      },
      handleView(row) {
        this.dialog = {
          title: '操作日志详情',
          visible: true,
        }
        if (row) {
          var rspjsonObj = JSON.parse(row.operRespParam)
          this.rsp = rspjsonObj
          var reqjsonObj = JSON.parse(row.operRequParam)
          this.req = reqjsonObj
          // row.operRespParam = newjsonObj
          // row.operRequParam = JSON.stringify(row.operRequParam)
          // row.operRespParam = JSON.stringify(row.operRespParam)
          this.form = row //Object.assign(this.form, row)
        }
      },
      handleSelectionChange(selection) {
        this.ids = selection.map((item) => item.acc_no)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
    },
  }
</script>

<style scoped></style>
