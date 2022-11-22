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
          <el-button :disabled="disabled" icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
        </el-form-item>
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
        <el-table-column fixed="left" header-align="center" label="检测编码" prop="checknum" width="100" />
        <el-table-column fixed="left" header-align="center" label="检测名称" prop="checkname" width="150" />
        <el-table-column align="center" label="状态" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="检测说明" prop="checkexp" width="250" />
        <el-table-column align="center" label="创建时间" prop="gmtCreate" width="180" />
        <el-table-column align="center" label="更新时间" prop="gmtModified" width="180" />
        <el-table-column align="center" label="创建者" prop="crtUser" width="100" />
        <el-table-column align="center" label="更新者" prop="uptUser" width="100" />

        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button circle icon="el-icon-edit" plain size="mini" type="primary" @click="handleEdit(scope.row)" />
            <el-button circle icon="el-icon-delete" plain size="mini" type="danger" @click="handleDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />
      <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="700px">
        <el-form ref="form" label-width="120px" :model="form" :rules="rules">
          <el-form-item label="检测项目名称" prop="checkname">
            <el-input v-model="form.checkname" placeholder="请输入分类名称" />
          </el-form-item>

          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="显示顺序" prop="shownum">
            <el-input-number v-model="form.shownum" controls-position="right" :min="0" style="width: 100px" />
          </el-form-item>

          <el-form-item label="项目说明" prop="checkexp">
            <el-input v-model="form.checkexp" placeholder="请输入项目说明" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="dialog.visible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import { addItem, detail, delItem, getCheckItemList, updateItem, patchItem, getItemClassOptions } from '@/api/basic/check'

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
        tableHeight: 768,
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        // console.log("formheight:" + formHeight);
        this.tableHeight = window.innerHeight - 80 - 170
        window.scrollTo(0, 0)
      })
    },
    created() {
      this.loadItemClassOptions()
    },
    methods: {
      loadItemClassOptions() {
        this.itemClassOptions = []
        getItemClassOptions().then((response) => {
          this.itemClassOptions = response.data
          this.$forceUpdate()
        })
      },
      handleQuery() {
        this.queryParams.page = this.pagination.page
        this.queryParams.limit = this.pagination.limit
        this.queryParams.parentid = this.menu.id
        getCheckItemList(this.queryParams).then((response) => {
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
          parentid: this.menu.id,
          name: undefined,
        }
        this.handleQuery()
      },
      async handleAdd() {
        this.resetForm()
        this.dialog = {
          title: this.menuName + '新增项目检测信息',
          visible: true,
        }
      },
      handleStatusChange(row) {
        const text = row.status === 1 ? '启用' : '停用'
        this.$confirm('确认要"' + text + row.checkname + '"数据项吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(function () {
            return patchItem(row.id, {
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
      async handleEdit(row) {
        this.resetForm()
        this.dialog = {
          title: this.menuName + '编辑项目检测信息',
          visible: true,
        }
        const id = row.id
        detail(id).then((response) => {
          this.form = response.data
        })
      },
      handleSubmit: function () {
        this.form.parentid = this.menu.id
        if (this.form.id != undefined) {
          updateItem(this.form.id, this.form).then(() => {
            this.$message.success('修改成功')
            this.closeDialog()
            this.handleQuery()
          })
        } else {
          addItem(this.form).then(() => {
            this.$message.success('新增成功')
            this.closeDialog()
            this.handleQuery()
          })
        }
      },

      handleDelete(row) {
        const ids = [row.id || this.ids].join(',')
        this.$confirm('确认删除已选中的数据项？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delItem(ids).then(() => {
              this.$message.success('删除成功')
              this.handleQuery()
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
          menuId: this.menu.id,
          libnum: this.menu.libnum,
        }

        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      menuClick(row) {
        this.disabled = false
        this.menu = row
        this.menuName = '【' + this.menu.checkname + '】'
        this.pageList = []
        this.colunmList = []
        this.handleQuery()
      },
      resetPermission() {
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
