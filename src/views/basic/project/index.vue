<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryParams">
      <el-form-item>
        <el-input v-model="queryParams.entrustunitname" clearable placeholder="委托单位名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.proname" clearable placeholder="工程名称" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.pronum" clearable placeholder="工程编码" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <!-- <el-button type="success" icon="el-icon-plus" @click="handleAdd">新增</el-button> -->
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" border :data="pageList">
      <el-table-column align="center" fixed="left" label="序号" type="index" width="50" />
      <el-table-column fixed="left" header-align="center" label="委托单位" prop="entunit" width="150" />
      <el-table-column fixed="left" header-align="center" label="工程名称" prop="proname" width="150" />
      <el-table-column header-align="center" label="送样人" prop="sendName" width="150" />
      <el-table-column header-align="center" label="见证单位" prop="witnessUnitName" width="150" />
      <el-table-column header-align="center" label="建设单位" prop="buildUnitName" width="150" />
      <el-table-column header-align="center" label="施工单位" prop="construcUnitName" width="150" />
      <el-table-column header-align="center" label="监理单位" prop="supervisorUnitName" width="150" />
      <el-table-column header-align="center" label="设计单位" prop="designUnitName" width="150" />
      <el-table-column header-align="center" label="监督单位" prop="monitorNuitName" width="150" />
      <el-table-column header-align="center" label="取样单位" prop="sampUnitName" width="150" />
      <el-table-column header-align="center" label="见证人" prop="witName" width="150" />
      <el-table-column header-align="center" label="工程监理人" prop="superName" width="150" />
      <el-table-column header-align="center" label="质量监督员" prop="insName" width="150" />
      <el-table-column header-align="center" label="取样人" prop="recName" width="150" />
      <el-table-column header-align="center" label="工程所在地址" prop="proadd" width="350" />
      <el-table-column header-align="center" label="工程所属区域" prop="proarea" width="350" />
      <el-table-column align="center" label="工程状态" prop="prostatus" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.prostatus == 0" type="success">正常</el-tag>
          <el-tag v-else type="info">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="工程收费方式" prop="prochargtypeName" width="150" />
      <el-table-column header-align="center" label="工程需要工期" prop="prototaldata" width="150" />
      <el-table-column header-align="center" label="费用信用等级" prop="procredlev" width="150" />
      <el-table-column header-align="center" label="结构类型" prop="prostruttypeName" width="150" />
      <el-table-column header-align="center" label="工程监督备案号" prop="proputid" width="150" />
      <el-table-column header-align="center" label="邮箱" prop="proemail" width="150" />
      <el-table-column header-align="center" label="报告发送方式" prop="sendrep" width="150" />
      <el-table-column align="center" label="创建时间" prop="gmtCreate" width="180" />
      <el-table-column align="center" label="更新时间" prop="gmtModified" width="180" />
      <el-table-column align="center" label="创建者" prop="crtUser" width="100" />
      <el-table-column align="center" label="更新者" prop="uptUser" width="100" />
      <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" header-align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="text" @click="handleUpdate(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :limit.sync="pagination.limit" :page.sync="pagination.page" :total="pagination.total" @pagination="handleQuery" />
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="200">
      <el-form ref="form" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="委托单位" prop="entunitnum">
          <el-select v-model="form.entunitnum" filterable placeholder="请选择委托单位" style="width: 100%">
            <el-option v-for="item in entrustOptions" :key="item.idStr" :label="item.label" :value="item.idStr" />
          </el-select>
        </el-form-item>
        <el-form-item label="工程名称" prop="proname">
          <el-input v-model="form.proname" placeholder="请输入工程名称" />
        </el-form-item>
        <el-form-item label="送样人" prop="sendid">
          <el-select v-model="form.sendid" filterable placeholder="请选择送样人" style="width: 100%">
            <el-option v-for="item in userOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="见证单位" prop="witnessUnitNum">
          <el-select v-model="form.witnessUnitNum" filterable placeholder="请选择见证单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="建设单位" prop="buildUnitNum">
          <el-select v-model="form.buildUnitNum" filterable placeholder="请选择见证单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="施工单位" prop="construcUnitNum">
          <el-select v-model="form.construcUnitNum" filterable placeholder="请选择施工单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="监理单位" prop="supervisorUnitNum">
          <el-select v-model="form.supervisorUnitNum" filterable placeholder="请选择监理单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="设计单位" prop="designUnitNum">
          <el-select v-model="form.designUnitNum" filterable placeholder="请选择设计单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="监督单位" prop="monitorNuitNum">
          <el-select v-model="form.monitorNuitNum" filterable placeholder="请选择监督单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="取样单位" prop="sampUnitNum">
          <el-select v-model="form.sampUnitNum" filterable placeholder="请选择取样单位" style="width: 100%">
            <el-option v-for="item in unitOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="见证员" prop="witid">
          <el-select v-model="form.witid" filterable placeholder="请选择见证员" style="width: 100%">
            <el-option v-for="item in userOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="工程监理员" prop="superid">
          <el-select v-model="form.superid" filterable placeholder="请选择工程监理员" style="width: 100%">
            <el-option v-for="item in userOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="质量监督员" prop="insid">
          <el-select v-model="form.insid" filterable placeholder="请选择质量监督员" style="width: 100%">
            <el-option v-for="item in userOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="取样员" prop="recid">
          <el-select v-model="form.recid" filterable placeholder="请选择取样员" style="width: 100%">
            <el-option v-for="item in userOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="工程所在地址" prop="proadd">
          <el-input v-model="form.proadd" placeholder="请输入工程所在地址" />
        </el-form-item>
        <el-form-item label="工程所属区域" prop="proarea">
          <el-input v-model="form.proarea" placeholder="请输入工程所属区域" />
        </el-form-item>
        <el-form-item label="工程状态" prop="prostatus">
          <el-radio-group v-model="form.prostatus">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工程收费方式" prop="prochargtype">
          <el-select v-model="form.prochargtype" filterable placeholder="请选择工程收费方式" style="width: 100%">
            <el-option v-for="item in prochargtypeOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="工程需要工期" prop="prototaldata">
          <el-date-picker
            v-model="form.prototaldata"
            end-placeholder="工程结束日期"
            range-separator="-"
            start-placeholder="工程开始日期"
            type="daterange"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="费用信用等级" prop="procredlev">
          <el-select v-model="form.procredlev" filterable placeholder="请选择费用信用等级" style="width: 100%">
            <el-option v-for="item in procredOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="结构类型" prop="prostruttype">
          <el-select v-model="form.prostruttype" filterable placeholder="请选择结构类型" style="width: 100%">
            <el-option v-for="item in structureOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="工程监督备案号" prop="proputid">
          <el-input v-model="form.proputid" placeholder="请输入单位邮箱" />
        </el-form-item>
        <el-form-item label="邮箱" prop="proemail">
          <el-input v-model="form.proemail" placeholder="请输入单位地址" />
        </el-form-item>
        <el-form-item label="报告发送方式" prop="sendrep">
          <el-select v-model="form.sendrep" filterable placeholder="请选择报告发送方式" style="width: 100%">
            <el-option v-for="item in reportOptions" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
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
  import { list, detail, update, add, del } from '@/api/basic/project'
  import { listDictItemByCode } from '@/api/system/dict-item'

  export default {
    data() {
      return {
        reportOptions: [], //报告发送方式
        structureOptions: [], //结构类型
        procredOptions: [], //费用信用等级
        prochargtypeOptions: [], //工程收费方式
        unitOptions: [], //单位
        userOptions: [], //人员
        entrustOptions: [], //委托单位
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
          proname: undefined,
          pronum: undefined,
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
      loadDatas() {
        // getEntrustSelectList().then((response) => {
        //   this.entrustOptions = response.data
        // })
        // getDeptUserTreeList().then(response => {
        //     this.userOptions = response.data;
        // });
        listDictItemByCode('report_type').then((response) => {
          this.reportOptions = response.data
        })
        listDictItemByCode('structure_type').then((response) => {
          this.structureOptions = response.data
        })
        listDictItemByCode('cost_credit_level').then((response) => {
          this.structureOptions = response.data
        })
      },
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
          title: '新增工程信息',
          visible: true,
        }
        this.form.entunitnum = this.entrustOptions[0].idStr
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
