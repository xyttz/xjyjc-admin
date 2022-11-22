<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="8" style="background-color: #2b508a; color: #fff">委托项目-钢筋机械连接接头初验</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>单项拉伸性能试验</el-checkbox></td>
          <td colspan="7" style="text-align: right"><el-checkbox v-model="checked3" disabled>系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
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
                <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" type="date" value-format="yyyy-MM-dd" /></td>
              </tr>
              <tr>
                <td class="td_right">检验类别：</td>
                <td><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /></td>
                <td class="td_right">钢材类别：</td>
                <td>
                  <el-select v-model="form.gcId" placeholder="请选择" style="width: 200px; padding: 0">
                    <div class="tableHeader">
                      <span style="float: left; width: 150px">钢筋种类</span>
                      <span style="float: left">牌号</span>
                      <span style="float: left; width: 150px">级别</span>
                      <span style="float: left; width: 150px">冷弯</span>
                      <span style="float: left">表面形状</span>
                      <span style="float: left; width: 200px">检验标准</span>
                      <!-- <span style="float: left">碳（C）</span>
                  <span style="float: left">锰（Mn）</span>
                  <span style="float: left">硅（Si）</span>
                  <span style="float: left">磷（P）</span>
                  <span style="float: left">硫（S）</span>
                  <span style="float: left">钒（V）</span>
                  <span style="float: left">钛（Ti）</span> -->
                      <span style="float: left">碳当量(Ceq)</span>
                      <span style="float: left">盘条牌号</span>
                      <span style="float: left">弯心直径</span>
                      <span style="float: left">弯曲角度</span>
                      <span style="float: left">最小公称直径</span>
                      <span style="float: left">最大公称直径</span>
                      <span style="float: left">屈服强度</span>
                      <span style="float: left">极限强度</span>
                      <span style="float: left">伸长率</span>
                    </div>
                    <el-option v-for="item in gcIdOptions" :key="item.libid" :label="item.c1" :value="item.libid" @click.native="handleGcIdChange(item)">
                      <span style="float: left; width: 150px">{{ item.c1 }}</span>
                      <span style="float: left">{{ item.c2 }}</span>
                      <span style="float: left; width: 150px">{{ item.c3 }}</span>
                      <span style="float: left; width: 150px">{{ item.c4 }}</span>
                      <span style="float: left">{{ item.c5 }}</span>
                      <span style="float: left; width: 200px">{{ item.c6 }}</span>
                      <!-- <span style="float: left">{{ item.c7 }}</span>
                  <span style="float: left">{{ item.c8 }}</span>
                  <span style="float: left">{{ item.c9 }}</span>
                  <span style="float: left">{{ item.c10 }}</span>
                  <span style="float: left">{{ item.c11 }}</span>
                  <span style="float: left">{{ item.c12 }}</span>
                  <span style="float: left">{{ item.c13 }}</span> -->
                      <span style="float: left">{{ item.c14 }}</span>
                      <span style="float: left">{{ item.c15 }}</span>
                      <span style="float: left">{{ item.f1 }}</span>
                      <span style="float: left">{{ item.f2 }}</span>
                      <span style="float: left">{{ item.f3 }}</span>
                      <span style="float: left">{{ item.f4 }}</span>
                      <span style="float: left">{{ item.f5 }}</span>
                      <span style="float: left">{{ item.f6 }}</span>
                      <span style="float: left">{{ item.f7 }}</span>
                    </el-option>
                  </el-select>
                </td>
                <td class="td_right">公称直径：</td>
                <td colspan="3">
                  <el-input v-model="form.dMin" style="width: 80px" />
                  ~
                  <el-input v-model="form.dMax" style="width: 80px" />
                </td>
              </tr>
              <tr>
                <td class="td_right">牌号：</td>
                <td>{{ form.paihao }}</td>
                <td class="td_right">面积：</td>
                <td>{{ form.jmj }}(mm²)</td>
                <td class="td_right">表面形状</td>
                <td colspan="3">{{ form.share }}</td>
              </tr>
              <tr>
                <td class="td_right">接头类别：</td>
                <td><el-input v-model="form.jtlx" placeholder="请输入接头类别" style="width: 200px" /></td>
                <td class="td_right">接头等级：</td>
                <td><el-input v-model="form.gjjb" placeholder="请输入接头等级" style="width: 200px" /></td>
                <td class="td_right">检验形式：</td>
                <td colspan="3"><el-input v-model="form.checkfrm" placeholder="请输入接头等级" style="width: 200px" /></td>
              </tr>
              <tr>
                <td class="td_right">操作工：</td>
                <td><el-input v-model="form.oprname" placeholder="请输入焊工证号" /></td>
                <td class="td_right">上岗证号：</td>
                <td><el-input v-model="form.oprno" placeholder="请输入炉、批号" /></td>
                <td class="td_right">炉、批号：</td>
                <td colspan="3"><el-input v-model="form.pihao" /></td>
              </tr>
              <tr>
                <td class="td_right">生产厂家：</td>
                <td><el-input v-model="form.unitnum" placeholder="请输入生产厂家" /></td>
                <td class="td_right">样品数量：</td>
                <td><el-input-number v-model="form.sampmout" controls-position="right" :min="0" /></td>
                <td class="td_right">代表批量：</td>
                <td colspan="3"><el-input-number v-model="form.deputybat" controls-position="right" :min="0" /></td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="8" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <tr>
                <td style="text-align: center; font-weight: bold">技术指标</td>
                <td class="right">屈服强度标准值(MPa)：</td>
                <td colspan="2">{{ form.mmpabz }}</td>
                <td class="right" colspan="2">抗拉强度标准值(MPa)：</td>
                <td colspan="2">{{ form.mpabz }}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="8">单项拉伸性能试验</th>
                </tr>
                <tr>
                  <th class="th_center" colspan="4">母材</th>
                  <th class="th_center" colspan="4">接头</th>
                </tr>
                <tr>
                  <th class="th_center">试样编号</th>
                  <th class="th_center">荷载(kN)</th>
                  <th class="th_center">接头试件中钢筋抗拉强度实测值(MPa)</th>
                  <th class="th_center">荷载(kN)</th>
                  <th class="th_center">接头试件实测抗拉强度(MPa)</th>
                  <th class="th_center">断口距接头尺寸(mm)</th>
                  <th class="th_center">接头长度(mm)</th>
                  <th class="th_center">破坏形态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.myl1" /></td>
                  <td class="td_center"><el-input v-model="form.mmpa1" /></td>
                  <td class="td_center"><el-input v-model="form.yl1" /></td>
                  <td class="td_center"><el-input v-model="form.mpa1" /></td>
                  <td class="td_center"><el-input v-model="form.jl1" /></td>
                  <td class="td_center"><el-input v-model="form.cc1" /></td>
                  <td class="td_center"><el-input v-model="form.destroy1" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.myl2" /></td>
                  <td class="td_center"><el-input v-model="form.mmpa2" /></td>
                  <td class="td_center"><el-input v-model="form.yl2" /></td>
                  <td class="td_center"><el-input v-model="form.mpa2" /></td>
                  <td class="td_center"><el-input v-model="form.jl2" /></td>
                  <td class="td_center"><el-input v-model="form.cc2" /></td>
                  <td class="td_center"><el-input v-model="form.destroy2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center"><el-input v-model="form.myl3" /></td>
                  <td class="td_center"><el-input v-model="form.mmpa3" /></td>
                  <td class="td_center"><el-input v-model="form.yl3" /></td>
                  <td class="td_center"><el-input v-model="form.mpa3" /></td>
                  <td class="td_center"><el-input v-model="form.jl3" /></td>
                  <td class="td_center"><el-input v-model="form.cc3" /></td>
                  <td class="td_center"><el-input v-model="form.destroy3" /></td>
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
                  <td><el-input v-model="form.instrumentnum" colspan="2" /></td>
                  <td class="td_right" colspan="2">所用检测设备使用前状态：</td>
                  <td colspan="3"><el-input v-model="form.beforestatus" /></td>
                </tr>
                <tr>
                  <td class="td_right">设备名称：</td>
                  <td><el-input v-model="form.instrumentname" colspan="2" /></td>
                  <td class="td_right" colspan="2">所用检测设备使用后状态：</td>
                  <td colspan="3"><el-input v-model="form.afterstatus" /></td>
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
              </tbody>
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
          <td><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td>{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td>{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td>{{ form.factcheckdate }}</td>
          <td class="td_right">检测日期：</td>
          <td><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td>{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td>{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td>{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td>{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td><el-date-picker v-model="form.printdate" placeholder="选择打印日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td>{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td>{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td><el-date-picker v-model="form.getdate" placeholder="选择收样时间" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">收样地点：</td>
          <td colspan="3"><el-input v-model="form.getadd" /></td>
        </tr>
        <tr>
          <td class="td_right">检测人：</td>
          <td>{{ form.chkid }}</td>
          <td class="td_right">检测时间：</td>
          <td><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" style="width: 140px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测地点：</td>
          <td colspan="3"><el-input v-model="form.chkadd" /></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">取样地点：</td>
          <td colspan="7"><el-input v-model="form.recadd" /></td>
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
    name: 'Em302CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        lspdOptions: [],
        sampleStatusOptions: [],
        form: {},
        checked1: true,
        checked2: true,
        checked3: true,
        pathType: '302',
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.entkey = this.$route.query.entkey
        console.log('entkey:' + this.entkey)
        getByEntkey(this.entkey, this.pathType).then((response) => {
          this.form = response.data
          // this.pronum = this.form.pronum
          this.initData()
        })
      },
      initData() {
        listDictItemByCode('SAMPLESTATUS').then((response) => {
          this.sampleStatusOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        // listDictItemByCode('HJHS').then((response) => {
        //   this.hjxsOptions = response.data
        // })
        const libParas = { libnum: 'GJCC' }
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
