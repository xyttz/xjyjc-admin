<template>
  <div class="perm-container">
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="menu-2-fill" />
          {{ menuName }}
        </b>
      </div>
      <el-button :disabled="disabled" icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
      <!-- 数据表格 -->
      <el-table ref="table" v-loading="loading" border :data="pageList" :max-height="tableHeight" size="mini">
        <el-table-column align="center" fixed="left" label="序号" type="index" width="50" />
        <template v-for="col in colunmList">
          <el-table-column :key="col.datacol" header-align="center" :label="col.showcol" :prop="col.datacol" :show-overflow-tooltip="true" />
        </template>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button circle icon="el-icon-edit" plain size="mini" type="primary" @click="handleEdit(scope.row)" />
            <el-button circle icon="el-icon-delete" plain size="mini" type="danger" @click="handleDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="700px">
        <el-form ref="form" label-width="120px" :model="form" :rules="rules">
          <el-form-item v-for="formcol in colunmList" :key="formcol.datacol" :label="formcol.showcol">
            <el-input v-model="form[formcol.datacol]" :placeholder="'请输入' + formcol.showcol" @input="change($event)" />
          </el-form-item>
          <el-form-item label="显示顺序" prop="shownum">
            <el-input-number v-model="form.shownum" controls-position="right" :min="0" style="width: 100px" />
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
  import { addStard, delStard, detailStard, getStandardTableList, getStandardColunmList, updateStard } from '@/api/basic/standard'

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
        libParas: {
          libnum: undefined,
          cols: [],
        },
        dialog: {
          title: undefined,
          visible: false,
        },
        form: {
          shownum: 0,
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
    methods: {
      change() {
        this.$forceUpdate()
      },
      handleQuery() {
        this.libParas.libnum = this.menu.libnum
        getStandardColunmList(this.libParas).then((response) => {
          this.colunmList = response.data
          if (this.colunmList.length > 0) {
            this.colunmList.forEach((item) => {
              this.$set(this.form, item.datacol, '')
            })
            this.disabled = false
            this.libParas.cols = this.colunmList.map((item) => item.datacol).join(',')
            getStandardTableList(this.libParas).then((response) => {
              this.pageList = response.data
              this.loading = false
            })
          }
          this.loading = false
        })
      },
      handleReset() {
        this.handleQuery()
      },
      async handleAdd() {
        this.resetForm()
        this.dialog = {
          title: this.menuName + '新增指标',
          visible: true,
        }
      },
      async handleEdit(row) {
        this.resetForm()
        this.dialog = {
          title: this.menuName + '编辑指标',
          visible: true,
        }
        const id = row.id
        detailStard(id).then((response) => {
          this.form = response.data
        })
      },
      handleSubmit: function () {
        this.form.libnum = this.menu.libnum
        debugger
        if (this.form.id != undefined) {
          updateStard(this.form.id, this.form).then(() => {
            this.$message.success('修改成功')
            this.closeDialog()
            this.handleQuery()
          })
        } else {
          addStard(this.form).then(() => {
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
            delStard(ids).then(() => {
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
        this.menu = row
        this.menuName = '【' + this.menu.libname + '】'
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
