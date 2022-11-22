<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryParams">
      <el-form-item>
        <el-input v-model="queryParams.entunit" clearable placeholder="委托单位名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.entunitman" clearable placeholder="联系人" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.entmanmob" clearable placeholder="联系人手机" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.entunitadd" clearable placeholder="委托单位地址" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.entemail" clearable placeholder="单位邮箱" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" border :data="pageList">
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
        <el-form-item label="委托单位" prop="entunit">
          <el-input v-model="form.entunit" placeholder="请输入委托单位名称" />
        </el-form-item>
        <el-form-item label="关联部门" prop="reldepts">
          <tree-select v-model="form.deptIds" :multiple="true" :options="deptOptions" placeholder="请选择部门" :value-consists-of="valueConsistsOf" />
        </el-form-item>
        <el-form-item label="委托单位地址" prop="entunitadd">
          <el-input v-model="form.entunitadd" placeholder="请输入委托单位地址" />
        </el-form-item>
        <el-form-item label="联系人" prop="entunitman">
          <el-input v-model="form.entunitman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="form.entmantel" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="联系人手机" prop="entmanmob">
          <el-input v-model="form.entmanmob" placeholder="请输入联系人手机" />
        </el-form-item>
        <el-form-item label="传真号">
          <el-input v-model="form.entfax" placeholder="请输入传真号" />
        </el-form-item>
        <el-form-item label="单位邮箱" prop="entemail">
          <el-input v-model="form.entemail" placeholder="请输入单位邮箱" />
        </el-form-item>
        <el-form-item label="委托开始/结束日期" prop="entDateRange">
          <el-date-picker
            v-model="form.entDateRange"
            end-placeholder="委托结束日期"
            range-separator="-"
            start-placeholder="委托开始日期"
            type="daterange"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="开户行" prop="accbank">
          <el-input v-model="form.accbank" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="开户名称" prop="namebank">
          <el-input v-model="form.namebank" placeholder="请输入开户名称" />
        </el-form-item>
        <el-form-item label="银行账号" prop="crdbank">
          <el-input v-model="form.crdbank" placeholder="请输入银行账号" />
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
  import { list, detail, update, add, del } from '@/api/basic/entrust'
  import { getDeptSelectList } from '@/api/system/dept'
  import TreeSelect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: {
      TreeSelect,
    },
    data() {
      return {
        valueConsistsOf: 'LEAF_PRIORITY',
        deptOptions: [],
        entDateRange: [],
        entrustOptions: [],
        unittypeOptions: [],
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
          entunitadd: undefined,
          entunitman: undefined,
          entmantel: undefined,
          entmanmob: undefined,
          entfax: undefined,
          entemail: undefined,
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
          entunit: [
            {
              required: true,
              message: '请输入委托单位名称',
              trigger: 'blur',
            },
          ],
          entunitadd: [
            {
              required: true,
              message: '请输入委托单位地址',
              trigger: 'blur',
            },
          ],
          entunitman: [
            {
              required: true,
              message: '请输入联系人',
              trigger: 'blur',
            },
          ],
          entmanmob: [
            {
              required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur',
            },
          ],
          entemail: [
            {
              type: 'email',
              required: true,
              message: "'请输入正确的邮箱地址",
              trigger: ['blur', 'change'],
            },
          ],
          entDateRange: [
            {
              type: 'array',
              required: true,
              message: '请选择委托开始/结束日期',
              fields: {
                0: {
                  type: 'string',
                  required: true,
                  message: '请选择委托开始日期',
                },
                1: {
                  type: 'string',
                  required: true,
                  message: '请选择委托结束日期',
                },
              },
            },
          ],
          accbank: [
            {
              required: true,
              message: '请输入开户行',
              trigger: 'blur',
            },
          ],
          namebank: [
            {
              required: true,
              message: '请输入开户名称',
              trigger: 'blur',
            },
          ],
          crdbank: [
            {
              required: true,
              message: '请输入银行账号',
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
      }
    },
    async created() {
      this.handleQuery()
      getDeptSelectList().then((response) => {
        this.deptOptions = response.data
      })
    },
    methods: {
      handleQuery() {
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        list(this.queryParams).then((response) => {
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
      handleAdd() {
        this.resetForm()
        this.dialog = {
          title: '新增单位信息',
          visible: true,
        }
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
            if (this.form.entDateRange.length === 2) {
              this.form.entbegin = this.form.entDateRange[0]
              this.form.entend = this.form.entDateRange[1]
            }
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
    },
  }
</script>
