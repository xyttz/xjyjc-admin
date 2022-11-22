<template>
  <div class="components-container">
    <el-form ref="queryForm" :inline="true" label-width="100px" :model="queryParams" @submit.native.prevent>
      <el-form-item label="工程名称">
        <el-input v-model="queryParams.pronum" placeholder="请输入工程名称" style="width: 200px" />
      </el-form-item>
      <el-form-item label="委托单位">
        <el-input v-model="queryParams.entunitnum" placeholder="请输入工程名称" style="width: 200px" />
      </el-form-item>
      <el-form-item label="样品编号">
        <el-input v-model="queryParams.sampnum" placeholder="请输入样品编号" style="width: 200px" />
      </el-form-item>
      <el-form-item label="委托编号">
        <el-input v-model="queryParams.entnum" placeholder="请输入委托编号" style="width: 200px" />
      </el-form-item>
      <el-form-item label="报告编号">
        <el-input v-model="queryParams.repnum" placeholder="请输入报告编号" style="width: 200px" />
      </el-form-item>
      <el-form-item label="数据状态">
        <el-checkbox-group v-model="sampstatus">
          <el-checkbox-button v-for="status in sampstatusOptions" :key="status.value" :label="status.value">
            {{ status.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" native-type="submit" type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据表格 -->
    <el-table ref="table" v-loading="loading" border :data="pageList" default-expand-all row-key="entkey" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column align="center" label="流程状态" prop="sampphase" width="120" />
      <el-table-column align="center" label="样品状态" prop="sampstatus" width="120" />
      <el-table-column align="center" label="委托编码" prop="entnum" width="140" />
      <el-table-column align="center" label="当前处理人" prop="crtUser" width="100" />
      <el-table-column align="center" label="样品编号" prop="sampnum" width="140" />
      <el-table-column align="center" label="委托日期" prop="entdate" width="100" />
      <el-table-column align="center" label="要求报告日期" prop="repcondate" width="100" />
      <el-table-column align="center" label="检测标准" prop="standname" width="120" />
      <el-table-column align="center" label="检测日期" prop="checkdate" width="100" />
      <el-table-column align="center" label="工程单位" prop="proname" width="180" />
      <el-table-column align="center" label="委托单位" prop="entunitnum" width="180" />
      <el-table-column align="center" label="备注" prop="expl" />

      <el-table-column align="center" fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button v-if="scope.row.iseditentruest == 1" icon="el-icon-edit" plain size="mini" type="primary" @click.stop="handleEdit(scope.row)">委托修改</el-button>
          <el-button icon="el-icon-search" plain size="mini" type="primary" @click.stop="handleUpdate(scope.row)">复核查阅</el-button>
          <el-button icon="el-icon-upload" plain size="mini" type="primary" @click.stop="handleReport(scope.row)">委托报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />
  </div>
</template>
<script>
  import { list } from '@/api/entrust/entrust'
  import { listDictItemByCode } from '@/api/system/dict-item'
  export default {
    name: 'Em308EntrustList',
    data() {
      return {
        sampstatus: [],
        sampstatusOptions: [],
        pageList: [],
        loading: false,
        ids: [],
        cols: [],
        single: true,
        multiple: true,
        queryParams: { sampnum: '' },
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
        },
      }
    },
    created() {
      this.loadData()
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        list(this.queryParams, '308').then((response) => {
          this.pageList = response.data
          this.pagination.total = response.total
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
          name: undefined,
        }
        this.handleQuery()
      },
      loadData() {
        listDictItemByCode('sampstatus').then((response) => {
          this.sampstatusOptions = response.data
        })
      },
      checkClick(row) {
        console.log(row.checkPagePath)
        this.$router.push({
          // path: '/entrust/components/samples/E301',
          path: row.checkPagePath,
          query: {
            checknum: row.checknum,
            checkname: row.checkname,
          },
        })
      },
      handleSelectionChange(selection) {
        this.ids = selection.map((item) => item.acc_no)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },

      handleEdit(row) {
        // console.log(JSON.stringify(row))
        const id = row.id
        const pronum = row.pronum
        this.$router.push({
          path: '/entrust/components/samples/E308',
          // path: '',
          query: {
            id: id,
            pronum: pronum,
          },
        })
      },

      handleUpdate(row) {
        console.log(JSON.stringify(row))
        const id = row.id
        const pronum = row.pronum
        this.$router.push({
          path: '/entrust/components/samples/E308',
          // path: '',
          query: {
            id: id,
            pronum: pronum,
            oprtype: 'review',
          },
        })
      },
      handleReport(row) {
        // console.log(JSON.stringify(row))
        const entnum = row.entnum
        this.$router.push({
          path: '/reports/em308/entrust/index',
          query: {
            entnum: entnum,
          },
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .checkbox-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
