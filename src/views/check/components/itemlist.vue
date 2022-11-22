<template>
  <div class="perm-container">
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="menu-2-fill" />
          {{ menuName }}
        </b>
      </div>
      <!-- 搜索检测项目分类 -->
      <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
        <el-form-item>
          <el-input v-model="queryParams.name" clearable placeholder="项目名称" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table ref="table" v-loading="loading" border :data="pageList" :max-height="tableHeight" size="mini">
        <el-table-column align="center" fixed="left" label="序号" type="index" width="50" />
        <el-table-column fixed="left" header-align="center" label="检测编码" prop="checknum" width="90" />
        <el-table-column fixed="left" header-align="center" label="检测名称" prop="checkname" width="230" />
        <!-- <el-table-column align="center" label="状态" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.row)" />
          </template>
        </el-table-column> -->
        <el-table-column header-align="center" label="检测说明" prop="checkexp" width="230" />
        <el-table-column align="center" label="创建时间" prop="gmtCreate" width="150" />
        <el-table-column align="center" label="更新时间" prop="gmtModified" width="150" />
        <el-table-column align="center" label="创建者" prop="crtUser" width="100" />
        <el-table-column align="center" label="更新者" prop="uptUser" width="100" />

        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain size="mini" type="primary" @click="handleEdit(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { getCheckItemListNoPagination } from '@/api/basic/check'

  export default {
    name: 'Permission',
    data() {
      return {
        loading: false,
        ids: [],
        cols: [],
        single: true,
        multiple: true,
        pageList: [],
        colunmList: [],
        queryParams: {
          parentid: undefined,
          name: undefined,
        },
        disabled: true,
        menu: {},
        menuName: undefined,
        urlPerm: {
          requestMethod: undefined,
          serviceName: undefined,
          requestPath: undefined,
        },
        microServiceList: [],
        requestMethodList: [],
        itemClassOptions: [],
        tableHeight: 768,
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        // console.log("formheight:" + formHeight);
        this.tableHeight = window.innerHeight - 80 - 270
        window.scrollTo(0, 0)
      })
    },
    methods: {
      handleQuery() {
        this.queryParams.parentid = this.menu.id
        getCheckItemListNoPagination(this.queryParams).then((response) => {
          this.pageList = response.data
          this.loading = false
        })
      },
      handleReset() {
        this.pagination = {
          page: 1,
          limit: 10,
          total: 0,
        }
        this.queryParams = {
          parentid: this.menu.id,
          name: undefined,
        }
        this.handleQuery()
      },
      menuClick(row) {
        this.disabled = false
        this.menu = row
        this.menuName = '【' + this.menu.checkname + '】'
        this.pageList = []
        this.colunmList = []
        this.handleQuery()
      },
      handleEdit(row) {
        console.log(row.checkPagePath)
        if (row.checkPagePath) {
          this.$router.push({
            // path: '/entrust/components/samples/E301',
            path: row.checkPagePath,
            // replace: '/entrust/components/samples/E301',
            query: {
              checknum: row.checknum,
              checkname: row.checkname,
            },
          })
        } else {
          this.$baseMessage('目前不支持此项目的检测查看，功能迭代中...', 'info')
        }
      },
    },
  }
</script>

<style scoped>
  .perm-container {
    margin-bottom: 20px;
  }
</style>
