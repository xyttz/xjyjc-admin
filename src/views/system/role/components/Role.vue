<template>
  <div>
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="admin-line" />
          角色列表
        </b>
      </div>
      <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
        <el-form-item>
          <el-button icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="queryParams.name" clearable placeholder="角色名称" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" plain type="primary" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table ref="roleTable" v-loading="loading" border :data="pageList" highlight-current-row>
        <el-table-column align="center" width="55">
          <template slot-scope="scope">
            <el-radio v-model="checkedRoleId" :label="scope.row.id" @change="handleRowClick(scope.row)"><span></span></el-radio>
          </template>
        </el-table-column>

        <el-table-column label="角色名称" prop="name" />
        <el-table-column label="角色编码" prop="code" />
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button circle icon="el-icon-edit" plain size="mini" type="primary" @click.stop="handleEdit(scope.row)" />
            <el-button circle icon="el-icon-delete" plain size="mini" type="danger" @click.stop="handleDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />

      <!-- 角色弹窗 -->
      <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="450px">
        <el-form ref="form" label-width="80px" :model="form" :rules="rules" @close="closeDialog">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>

          <!-- <el-form-item label="角色编码" prop="code">
            <el-input v-model="form.code" placeholder="请输入角色编码" />
          </el-form-item> -->

          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" controls-position="right" :min="0" style="width: 100px" />
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import { getRolePageList, update, add, del } from '@/api/system/role'

  export default {
    name: 'Role',
    data() {
      return {
        checkedRoleId: undefined,
        forbidden: true,
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        queryParams: {
          queryMode: 'page',
          name: undefined,
        },
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
        },
        pageList: [],
        dialog: {
          title: undefined,
          visible: false,
        },
        // 表单参数
        form: {
          sort: 1,
          status: 1,
        },
        // 表单校验
        rules: {
          name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
          // code: [{ required: true, message: '角色编码不能为空', trigger: 'blur' }],
        },
      }
    },
    created() {
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        getRolePageList(this.queryParams).then((response) => {
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
        ;(this.queryParams.name = undefined), this.handleQuery()
      },
      // handleSelectionChange(selection) {
      //   console.log('1')
      //   this.ids = selection.map((item) => item.id)
      //   this.single = selection.length != 1
      //   this.multiple = !selection.length
      // },
      handleAdd() {
        this.resetForm()
        this.dialog = {
          title: '新增角色',
          visible: true,
        }
      },
      handleEdit(row) {
        this.resetForm()
        this.dialog = {
          title: '修改角色',
          visible: true,
        }
        this.form = row
      },
      handleDelete(row) {
        const ids = [row.id || this.ids].join(',')
        this.$confirm('确认删除已选中的数据项？', '警告', {
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
      handleSubmit: function () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const id = this.form.id
            if (id != undefined) {
              update(id, this.form).then(() => {
                this.$message.success('修改成功')
                this.dialog.visible = false
                this.handleQuery()
              })
            } else {
              add(this.form).then(() => {
                this.$message.success('新增成功')
                this.dialog.visible = false
                this.handleQuery()
              })
            }
          }
        })
      },
      resetForm() {
        this.form = {
          sort: 1,
          status: 1,
        }
      },
      closeDialog() {
        this.resetForm()
        this.dialog = {
          title: undefined,
          visible: false,
        }
      },
      handleRowClick(row) {
        this.checkedRoleId = row.id // 勾选行
        const currentRow = JSON.parse(JSON.stringify(row))
        this.$emit('roleClick', currentRow)
      },
    },
  }
</script>
