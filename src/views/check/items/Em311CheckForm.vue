<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="12" style="background-color: #2b508a; color: #fff">委托项目-水泥物理性能</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked3" disabled>安全性</el-checkbox></td>
          <td><el-checkbox v-model="checked5" disabled>抗折强度</el-checkbox></td>
          <td><el-checkbox v-model="checked6">抗压强度</el-checkbox></td>
          <td colspan="10" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td colspan="2" style="width: 300px">{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td colspan="2" style="width: 300px">
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td colspan="2"><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /></td>
          <td class="td_right">代号：</td>
          <td colspan="2" style="width: 200px">
            <el-select v-model="form.cPaihao" placeholder="请选择代号" style="width: 200px">
              <el-option v-for="item in cPaihaoOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">强度等级：</td>
          <td colspan="3">
            <el-select v-model="form.cGrade" placeholder="请选择强度等级" style="width: 200px">
              <el-option v-for="item in cGradeOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">品种：</td>
          <td colspan="2" style="width: 300px">
            <el-select v-model="form.szVar" placeholder="请选择品种" style="width: 200px">
              <el-option v-for="item in szVarOptions" :key="item.name" :label="item.name" :value="item.value" />
            </el-select>
          </td>
          <td class="td_right">出厂编号：</td>
          <td colspan="2" style="width: 200px"><el-input v-model="form.sbiao" placeholder="出厂编号" style="width: 200px" /></td>
          <td class="td_right">代表批量：</td>
          <td colspan="3"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td colspan="2" style="width: 200px"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 200px" /></td>
          <td class="td_right">样品数量：</td>
          <td colspan="2"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">工程编码：</td>
          <td colspan="3"><el-input-number v-model="form.pronum" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="12">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="12">强度实验</th>
                </tr>
                <tr>
                  <td class="td_right">用水量(mL)：</td>
                  <td colspan="2"><el-input v-model="form.ylsyl" /></td>
                  <td class="td_right">水泥用量(g)：</td>
                  <td colspan="2"><el-input v-model="form.ylcyl" /></td>
                  <td class="td_right">水灰比：</td>
                  <td colspan="2"><el-input v-model="form.shb" /></td>
                  <td class="td_right">砂用量(g)：</td>
                  <td colspan="2"><el-input v-model="form.ylszyl" /></td>
                </tr>
                <tr>
                  <td class="td_right">成型时间：</td>
                  <td colspan="2"><el-input v-model="form.chxDate1" /></td>
                  <td class="td_right">流动度(mm)：单个值1：</td>
                  <td colspan="2"><el-input v-model="form.ldd1" /></td>
                  <td class="td_right">单个值2：</td>
                  <td colspan="2"><el-input v-model="form.ldd2" /></td>
                  <td class="td_right">平均值：</td>
                  <td colspan="2"><el-input v-model="form.ylszyl" /></td>
                </tr>
                <tr>
                  <td class="td_right">6h破型时间：</td>
                  <td colspan="2"><el-input v-model="form.pxsDate" /></td>
                  <td class="td_right">1d破型时间：</td>
                  <td colspan="2"><el-input v-model="form.pxoDate" /></td>
                  <td class="td_right">3d破型时间：</td>
                  <td colspan="2"><el-input v-model="form.pxeDate" /></td>
                  <td class="td_right">28d破型时间：</td>
                  <td colspan="2"><el-input v-model="form.pxteDate" /></td>
                </tr>
                <tr>
                  <th class="th_center">项目</th>
                  <th class="th_center" colspan="4">抗折强度</th>
                  <th class="th_center" colspan="7">抗压强度</th>
                </tr>
                <tr>
                  <th class="th_center">龄期</th>
                  <th class="th_center" colspan="3">测定值（MPa）</th>
                  <th class="th_center">平均值</th>
                  <th class="th_center" colspan="3">荷载值（kN）</th>
                  <th class="th_center" colspan="3">个别强度（MPa）</th>
                  <th class="th_center">平均值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center" rowspan="2"><el-link disabled>6h检测值</el-link></td>
                  <td class="td_center" rowspan="2" style="width: 8%"><el-input v-model="form.zmpas1" /></td>
                  <td class="td_center" rowspan="2" style="width: 8%"><el-input v-model="form.zmpas2" /></td>
                  <td class="td_center" rowspan="2" style="width: 8%"><el-input v-model="form.zmpas3" /></td>
                  <td class="td_center" rowspan="2" style="width: 8%"><el-input v-model="form.zmpasavg" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.yls1" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.yls2" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.yls3" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.mpas1" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.mpas2" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.mpas3" /></td>
                  <td class="td_center" rowspan="2" style="width: 8%"><el-input v-model="form.mpasavg" /></td>
                </tr>
                <tr>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.yls4" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.yls5" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.yls6" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.mpas4" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.mpas5" /></td>
                  <td class="td_center" style="width: 8%"><el-input v-model="form.mpas6" /></td>
                </tr>
                <tr>
                  <td class="td_center" rowspan="2"><el-link disabled>1d检测值</el-link></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpao1" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpao2" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpao3" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpaoavg" /></td>
                  <td class="td_center"><el-input v-model="form.ylo1" /></td>
                  <td class="td_center"><el-input v-model="form.ylo2" /></td>
                  <td class="td_center"><el-input v-model="form.ylo3" /></td>
                  <td class="td_center"><el-input v-model="form.mpao1" /></td>
                  <td class="td_center"><el-input v-model="form.mpao2" /></td>
                  <td class="td_center"><el-input v-model="form.mpao3" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.mpaoavg" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-input v-model="form.ylo4" /></td>
                  <td class="td_center"><el-input v-model="form.ylo5" /></td>
                  <td class="td_center"><el-input v-model="form.ylo6" /></td>
                  <td class="td_center"><el-input v-model="form.mpao4" /></td>
                  <td class="td_center"><el-input v-model="form.mpao5" /></td>
                  <td class="td_center"><el-input v-model="form.mpao6" /></td>
                </tr>
                <tr>
                  <td class="td_center" rowspan="2"><el-link disabled>3d检测值</el-link></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpat1" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpat2" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpat3" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpatavg" /></td>
                  <td class="td_center"><el-input v-model="form.ylt1" /></td>
                  <td class="td_center"><el-input v-model="form.ylt2" /></td>
                  <td class="td_center"><el-input v-model="form.ylt3" /></td>
                  <td class="td_center"><el-input v-model="form.mpat1" /></td>
                  <td class="td_center"><el-input v-model="form.mpat2" /></td>
                  <td class="td_center"><el-input v-model="form.mpat3" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.mpatavg" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-input v-model="form.ylt4" /></td>
                  <td class="td_center"><el-input v-model="form.ylt5" /></td>
                  <td class="td_center"><el-input v-model="form.ylt6" /></td>
                  <td class="td_center"><el-input v-model="form.mpat4" /></td>
                  <td class="td_center"><el-input v-model="form.mpat5" /></td>
                  <td class="td_center"><el-input v-model="form.mpat6" /></td>
                </tr>
                <tr>
                  <td class="td_center" rowspan="2"><el-link disabled>28d检测值</el-link></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpate1" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpate2" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpate3" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.zmpateavg" /></td>
                  <td class="td_center"><el-input v-model="form.ylte1" /></td>
                  <td class="td_center"><el-input v-model="form.ylte2" /></td>
                  <td class="td_center"><el-input v-model="form.ylte3" /></td>
                  <td class="td_center"><el-input v-model="form.mpate1" /></td>
                  <td class="td_center"><el-input v-model="form.mpate2" /></td>
                  <td class="td_center"><el-input v-model="form.mpate3" /></td>
                  <td class="td_center" rowspan="2"><el-input v-model="form.mpateavg" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-input v-model="form.ylte4" /></td>
                  <td class="td_center"><el-input v-model="form.ylte5" /></td>
                  <td class="td_center"><el-input v-model="form.ylte6" /></td>
                  <td class="td_center"><el-input v-model="form.mpate4" /></td>
                  <td class="td_center"><el-input v-model="form.mpate5" /></td>
                  <td class="td_center"><el-input v-model="form.mpate6" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="11">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="11"><el-input v-model="form.conclusioncode" /></td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="11"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="3"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right" colspan="2">所用检测设备使用前状态：</td>
                <td colspan="6"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="3"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right" colspan="2">所用检测设备使用后状态：</td>
                <td colspan="6"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="4"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td colspan="2"><el-input v-model="form.temperature" /></td>
                <td class="td_right">湿度%：</td>
                <td colspan="3"><el-input v-model="form.humidity" /></td>
              </tr>
              <tr>
                <td class="td_right">检测标准：</td>
                <td colspan="11"><el-input v-model="form.standname" /></td>
              </tr>
              <tr>
                <td class="td_right">评定标准：</td>
                <td colspan="11"><el-input v-model="form.pdstandardname" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="11" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td class="td_right">复核人：</td>
          <td colspan="2">{{ form.collateman }}</td>
          <td class="td_right">复核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td colspan="2">{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td colspan="2">{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td colspan="2">{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td colspan="2">{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td colspan="2">{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td colspan="2"><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td colspan="2">{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td colspan="2"><el-date-picker v-model="form.printdate" placeholder="选择打印日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td colspan="2">{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td colspan="2"><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td colspan="3">{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td colspan="3"><el-date-picker v-model="form.getdate" placeholder="选择收样时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">收样地点：</td>
          <td colspan="3"><el-input v-model="form.getadd" /></td>
        </tr>
        <tr>
          <td class="td_right">检测人：</td>
          <td>{{ form.chkid }}</td>
          <td class="td_right">检测时间：</td>
          <td><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测地点：</td>
          <td colspan="3"><el-input v-model="form.chkadd" /></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">商标：</td>
          <td colspan="3"><el-input v-model="form.wd" style="width: 200px" /></td>
          <td class="td_right">取样地点：</td>
          <td colspan="3"><el-input v-model="form.recadd" /></td>
          <td class="td_right">供销单位：</td>
          <td colspan="3"><el-input v-model="form.bcFuc" /></td>
        </tr>
        <tr>
          <td colspan="12" style="text-align: right">
            <el-button v-permissions="['chk:form:get']" type="primary" @click="handleSubmit('get')">收样提交</el-button>
            <el-button v-permissions="['chk:form:check']" type="primary" @click="handleSubmit('check')">检测提交</el-button>
            <el-button v-permissions="['chk:form:recheck']" type="primary" @click="handleSubmit('recheck')">复核提交</el-button>
            <el-button v-permissions="['chk:form:review']" type="primary" @click="handleSubmit('review')">校核提交</el-button>
            <el-button v-permissions="['chk:form:audit']" type="primary" @click="handleSubmit('audit')">审核提交</el-button>
            <el-button v-permissions="['chk:form:approve']" type="primary" @click="handleSubmit('approve')">批准提交</el-button>
            <el-button v-permissions="['chk:form:print']" type="primary" @click="handleSubmit('print')">打印批准</el-button>
            <el-button v-permissions="['chk:form:relase']" type="primary" @click="handleSubmit('relase')">发布批准</el-button>
          </td>
        </tr>
      </table>
    </el-form>
  </div>
</template>
<script>
  import { getByEntkey, checkSubmit } from '@/api/check/check'
  import { listDictItemByCode } from '@/api/system/dict-item'
  import { getStandardTableList, getStandardColunmList } from '@/api/basic/standard'
  export default {
    name: 'Em311CheckForm',
    data() {
      return {
        szVarOptions: [],
        gcIdOptions: [],
        sampleStatusOptions: [],
        cPaihaoOptions: [],
        cGradeOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '311',
      }
    },
    watch: {
      $route(val, oldval) {
        console.log('val:' + val + 'oldval' + oldval)
        this.loadData()
      },
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.entkey = this.$route.query.entkey
        console.log('entkey:' + this.entkey)
        if (this.entkey) {
          getByEntkey(this.entkey, this.pathType).then((response) => {
            this.form = response.data
            console.log(JSON.stringify(this.form))
            // this.pronum = this.form.pronum
            this.initData()
          })
        }
      },
      initData() {
        listDictItemByCode('SAMPLESTATUS').then((response) => {
          this.sampleStatusOptions = response.data
        })
        listDictItemByCode('CPAIHAO').then((response) => {
          this.cPaihaoOptions = response.data
        })
        listDictItemByCode('C_grade').then((response) => {
          this.cGradeOptions = response.data
        })
        listDictItemByCode('sz_var311').then((response) => {
          this.szVarOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'CEMT' }
        getStandardColunmList(libParas).then((response) => {
          const colunmList = response.data
          if (colunmList.length > 0) {
            libParas.cols = colunmList.map((item) => item.datacol).join(',')
            getStandardTableList(libParas).then((response) => {
              this.gcIdOptions = response.data
            })
          }
          this.loading = false
        })
      },
      handleSubmit: function (oprtype) {
        let tipName = ''
        if (oprtype == 'review') tipName = '校核'
        if (oprtype == 'report') tipName = '检测报告审核'
        if (oprtype == 'print') tipName = '打印报告审核'
        if (oprtype == 'recheck') tipName = '复核'
        if (oprtype == 'audit') tipName = '审核'
        if (oprtype == 'approve') tipName = '批准'
        if (oprtype == 'get') tipName = '收样'
        if (oprtype == 'check') tipName = '检测'
        const Loading = this.$baseLoading(5)
        checkSubmit(this.entkey, this.form, this.pathType, oprtype).then(
          (response) => {
            console.log('reload entkey:' + this.entkey)
            getByEntkey(this.entkey, this.pathType).then((response) => {
              this.form = response.data
              // this.pronum = this.form.pronum
            })
            this.$notify.success(tipName + '成功' + response.msg)
            Loading.close()
          },
          (err) => {
            this.$notify.error(err)
            Loading.close()
          }
        )
      },
      handleGcIdChange: function (item) {
        this.$set(this.form, 'dmin', item.f1)
        this.$set(this.form, 'dmax', item.f2)
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
  .td_center {
    text-align: center;
  }
  .th_center {
    text-align: center;
  }
  .col1 {
    widows: 100px;
  }
  .tableHeader {
    border-bottom: 1px solid #ddd;
    // background: rgb(64, 158, 255);
    // color: #fff;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    // font-family: HiraginoSansGB-W3;
    // font-weight: 600;
    padding: 0 20px;
  }
  .tableHeader span {
    width: 80px;
    text-align: center;
  }
  .el-select-dropdown__item span {
    width: 80px;
    text-align: center;
  }
</style>
