<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
      <el-form-item>
        <el-button icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
        <el-button :disabled="single" icon="el-icon-delete" type="danger" @click="handleDelete">删除</el-button>
      </el-form-item>

      <el-form-item prop="name">
        <el-input v-model="queryParams.name" clearable placeholder="字典名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table ref="table" v-loading="loading" border :data="pageList" size="mini" @row-click="handleRowClick" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column label="字典名称" prop="name" width="120" />
      <el-table-column label="字典编码" prop="code" />
      <el-table-column align="center" label="状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" size="mini" @change="handleStatusChange(scope.row)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button circle icon="el-icon-edit" plain size="mini" type="primary" @click.stop="handleUpdate(scope.row)" />
          <el-button circle icon="el-icon-delete" plain size="mini" type="danger" @click.stop="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />

    <!-- 弹窗表单 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="500px" @close="closeDialog">
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入字典编码" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入内容" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { add, del, detail, getDictPageList, patch, update } from '@/api/system/dict'

  export default {
    name: 'DictComponent',
    data() {
      return {
        loading: true,
        ids: [],
        single: true,
        multiple: true,
        queryParams: {
          name: undefined,
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
        form: {
          status: 1,
        },
        rules: {
          name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
          code: [{ required: true, message: '请输入字典编码', trigger: 'blur' }],
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
        getDictPageList(this.queryParams).then((response) => {
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
          queryMode: 'page',
        }
        this.handleQuery()
      },
      handleRowClick(row) {
        this.$emit('dictClick', row)
      },
      handleSelectionChange(selection) {
        this.ids = selection.map((item) => item.id)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      handleStatusChange(row) {
        const text = row.status === 1 ? '启用' : '停用'
        this.$confirm('确认要"' + text + row.name + '"数据项吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(function () {
            return patch(row.id, 1, { status: row.status })
          })
          .then(() => {
            this.$message.success(text + '成功')
          })
          .catch(function () {
            row.status = row.status === 1 ? 0 : 1
          })
      },

      handleAdd() {
        this.resetForm()
        this.dialog = {
          title: '新增字典',
          visible: true,
        }
      },

      handleUpdate(row) {
        this.resetForm()
        this.dialog = {
          title: '修改字典',
          visible: true,
        }
        const id = row.id || this.ids
        detail(id).then((response) => {
          this.form = response.data
        })
      },

      handleSubmit: function () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const id = this.form.id
            if (id != undefined) {
              update(id, this.form).then(() => {
                this.$message.success('修改成功')
                this.closeDialog()
                this.handleQuery()
              })
            } else {
              add(this.form).then(() => {
                this.$message.success('新增成功')
                this.closeDialog()
                this.handleQuery()
              })
            }
          }
        })
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
              this.$emit('resetItem')
            })
          })
          .catch(() => this.$message.info('已取消删除'))
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
          status: 1,
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
    },
  }
</script>

<style scoped></style>
