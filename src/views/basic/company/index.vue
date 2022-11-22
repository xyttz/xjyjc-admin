<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryParams">
      <el-form-item>
        <el-input v-model="queryParams.entrustunitname" clearable placeholder="委托单位名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.unitname" clearable placeholder="单位名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" border :data="pageList">
      <el-table-column align="center" fixed="left" type="selection" />
      <el-table-column align="center" fixed="left" label="序号" type="index" width="50" />
      <el-table-column fixed="left" header-align="center" label="委托单位" prop="entrustunitname" width="250" />
      <el-table-column fixed="left" header-align="center" label="单位编码" prop="unitnum" width="150" />
      <el-table-column fixed="left" header-align="center" label="单位名称" prop="unitname" width="250" />
      <el-table-column header-align="center" label="单位类型" prop="unittypename" width="150" />
      <el-table-column header-align="center" label="联系人" prop="unitman" width="150" />
      <el-table-column align="right" header-align="center" label="联系人手机" prop="unitmanmob" width="150" />
      <el-table-column align="center" label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.deleted == 0" type="success">正常</el-tag>
          <el-tag v-else type="info">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right" header-align="center" label="联系人电话" prop="unitmantel" width="150" />
      <el-table-column align="right" header-align="center" label="单位传真号" prop="unitfax" width="150" />
      <el-table-column header-align="center" label="单位邮箱" prop="unitemail" width="150" />
      <el-table-column header-align="center" label="单位地址" prop="unitaddress" width="350" />
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
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="200">
      <el-form ref="form" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="委托单位" prop="entrustunitnum">
          <el-select v-model="form.entrustunitnum" placeholder="请选择委托单位" style="width: 100%">
            <el-option v-for="item in entrustOptions" :key="item.idStr" :label="item.label" :value="item.idStr" />
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitname">
          <el-input v-model="form.unitname" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="单位类型" prop="unittype">
          <el-select v-model="form.unittype" placeholder="请选择单位类型" style="width: 100%">
            <el-option v-for="item in unittypeOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="unitman">
          <el-input v-model="form.unitman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系人手机" prop="unitmanmob">
          <el-input v-model="form.unitmanmob" placeholder="请输入联系人手机" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="unitmantel">
          <el-input v-model="form.unitmantel" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="单位传真号" prop="unitfax">
          <el-input v-model="form.unitfax" placeholder="请输入单位传真号" />
        </el-form-item>
        <el-form-item label="单位邮箱" prop="unitemail">
          <el-input v-model="form.unitemail" placeholder="请输入单位邮箱" />
        </el-form-item>
        <el-form-item label="单位地址" prop="unitaddress">
          <el-input v-model="form.unitaddress" placeholder="请输入单位地址" />
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
  import { list, detail, update, add, del } from '@/api/basic/company'
  import { listDictItemByCode } from '@/api/system/dict-item'

  export default {
    data() {
      return {
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
          entrustunitname: undefined,
          unitname: undefined,
          unittype: undefined,
          unitmanmob: undefined,
          unitaddress: undefined,
        },
        form: {},
        rules: {
          entrustunitnum: [
            {
              required: true,
              message: '请选择委托单位',
              trigger: 'blur',
            },
          ],
          unitname: [
            {
              required: true,
              message: '请输入菜单名称',
              trigger: 'blur',
            },
          ],
          unittype: [
            {
              required: true,
              message: '请选择单位类型',
              trigger: 'blur',
            },
          ],
          unitman: [
            {
              required: true,
              message: '请输入联系人',
              trigger: 'blur',
            },
          ],
          unitmanmob: [
            {
              required: true,
              message: '请输入联系人电话',
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
      this.loadDatas()
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
        this.form.entrustunitnum = this.entrustOptions[0].idStr
      },
      loadDatas() {
        // getEntrustSelectList().then((response) => {
        //   this.entrustOptions = response.data
        // })
        listDictItemByCode('unit_type').then((response) => {
          this.unittypeOptions = response.data
        })
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
    },
  }
</script>
