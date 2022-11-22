<template>
  <div class="app-container">
    <table style="width: 80%; border-collapse: collapse">
      <tr>
        <td class="td_right">当前工程编码：</td>
        <td colspan="3">AAA:</td>
        <td class="td_right">当前工程名称：</td>
        <td colspan="3">AAA:</td>
      </tr>
      <tr>
        <td class="td_right">缴费方式：</td>
        <td colspan="3">AAA:</td>
        <td class="td_right">委托单位：</td>
        <td colspan="3">AAA:</td>
      </tr>
      <tr>
        <td class="td_right">合同编号：</td>
        <td colspan="3">AAA:</td>
        <td class="td_right">监督备案号：</td>
        <td colspan="3">AAA:</td>
      </tr>
      <tr>
        <td class="td_right">最新编号：</td>
        <td>AAA:</td>
        <td class="td_right">委托编号：</td>
        <td>AAA:</td>
        <td class="td_right">样品：</td>
        <td>AAA:</td>
        <td class="td_right">报告：</td>
        <td>AAA:</td>
      </tr>
      <tr>
        <td class="td_right">检测子项目：</td>
        <td colspan="7">AAA:</td>
      </tr>
      <tr>
        <td colspan="8" style="padding: 0px">
          <project-info ref="project" />
        </td>
      </tr>
      <tr>
        <td colspan="8">样品信息</td>
      </tr>
      <tr>
        <td colspan="8">
          <el-form ref="form" :inline="true" label-width="150px" :model="form" size="small">
            <el-form-item label="样品编号" prop="sampnum">
              <el-input v-model="form.sampnum" style="width: 200px" />
            </el-form-item>
            <el-form-item label="委托编号" prop="entnum">
              <el-input v-model="form.entnum" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告编号" prop="repnum">
              <el-input v-model="form.repnum" style="width: 200px" />
            </el-form-item>
            <el-form-item label="结构部位" prop="structpart">
              <el-select v-model="form.structpart" placeholder="请选择结构部位" style="width: 560px">
                <el-option v-for="item in structOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="委托日期" prop="entdate">
              <el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="检验类别" prop="checktype">
              <el-select v-model="form.checktype" placeholder="请选择检验类别" style="width: 200px">
                <el-option v-for="item in checktypeOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="报告承诺天数" prop="repcondays">
              <el-input-number v-model="form.repcondays" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告承诺日期" prop="repcondate">
              <el-date-picker v-model="form.repcondate" placeholder="选择报告承诺日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="费用类别" prop="name">
              <el-input v-model="form.name" style="width: 200px" />
            </el-form-item>
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in sampleStatusOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="代表批量(个)" prop="name">
              <el-input-number v-model="form.sort" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="炉、批号" prop="pihao">
              <el-select v-model="form.pihao" placeholder="请选择炉、批号" style="width: 560px">
                <el-option v-for="item in batchNoOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="生产厂家" prop="unitnum">
              <el-select v-model="form.unitnum" placeholder="请选择生产厂家" style="width: 200px">
                <el-option v-for="item in factoryOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="钢筋类别" prop="gcId">
              <el-select v-model="form.gcId" placeholder="请选择钢筋类别" style="width: 200px">
                <el-option v-for="item in reinforcedCategoryOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="公称直径" prop="name">
              <el-input v-model="form.dMin" style="width: 92px" />
              ~
              <el-input v-model="form.dMax" style="width: 92px" />
            </el-form-item>
            <el-form-item label="焊接类型" prop="hjxs">
              <el-select v-model="form.hjxs" placeholder="请选择焊接类型" style="width: 200px">
                <el-option v-for="item in weldingTypeOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="焊工姓名" prop="hgname">
              <el-select v-model="form.hgname" placeholder="请选择焊工姓名" style="width: 200px">
                <el-option v-for="item in weldingUsersOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="焊工证号" prop="hgno">
              <el-select v-model="form.hgno" placeholder="请选择焊工证号" style="width: 200px">
                <el-option v-for="item in weldingNumbersOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="expl">
              <el-input v-model="form.expl" style="width: 560px" />
            </el-form-item>
            <el-form-item label="牌号" prop="paihao">
              <el-input v-model="form.paihao" style="width: 200px" />
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td colspan="8">附加信息</td>
      </tr>
      <tr>
        <td colspan="8">
          <el-form ref="attchForm" :inline="true" label-width="150px" :model="attchForm" size="small">
            <el-form-item label="母材单号" prop="name">
              <el-select v-model="form.unittype" placeholder="请选择母材单号" style="width: 200px">
                <el-option v-for="item in metalNumberOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="技术等级" prop="name">
              <el-select v-model="form.unittype" placeholder="请选择技术等级" style="width: 200px">
                <el-option v-for="item in technicalGradeOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="焊条型号" prop="name">
              <el-select v-model="form.unittype" placeholder="请选择焊条型号" style="width: 200px">
                <el-option v-for="item in electrodeModelOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="取样地点" prop="name">
              <el-select v-model="form.unittype" placeholder="请选择取样地点" style="width: 200px">
                <el-option v-for="item in SamplingLocationsOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td colspan="8" style="text-align: right">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import ProjectInfo from '@/views/entrust/components/ProjectInfo'
  import { detail } from '@/api/basic/project'
  export default {
    name: 'E304',
    components: {
      ProjectInfo,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        structOptions: [],
        checktypeOptions: [],
        sampleStatusOptions: [],
        batchNoOptions: [],
        factoryOptions: [],
        reinforcedCategoryOptions: [],
        weldingTypeOptions: [],
        weldingUsersOptions: [],
        weldingNumbersOptions: [],
        metalNumberOptions: [],
        technicalGradeOptions: [],
        electrodeModelOptions: [],
        SamplingLocationsOptions: [],
        loaded: false,
        projectdata: {
          witName: undefined,
        },
        form: {
          repcondays: 1,
          sampmout: 1,
          repcondate: '',
          entdate: '',
        },
        attchForm: {},
      }
    },
    computed: {
      timeNextday() {
        var date = new Date()
        var s1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1)
        return s1
      },
      timeDefault() {
        var date = new Date()
        var s1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        return s1
      },
    },
    created() {
      this.loadData()
    },
    mounted() {
      // 初始化查询，默认为前一天
      this.form.repcondate = this.timeNextday
      this.form.entdate = this.timeDefault
    },
    methods: {
      loadData() {
        // const checknum = this.$route.query.checknum
        const pronum = this.$route.query.pronum
        if (pronum) {
          detail(pronum).then((response) => {
            this.projectdata = response.data
            this.$refs.project.setProjectData(response.data)
            this.loaded = true
          })
        } else {
          this.loaded = true
        }
      },
      handleSubmit: function () {
        // this.$refs.form.validate((formValid) => {
        //     if (formValid) {
        //         this.$refs.attchForm.validate((attchValid) => {
        //             if (attchValid) {
        //                 this.openFullScreen()
        //                 let submitData = {}
        //                 const entrustid = this.$route.query.entrustid
        //                 if (entrustid) { // 编辑
        //                     updateEntrust(goodsId, submitData).then((res) => {
        //                         this.$router.push({
        //                             path: '/pms/goods'
        //                         })
        //                         this.$notify.success('修改商品成功')
        //                         this.closeFullScreen()
        //                     }, (err) => {
        //                         this.closeFullScreen()
        //                     })
        //                 } else { // 新增
        //                     addEntrust(submitData).then(response => {
        //                         this.$router.push({
        //                             path: '/pms/goods'
        //                         })
        //                         this.$notify.success('新增商品成功')
        //                         this.closeFullScreen()
        //                     }, (err) => {
        //                         this.closeFullScreen()
        //                     })
        //                 }
        //             }
        //         })
        //     }
        // })
      },
      openFullScreen: function () {
        this.loading = this.$loading({
          lock: true,
          text: '委托信息提交中，请等待...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      },
      closeFullScreen: function () {
        if (this.loading) {
          this.loading.close()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .box-card {
    padding: 10px;
  }

  th,
  td {
    padding: 10px;
    font-size: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .td_right {
    width: 140px;
    text-align: right;
  }
</style>
