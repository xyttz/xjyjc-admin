<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="8" style="background-color: #2b508a; color: #fff">委托项目-砂浆试块抗压试验</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>抗压强度</el-checkbox></td>
          <td colspan="6" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td>{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td colspan="2">
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /></td>
          <td class="td_right">设计强度等级：</td>
          <td colspan="2">
            <el-select v-model="form.cGrade" placeholder="请选择强度等级" style="width: 200px">
              <el-option v-for="item in cGradeOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">报告承诺日期：</td>
          <td colspan="3"><el-date-picker v-model="form.repcondate" placeholder="选择诺日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">砂浆品种：</td>
          <td>
            <el-select v-model="form.cPz" placeholder="请选择砖品种" style="width: 200px">
              <el-option v-for="item in cPzOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">结构部位：</td>
          <td colspan="2"><el-input v-model="form.structpart" placeholder="请输入结构部位" style="width: 200px" /></td>
          <td class="td_right">代表批量：</td>
          <td colspan="3"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">尺寸：</td>
          <td>
            <el-input v-model="form.size" style="width: 200px" />
          </td>
          <td class="td_right">养护条件</td>
          <td colspan="2">
            <el-select v-model="form.cYh" placeholder="请选择砖品种" style="width: 200px">
              <el-option v-for="item in cYhOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">成型日期</td>
          <td colspan="3"><el-input v-model="form.cCxd" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">成型方法：</td>
          <td>
            <el-select v-model="form.cCxf" placeholder="请选择成型方法" style="width: 200px">
              <el-option v-for="item in cCxfOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">要求龄期：</td>
          <td><el-input v-model="form.cQlq" placeholder="请输入要求龄期" style="width: 200px" /></td>
          <td class="td_right" colspan="2">配合比编号</td>
          <td colspan="3"><el-input v-model="form.cPhb" placeholder="请输入配合比编号" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">制作人：</td>
          <td><el-input v-model="form.cMan" placeholder="请输入制作人" style="width: 200px" /></td>
          <td class="td_right">生产日期：</td>
          <td colspan="2"><el-date-picker v-model="form.proddate" placeholder="选择生产日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">样品数量：</td>
          <td colspan="3"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="8">抗压强度试验</th>
                </tr>
                <tr>
                  <th class="th_center">试样编号</th>
                  <th class="th_center" style="width: 16%">1</th>
                  <th class="th_center" style="width: 16%">2</th>
                  <th class="th_center" style="width: 16%">3</th>
                  <th class="th_center" style="width: 16%">4</th>
                  <th class="th_center" style="width: 16%">5</th>
                  <th class="th_center" style="width: 16%">6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>长度(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.chang1" /></td>
                  <td class="td_center"><el-input v-model="form.chang2" /></td>
                  <td class="td_center"><el-input v-model="form.chang3" /></td>
                  <td class="td_center"><el-input v-model="form.chang4" /></td>
                  <td class="td_center"><el-input v-model="form.chang5" /></td>
                  <td class="td_center"><el-input v-model="form.chang6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>宽度(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.kuan1" /></td>
                  <td class="td_center"><el-input v-model="form.kuan2" /></td>
                  <td class="td_center"><el-input v-model="form.kuan3" /></td>
                  <td class="td_center"><el-input v-model="form.kuan4" /></td>
                  <td class="td_center"><el-input v-model="form.kuan5" /></td>
                  <td class="td_center"><el-input v-model="form.kuan6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>高度(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.gao1" /></td>
                  <td class="td_center"><el-input v-model="form.gao2" /></td>
                  <td class="td_center"><el-input v-model="form.gao3" /></td>
                  <td class="td_center"><el-input v-model="form.gao4" /></td>
                  <td class="td_center"><el-input v-model="form.gao5" /></td>
                  <td class="td_center"><el-input v-model="form.gao6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>极限荷载(KN)</el-link></td>
                  <td class="td_center"><el-input v-model="form.jixianhezai1" /></td>
                  <td class="td_center"><el-input v-model="form.jixianhezai2" /></td>
                  <td class="td_center"><el-input v-model="form.jixianhezai3" /></td>
                  <td class="td_center"><el-input v-model="form.jixianhezai4" /></td>
                  <td class="td_center"><el-input v-model="form.jixianhezai5" /></td>
                  <td class="td_center"><el-input v-model="form.jixianhezai6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>单块强度(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.qiangdu1" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu2" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu3" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu4" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu5" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu6" /></td>
                </tr>
                <tr>
                  <td class="td_right">强度代表值</td>
                  <td><el-input v-model="form.qiangdudaibiaozhi" /></td>
                  <td class="td_right">达到设计强度百分比</td>
                  <td><el-input v-model="form.qiangdubaifenbi" /></td>
                  <td class="td_right">实际龄期</td>
                  <td colspan="2"><el-input v-model="form.yqlq" /></td>
                </tr>
              </tbody>
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
                <td colspan="2"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right">所用检测设备使用前状态：</td>
                <td colspan="4"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="2"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right">所用检测设备使用后状态：</td>
                <td colspan="4"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="2"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td><el-input v-model="form.temperature" /></td>
                <td class="td_right">湿度%：</td>
                <td colspan="2"><el-input v-model="form.humidity" /></td>
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
          <td colspan="2"><el-input v-model="form.recadd" /></td>
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
    name: 'Em320CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        sampleStatusOptions: [],
        cGradeOptions: [],
        cPzOptions: [],
        cYhOptions: [],
        cCxfOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '320',
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
        listDictItemByCode('SheJiDengJi').then((response) => {
          this.cGradeOptions = response.data
        })
        listDictItemByCode('sampname308').then((response) => {
          this.cPzOptions = response.data
        })
        listDictItemByCode('YangHuTiaoJian').then((response) => {
          this.cYhOptions = response.data
        })
        listDictItemByCode('ChengXingFangFa').then((response) => {
          this.cCxfOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'SJKY' }
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
