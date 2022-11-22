<template>
  <div class="perm-container">
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="menu-2-fill" />
          {{ menuName }}
        </b>
      </div>
      <!-- 搜索工程信息 -->
      <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
        <el-form-item>
          <el-input v-model="queryParams.name" clearable placeholder="工程名称" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table ref="table" v-loading="loading" border :data="pageList" :height="height" size="mini">
        <el-table-column align="center" fixed="left" label="序号" type="index" width="50" />
        <el-table-column fixed="left" header-align="center" label="委托单位" prop="entunit" width="250" />
        <el-table-column fixed="left" header-align="center" label="工程名称" prop="proname" width="250" />
        <el-table-column header-align="center" label="见证单位" prop="witname" width="250" />
        <el-table-column header-align="center" label="见证人" prop="witman" width="100" />
        <el-table-column header-align="center" label="见证人电话" prop="witphone" width="110" />
        <el-table-column header-align="center" label="取样单位" prop="recname" width="250" />
        <el-table-column header-align="center" label="取样人" prop="recman" width="100" />
        <el-table-column header-align="center" label="取样人电话" prop="recphone" width="110" />
        <el-table-column header-align="center" label="送样人" prop="sendman" width="100" />
        <el-table-column header-align="center" label="送样人电话" prop="sendphone" width="110" />
        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button :disabled="disabled" icon="el-icon-edit" plain size="mini" type="primary" @click="handleEdit(scope.row)">创建委托</el-button>
            <!-- <el-button icon="el-icon-success" plain size="mini" type="success" @click="handleDelete(scope.row)">委托列表</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />
    </el-card>
  </div>
</template>

<script>
  import { listProjects } from '@/api/basic/project'
  // import { add } from '@/api/entrust/entrust'

  export default {
    name: 'Projects',
    data() {
      return {
        loading: false,
        ids: [],
        cols: [],
        single: true,
        multiple: true,
        pageList: [],
        colunmList: [],
        dialog: {
          title: undefined,
          visible: false,
        },
        form: {
          shownum: 0,
          parentid: undefined,
        },
        queryParams: {
          parentid: undefined,
          name: undefined,
        },
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
        },
        rules: {
          shownum: [
            {
              required: true,
              message: '请选择显示顺序',
              trigger: 'blur',
            },
          ],
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
        height: this.$baseTableHeight(1),
      }
    },
    created() {
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        listProjects(this.queryParams).then((response) => {
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
      async handleEdit(row) {
        if (this.menu.parentid > 0) {
          if (this.menu.pagePath) {
            console.log(this.menu.pagePath)
            // this.$router.push({
            //   path: '/vab/table/detail',
            //   query: this.selectRows[0],
            // })
            this.$router.push({
              // path: '/entrust/components/samples/E301',
              path: this.menu.pagePath,
              query: {
                checknum: this.menu.id,
                pronum: row.pronum,
                oprtype: 'add',
              },
            })
          } else {
            this.$message.warning('该检测项目，无对应填报委托单，请联系管理员')
            return
          }
        } else {
          this.$message.warning('请选择检测项目，不能选择大分类')
          return
        }

        // this.resetForm()
        // this.dialog = {
        //     title: this.menuName + '编辑项目检测信息',
        //     visible: true
        // }
        // const id = row.id
        // detail(id).then(response => {
        //     this.form = response.data
        // })
      },
      handleSubmit: function () {
        // this.form.parentid = this.menu.id
        // if (this.form.id != undefined) {
        //   updateItem(this.form.id, this.form).then(() => {
        //     this.$message.success('修改成功')
        //     this.closeDialog()
        //     this.handleQuery()
        //   })
        // } else {
        //   addItem(this.form).then(() => {
        //     this.$message.success('新增成功')
        //     this.closeDialog()
        //     this.handleQuery()
        //   })
        // }
      },
      closeDialog() {
        this.resetForm()
        this.dialog = {
          title: undefined,
          visible: false,
        }
      },
      resetForm() {
        this.form = {
          menuId: this.menu.id,
          libnum: this.menu.libnum,
        }

        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      menuClick(row) {
        if (row.parentid != 0) {
          this.disabled = false
          this.menu = []
          this.menu = row
          this.menuName = '【' + this.menu.checkname + '】'
          this.handleQuery()
        } else {
          this.resetForm()
          this.pageList = []
        }
        // this.pageList = []
        // this.colunmList = []
        // this.handleQuery()
      },
      resetProjects() {
        this.disabled = true
        this.pageList = []
        this.colunmList = []
        this.queryParams.menuId = undefined
        this.menu = {}
        this.menuName = undefined
      },
    },
  }
</script>

<style scoped>
  .perm-container {
    margin-bottom: 20px;
  }
</style>
