<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="8" style="background-color: #2b508a; color: #fff">委托项目-环刀法测定土的密度（国标）</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>土的密度试验（环刀法）</el-checkbox></td>
          <td colspan="6" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td>{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td>
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 300px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">碾压厚度：</td>
          <td><el-input v-model="form.cNyhd" placeholder="请输入碾压厚度" style="width: 200px" /></td>
          <td class="td_right">击实试验编号：</td>
          <td><el-input v-model="form.cSybh" placeholder="请输入击实试验编号" style="width: 200px" /></td>
          <td class="td_right">取样日期：</td>
          <td colspan="3"><el-date-picker v-model="form.recdate" placeholder="选择委取样日期" style="width: 300px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">工程地址：</td>
          <td colspan="3"><el-input v-model="form.cTfdz" placeholder="请输入程地点" style="width: 585px" /></td>
          <td class="td_right">取样数量：</td>
          <td colspan="3"><el-input-number v-model="form.cPoint" controls-position="right" :min="1" style="width: 300px" /></td>
        </tr>
        <tr>
          <td class="td_right">土壤类别：</td>
          <td>
            <el-select v-model="form.cTrlb" placeholder="请选择土壤类别" style="width: 200px">
              <el-option v-for="item in cTrlbOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">土样描述：</td>
          <td><el-input v-model="form.cMs" placeholder="请输入土样描述" style="width: 200px" /></td>
          <td class="td_right">击实方法：</td>
          <td colspan="3">
            <el-select v-model="form.cJsf" placeholder="请选择土壤类别" style="width: 300px">
              <el-option v-for="item in cJsfOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">生产日期：</td>
          <td><el-date-picker v-model="form.proddate" placeholder="请选择生产日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">碾压机械：</td>
          <td><el-input v-model="form.cJx" placeholder="请输入碾压机械" style="width: 200px" /></td>
          <td class="td_right">碾压次数：</td>
          <td colspan="3"><el-input v-model="form.cBs" placeholder="请输入碾压次数" style="width: 300px" /></td>
        </tr>
        <tr>
          <td class="td_right">取土标高：</td>
          <td><el-input v-model="form.cTbg" placeholder="请输入取土标高" style="width: 200px" /></td>
          <td class="td_right">取样深度：</td>
          <td><el-input v-model="form.cSd" placeholder="请输入取样深度" style="width: 200px" /></td>
          <td class="td_right">最佳含水率(%)：</td>
          <td colspan="3"><el-input v-model="form.cHsl" placeholder="请输入最佳含水率" style="width: 300px" /></td>
        </tr>
        <tr>
          <td class="td_right">最大干密度(g/cm³)：</td>
          <td><el-input v-model="form.cMgmd" placeholder="请输入最大干密度" style="width: 200px" /></td>
          <td class="td_right">设计压实度(%)：</td>
          <td><el-input v-model="form.cYsd" placeholder="请输入设计压实度" style="width: 200px" /></td>
          <td class="td_right">要求试验日期：</td>
          <td colspan="3"><el-date-picker v-model="form.cQdate" placeholder="请选择要求试验日期" style="width: 300px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">最小干密度(g/cm³)：</td>
          <td><el-input v-model="form.cNgmd" placeholder="请输入最小干密度" style="width: 200px" /></td>
          <td class="td_right">要求压实系数：</td>
          <td><el-input v-model="form.cYsxs" placeholder="请输入要求压实系数" style="width: 200px" /></td>
          <td class="td_right">检验类别：</td>
          <td colspan="3"><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 300px" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td colspan="7"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 1185px" /></td>
        </tr>
        <tr>
          <td class="td_right">工程部位：</td>
          <td colspan="7"><el-input v-model="form.structpart" placeholder="请输入工程部位" style="width: 1185px" /></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <thead>
                <tr>
                  <td class="td_right">序号：</td>
                  <td><el-input v-model="form.sortid" /></td>
                  <td class="td_right">取样桩号：</td>
                  <td colspan="2"><el-input v-model="form.zhuanghao" /></td>
                  <td class="td_right">土样编号：</td>
                  <td colspan="2"><el-input v-model="form.tybiaohao" /></td>
                </tr>
                <tr>
                  <th class="th_center" colspan="8">环刀测样</th>
                </tr>
                <tr>
                  <th class="th_center">环刀号</th>
                  <th class="th_center">环刀容积(cm³)</th>
                  <th class="th_center">环刀质量(g)</th>
                  <th class="th_center">土+环刀质量(g)</th>
                  <th class="th_center">土样质量(g)</th>
                  <th class="th_center" colspan="2">湿密度(g/cm³)</th>
                  <th class="th_center">平均湿密度(g/cm³)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-input v-model="form.huandaohao" /></td>
                  <td class="td_center"><el-input v-model="form.m11" /></td>
                  <td class="td_center"><el-input v-model="form.m21" /></td>
                  <td class="td_center"><el-input v-model="form.m31" /></td>
                  <td class="td_center"><el-input v-model="form.m41" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.m51" /></td>
                  <td class="td_center"><el-input v-model="form.shimidu" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-input v-model="form.huandaohao1" /></td>
                  <td class="td_center"><el-input v-model="form.m12" /></td>
                  <td class="td_center"><el-input v-model="form.m22" /></td>
                  <td class="td_center"><el-input v-model="form.m32" /></td>
                  <td class="td_center"><el-input v-model="form.m42" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.m52" /></td>
                  <td class="td_center"><el-input v-model="form.shimidu" /></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th class="th_center" colspan="8">含水率测定</th>
                </tr>
                <tr>
                  <th class="th_center">盒号</th>
                  <th class="th_center">盒+湿土质量(g)</th>
                  <th class="th_center">盒+干土质量(g)</th>
                  <th class="th_center">盒质量(g)</th>
                  <th class="th_center">干土质量(g)</th>
                  <th class="th_center">水质量(g)</th>
                  <th class="th_center">含水率(%)</th>
                  <th class="th_center">干密度(g/cm³)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-input v-model="form.hehao1" /></td>
                  <td class="td_center"><el-input v-model="form.hslm51" /></td>
                  <td class="td_center"><el-input v-model="form.hslm61" /></td>
                  <td class="td_center"><el-input v-model="form.hslm71" /></td>
                  <td class="td_center"><el-input v-model="form.hslm81" /></td>
                  <td class="td_center"><el-input v-model="form.hslm91" /></td>
                  <td class="td_center"><el-input v-model="form.m61" /></td>
                  <td class="td_center"><el-input v-model="form.m71" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-input v-model="form.hehao2" /></td>
                  <td class="td_center"><el-input v-model="form.hslm52" /></td>
                  <td class="td_center"><el-input v-model="form.hslm62" /></td>
                  <td class="td_center"><el-input v-model="form.hslm72" /></td>
                  <td class="td_center"><el-input v-model="form.hslm82" /></td>
                  <td class="td_center"><el-input v-model="form.hslm92" /></td>
                  <td class="td_center"><el-input v-model="form.m62" /></td>
                  <td class="td_center"><el-input v-model="form.m72" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">平均含水率(%)：</td>
                <td colspan="3"><el-input v-model="form.hanshuilv" /></td>
                <td class="td_right">平均干密度(g/cm³)：</td>
                <td colspan="3"><el-input v-model="form.m8" /></td>
              </tr>
              <tr>
                <td class="td_right">压实系数：</td>
                <td><el-input v-model="form.yashxsh" /></td>
                <td class="td_right">压实度(%)：</td>
                <td><el-input v-model="form.yashidu" /></td>
                <td class="td_right">备注：</td>
                <td colspan="3"><el-input v-model="form.expl" /></td>
              </tr>

              <tr>
                <td class="td_right">结论：</td>
                <td colspan="7"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="7">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="7"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="3"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right" colspan="2">所用检测设备使用前状态：</td>
                <td colspan="3"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="3"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right" colspan="2">所用检测设备使用后状态：</td>
                <td colspan="3"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="3"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td><el-input v-model="form.temperature" /></td>
                <td class="td_right">湿度%：</td>
                <td><el-input v-model="form.humidity" /></td>
              </tr>
              <tr>
                <td class="td_right">检测标准：</td>
                <td colspan="7"><el-input v-model="form.standname" /></td>
              </tr>
              <tr>
                <td class="td_right">评定标准：</td>
                <td colspan="7"><el-input v-model="form.pdstandardname" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td class="td_right">复核人：</td>
          <td>{{ form.collateman }}</td>
          <td class="td_right">复核日期：</td>
          <td><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td>{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td>{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测日期：</td>
          <td><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td>{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td>{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td>{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td>{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td><el-date-picker v-model="form.printdate" placeholder="选择打印日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td>{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td>{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td><el-date-picker v-model="form.getdate" placeholder="选择收样时间" type="date" value-format="yyyy-MM-dd" /></td>
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
          <td colspan="8" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">取样地点：</td>
          <td><el-input v-model="form.recadd" /></td>
        </tr>
        <tr>
          <td colspan="8" style="text-align: right">
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
    name: 'Em324CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        cJsfOptions: [],
        sampleStatusOptions: [],
        cTrlbOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '324',
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
        listDictItemByCode('C_JSF').then((response) => {
          this.cJsfOptions = response.data
        })
        listDictItemByCode('C_TRLB').then((response) => {
          this.cTrlbOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'TGHD' }
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
