<template>
  <div class="menu-container">
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="menu-2-fill" />
          技术指标列表
        </b>
      </div>
      <!-- 搜索技术指标 -->
      <el-form ref="queryForm" :inline="true" :model="queryParams" size="mini">
        <el-form-item>
          <el-button icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryParams.name" clearable placeholder="技术指标名称" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table v-loading="loading" border :data="tableList" highlight-current-row row-key="id" size="mini" @row-click="handleRowClick">
        <el-table-column header-align="center" label="技术指标名称">
          <template slot-scope="scope">
            <vab-icon :icon="'file-list-2-line'" />
            {{ scope.row.libname }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="70">
          <template slot-scope="scope">
            <el-button circle icon="el-icon-edit" plain size="mini" type="primary" @click.stop="handleEdit(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="pagination.total > 0"
        layout="total, prev, pager, next"
        :limit.sync="pagination.limit"
        :page.sync="pagination.page"
        :pager-count="5"
        :total="pagination.total"
        @pagination="handleQuery"
      />
    </el-card>
    <!-- dialog -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="200">
      <el-form ref="form" label-width="110px" :model="form" :rules="rules">
        <el-form-item label="标准类别编号" prop="libnum">
          <el-input v-model="form.libnum" placeholder="请输入标准类别编号" />
        </el-form-item>

        <el-form-item label="标准名称" prop="libname">
          <el-input v-model="form.libname" placeholder="请输入菜单名称" />
        </el-form-item>

        <el-form-item label="是否启用" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" :min="0" style="width: 100px" />
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
  import { getMenuTableList, add, patch, update } from '@/api/basic/standard'

  export default {
    name: 'Menu',
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
        tableList: [],
        dialog: {
          title: undefined,
          visible: false,
        },
        form: {
          libnum: undefined,
          libname: undefined,
          status: undefined,
          sort: 1,
        },
        rules: {
          libnum: [
            {
              required: true,
              message: '请选择顶级菜单',
              trigger: 'blur',
            },
          ],
          libname: [
            {
              required: true,
              message: '请输入菜单名称',
              trigger: 'blur',
            },
          ],
        },
        title: '新增技术指标信息',
        menuOptions: [],
        currentRow: undefined,
      }
    },
    created() {
      // this.loadMenuOptions()
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        this.resetForm()
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        getMenuTableList(this.queryParams).then((response) => {
          this.tableList = response.data
          this.pagination.total = response.total
          this.loading = false
        })
      },
      handleReset() {
        this.queryParams.name = undefined
        this.handleQuery()
      },
      handleRowClick(row) {
        const currentRow = JSON.parse(JSON.stringify(row))
        this.currentRow = currentRow
        this.form = currentRow
        this.title = '修改菜单'
        this.$emit('menuClick', row)
      },
      handleStatusChange(row) {
        const text = row.status === '1' ? '启用' : '停用'
        this.$confirm('确认要"' + text + row.libname + '"数据项吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(function () {
            return patch(row.id, {
              status: row.status,
            })
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
          title: '新增技术指标信息',
          visible: true,
        }
        this.title = '新增技术指标信息'
      },
      handleEdit(row) {
        this.resetForm()
        this.dialog = {
          title: '修改技术指标信息',
          visible: true,
        }
        this.form = JSON.parse(JSON.stringify(row))
      },
      handleSubmit: function () {
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
      resetForm() {
        this.form = {
          libnum: undefined,
          libname: undefined,
          status: undefined,
          sort: 1,
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      closeDialog() {
        this.resetForm()
        this.dialog = {
          title: undefined,
          visible: false,
        }
      },
    },
  }
</script>

<style scoped>
  .menu-container {
    position: relative;
    margin: 0px 10px 0px 0px;
  }
</style>
