<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
      <el-form-item>
        <el-input v-model="queryParams.entunit" clearable placeholder="委托单位名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button :disabled="disabled" icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" border :data="pageList" :height="height">
      <el-table-column align="center" fixed="left" label="序号" type="index" width="50" />
      <el-table-column align="left" fixed="left" header-align="center" label="委托单位" prop="entunit" width="250" />
      <el-table-column align="right" header-align="center" label="联系人" prop="entunitman" width="150" />
      <el-table-column align="left" header-align="center" label="联系人手机" prop="entmanmob" width="150" />
      <el-table-column align="left" header-align="center" label="联系人电话" prop="entmantel" width="150" />
      <el-table-column align="right" header-align="center" label="开户行" prop="accbank" width="150" />
      <el-table-column align="right" header-align="center" label="开户名称" prop="namebank" width="150" />
      <el-table-column align="left" header-align="center" label="银行账号" prop="crdbank" width="150" />
      <el-table-column align="center" label="委托开始日期" prop="entbegin" width="150" />
      <el-table-column align="center" label="委托结束日期" prop="entend" width="150" />
      <el-table-column align="left" header-align="center" label="传真号" prop="entfax" width="150" />
      <el-table-column align="right" header-align="center" label="单位邮箱" prop="entemail" width="200" />
      <el-table-column align="right" header-align="center" label="委托单位地址" prop="entunitadd" width="350" />
      <el-table-column align="center" label="创建时间" prop="gmtCreate" width="180" />
      <el-table-column align="center" label="更新时间" prop="gmtModified" width="180" />
      <el-table-column align="center" label="创建者" prop="crtUser" width="100" />
      <el-table-column align="center" label="更新者" prop="uptUser" width="100" />
      <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" header-align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />
    <!-- dialog begin-->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="200">
      <el-form ref="form" label-width="140px" :model="form" :rules="rules">
        <el-form-item label="关联名称" prop="reldepts">
          <el-input v-model="deptInfo.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="委托单位" prop="entunit">
          <el-select v-model="form.entrustId" clearable filterable placeholder="请选择委托单位">
            <el-option v-for="item in entrustOptions" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
    <!-- dialog end -->
  </div>
</template>

<script>
  import { listEntrustsByDept, detail, update, add, del, getEntrustSelectList } from '@/api/basic/entrust_dept_rel'

  export default {
    data() {
      return {
        height: this.$baseTableHeight(2) - 115,
        disabled: true,
        entrustOptions: [],
        valueConsistsOf: 'LEAF_PRIORITY',
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        queryParams: {
          entunit: undefined,
          deptid: undefined,
        },
        form: {
          entunit: undefined,
          entunitadd: undefined,
          entunitman: undefined,
          entmantel: undefined,
          entmanmob: undefined,
          entemail: undefined,
          entDateRange: [],
          accbank: undefined,
          namebank: undefined,
          crdbank: undefined,
        },

        rules: {
          entrustId: [
            {
              required: true,
              message: '请选择委托单位名称',
              trigger: 'blur',
            },
          ],
        },
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
        },
        pageList: [],
        dialog: {
          title: undefined,
          visible: false,
        },
        deptInfo: {},
      }
    },
    async created() {
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
      handleQuery() {
        if (!this.deptInfo.id) {
          this.loading = false
          return
        }
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        listEntrustsByDept(this.queryParams).then((response) => {
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
          queryMode: 'page',
          nickName: undefined,
        }
        this.handleQuery()
      },
      async handleAdd() {
        this.resetForm()
        this.dialog = {
          title: '新增单位部门关系信息',
          visible: true,
        }
        this.form.deptId = this.deptInfo.id
        await this.loadEntOptions()
      },
      resetForm() {
        this.form = {
          visible: 1,
          parentId: 0,
          icon: undefined,
          sort: 1,
          component: 'Layout',
          path: undefined,
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      handleSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const id = this.form.id
            if (id != undefined) {
              update(id, this.form).then(() => {
                this.$message.success('修改成功')
                this.handleQuery()
                this.closeDialog()
              })
            } else {
              add(this.form).then(() => {
                this.$message.success('新增成功')
                this.handleQuery()
                this.closeDialog()
              })
            }
          }
        })
      },
      async handleUpdate(row) {
        this.resetForm()
        this.dialog = {
          title: '修改委托单位信息',
          visible: true,
        }
        const id = row.id || this.ids
        detail(id).then((response) => {
          this.form = response.data
          this.$set(this.form, 'entDateRange', [this.form.entbegin, this.form.entend])
        })
      },
      closeDialog() {
        this.resetForm()
        this.dialog = {
          title: undefined,
          visible: false,
        }
      },
      handleDelete(row) {
        const ids = row.id || this.ids.join(',')
        this.$confirm('确认删除已选中的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            del(ids).then(() => {
              this.$message.success('删除成功')
              this.handleQuery()
            })
          })
          .catch(() => this.$message.info('已取消删除'))
      },
      menuClick(row) {
        if (row) {
          if (row.children.length == 0) {
            this.disabled = false
            this.queryParams.deptid = row.id
            this.deptInfo = row
            this.handleQuery()
          } else {
            this.resetForm()
            this.pageList = []
          }
        } else {
          this.pageList = []
        }
      },
      loadEntOptions() {
        getEntrustSelectList().then((response) => {
          this.entrustOptions = response.data
        })
      },
    },
  }
</script>
