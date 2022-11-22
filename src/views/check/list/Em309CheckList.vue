<template>
  <div class="components-container">
    <el-form ref="queryForm" :inline="true" label-width="100px" :model="queryParams" @submit.native.prevent>
      <el-form-item label="工程名称">
        <el-input v-model="queryParams.pronum" placeholder="请输入工程名称" style="width: 200px" />
      </el-form-item>
      <el-form-item label="委托单位">
        <el-input v-model="queryParams.entunitnum" placeholder="请输入委托单位" style="width: 200px" />
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
      <el-table-column align="center" label="委托单编码" prop="entnum" width="170" />
      <el-table-column align="center" label="样品试验编号" prop="sampnum" width="160" />
      <el-table-column align="center" label="流程状态" prop="sampphase" width="120" />
      <el-table-column align="center" label="样品状态" prop="sampstatus" width="120" />
      <el-table-column align="center" label="创建人" prop="crtUser" width="100" />
      <el-table-column align="center" label="委托日期" prop="entdate" width="100" />
      <el-table-column align="center" label="要求报告日期" prop="repcondate" width="100" />
      <el-table-column align="center" label="检测标准" prop="standname" width="120" />
      <el-table-column align="center" label="检测日期" prop="checkdate" width="100" />
      <el-table-column align="center" label="工程单位" prop="proname" width="180" />
      <el-table-column align="center" label="委托单位" prop="entunitnum" width="180" />
      <el-table-column align="center" label="备注" prop="expl" />

      <el-table-column align="center" fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button v-permissions="['chk:link:query']" icon="el-icon-search" plain size="mini" type="primary" @click.stop="handleCheckDetail(scope.row)">检测单</el-button>
          <el-button v-permissions="['chk:link:pkpmsync']" icon="el-icon-share" plain size="mini" type="primary" @click.stop="handleSync(scope.row)">PKPM▶Clound</el-button>
          <el-button v-permissions="['chk:link:report']" icon="el-icon-upload" plain size="mini" type="primary" @click.stop="handleReport(scope.row)">打印报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />
  </div>
</template>
<script>
  import { list, syncCheckData, downloadCheckReport } from '@/api/entrust/entrust'
  import { listDictItemByCode } from '@/api/system/dict-item'
  export default {
    name: 'Em309CheckList',
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
        list(this.queryParams, '309').then((response) => {
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
      handleCheckDetail(row) {
        // console.log(JSON.stringify(row))
        const entkey = row.entkey

        this.$router.push({
          path: 'Em309CheckForm',
          // path: '',
          query: {
            entkey: entkey,
          },
        })
      },
      handleReport(row) {
        // console.log(JSON.stringify(row))
        const entnum = row.entnum
        this.downloadLoading = true
        let current = new Date()
        let today =
          current.getFullYear() +
          '-' +
          (current.getMonth() + 1).toString().padStart(2, '0') +
          '-' +
          current.getDate().toString().padStart(2, '0') +
          ' ' +
          current.getHours().toString().padStart(2, '0') +
          '.' +
          current.getMinutes().toString().padStart(2, '0') +
          '.' +
          current.getSeconds().toString().padStart(2, '0')
        console.log('entnum:' + entnum + ',today:' + today)
        if (entnum) {
          downloadCheckReport(entnum, '309').then((response) => {
            // const data = response.data
            // console.log(data)
            // let blob = new Blob([response], { type: 'chunked' })
            // let downloadLink = document.createElement('a')
            // const URL = window.URL || window.webkitURL || window.moxURL
            // let downUrl = URL.createObjectURL(blob)
            // downloadLink.href = downUrl
            // downloadLink.download = '钢筋焊接接头检测委托报告-' + today + '.doc'
            // downloadLink.click()
            // window.URL.revokeObjectURL(downUrl)
            // split
            const binaryData = []
            binaryData.push(response)
            //获取blob链接
            this.pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }))
            window.open(this.pdfUrl)

            // this.pdfUrl = window.URL.createObjectURL(new Blob([response], { type: `application/pdf` }))
            // const fname = `钢筋焊接接头检测委托报告` + today // 下载文件的名字
            // const link = document.createElement('a')
            // link.href = this.pdfUrl
            // link.setAttribute('download', fname)
            // document.body.appendChild(link)
            // link.click()

            this.downloadLoading = false
          })
          this.downloadLoading = false
        }
        // this.$router.push({
        //   path: '/reports/em301/index',
        //   query: {
        //     entnum: entnum,
        //   },
        // })
      },
      handleSync(row) {
        const Loading = this.$baseLoading(5)
        console.log(JSON.stringify(row))
        const entkey = row.entkey
        syncCheckData(entkey, '309').then(
          (res) => {
            Loading.close()
            this.$notify.success('同步检测数据成功' + res.msg)
          },
          (err) => {
            Loading.close()
            this.$notify.error('同步检测数据失败' + err)
          }
        )
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
