<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="13" style="background-color: #2b508a; color: #fff">委托项目-石子物理性能（国标）</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>含泥量</el-checkbox></td>
          <td><el-checkbox v-model="checked2">含泥块量</el-checkbox></td>
          <td><el-checkbox v-model="checked3">颗科级配</el-checkbox></td>
          <td colspan="10" style="text-align: right"><el-checkbox v-model="checked3">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td style="width: 300px">{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td style="width: 300px">
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3" style="width: 350px"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td style="width: 300px"><el-input v-model="form.checktype" placeholder="请输入检验类别" /></td>
          <td class="td_right">石子类别：</td>
          <td style="width: 300px">
            <el-select v-model="form.szSort" placeholder="请选择石类别" style="width: 200px">
              <el-option v-for="item in szSortOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">品种：</td>
          <td colspan="3" style="width: 350px">
            <el-select v-model="form.szVar" placeholder="请选择石品种">
              <el-option v-for="item in szVarOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">产地：</td>
          <td style="width: 300px"><el-input v-model="form.chProde" placeholder="请输入产地" /></td>
          <td class="td_right" style="width: 300px">规格：</td>
          <td style="width: 300px">
            <el-select v-model="form.spec" placeholder="请选择石品种" style="width: 200px">
              <el-option v-for="item in specOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">代表批量：</td>
          <td colspan="3" style="width: 350px"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td style="width: 300px"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" /></td>
          <td class="td_right">样品数量：</td>
          <td colspan="3" style="width: 350px"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" /></td>
          <td class="td_right">工程编码：</td>
          <td colspan="3"><el-input-number v-model="form.pronum" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="13" style="text-align: center; font-weight: bold">技术指标</td>
        </tr>
        <tr>
          <td class="td_right">含泥块量：</td>
          <td>{{ form.cPugpbzf }}</td>
          <td class="td_right">含泥量：</td>
          <td colspan="3">{{ form.cMudpbzf }}</td>
        </tr>
        <tr>
          <td colspan="13">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="4">含泥量</th>
                  <th class="th_center" colspan="3">含泥块量</th>
                </tr>
                <tr>
                  <th class="th_center">试样编号</th>
                  <th class="th_center">试前烘干前质量</th>
                  <th class="th_center">试后烘干质量</th>
                  <th class="th_center">含泥量</th>
                  <th class="th_center">试样编号</th>
                  <th class="th_center">475筛筛余的质量</th>
                  <th class="th_center">烘干后质量</th>
                  <th class="th_center">含泥块量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.cMud11" /></td>
                  <td class="td_center"><el-input v-model="form.cMud21" /></td>
                  <td class="td_center"><el-input v-model="form.cMudp1" /></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.cPug11" /></td>
                  <td class="td_center"><el-input v-model="form.cPug21" /></td>
                  <td class="td_center"><el-input v-model="form.cPugp1" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.cMud12" /></td>
                  <td class="td_center"><el-input v-model="form.cMud22" /></td>
                  <td class="td_center"><el-input v-model="form.cMudp2" /></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.cPug12" /></td>
                  <td class="td_center"><el-input v-model="form.cPug22" /></td>
                  <td class="td_center"><el-input v-model="form.cPugp2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.cMudpa" /></td>
                  <td class="td_center"><el-link disabled>指标(＜)</el-link></td>
                  <td class="td_center"><el-input v-model="form.cMudpbzf" /></td>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.cPugpa" /></td>
                  <td class="td_center"><el-link disabled>指标(＜)</el-link></td>
                  <td class="td_center"><el-input v-model="form.cPugpbzf" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="14">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="13">颗粒级匹配实验</th>
                </tr>
                <tr>
                  <td class="td_right">试样质量(g)：</td>
                  <td colspan="3">{{ form.syzzl }}</td>
                  <td class="td_right" colspan="2">级配类型：</td>
                  <td colspan="2">{{ form.silx }}</td>
                  <td class="td_right" colspan="2">公称粒级：</td>
                  <td colspan="3">{{ form.gckl }}</td>
                </tr>
                <tr>
                  <th class="th_center" style="width: 6%">筛孔(mm)</th>
                  <th class="th_center" style="width: 8%">75.0</th>
                  <th class="th_center" style="width: 8%">63.0</th>
                  <th class="th_center" style="width: 8%">53.0</th>
                  <th class="th_center" style="width: 8%">37.5</th>
                  <th class="th_center" style="width: 8%">31.5</th>
                  <th class="th_center" style="width: 8%">26.5</th>
                  <th class="th_center" style="width: 8%">19.0</th>
                  <th class="th_center" style="width: 8%">16.0</th>
                  <th class="th_center" style="width: 8%">9.50</th>
                  <th class="th_center" style="width: 8%">4.75</th>
                  <th class="th_center" style="width: 8%">2.36</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>筛余量(g)</el-link></td>
                  <td class="td_center"><el-input v-model="form.griddle1" /></td>
                  <td class="td_center"><el-input v-model="form.griddle2" /></td>
                  <td class="td_center"><el-input v-model="form.griddle3" /></td>
                  <td class="td_center"><el-input v-model="form.griddle4" /></td>
                  <td class="td_center"><el-input v-model="form.griddle5" /></td>
                  <td class="td_center"><el-input v-model="form.griddle6" /></td>
                  <td class="td_center"><el-input v-model="form.griddle7" /></td>
                  <td class="td_center"><el-input v-model="form.griddle8" /></td>
                  <td class="td_center"><el-input v-model="form.griddle9" /></td>
                  <td class="td_center"><el-input v-model="form.griddle10" /></td>
                  <td class="td_center"><el-input v-model="form.griddle11" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>分计筛余(%)</el-link></td>
                  <td class="td_center"><el-input v-model="form.griddlef1" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef2" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef3" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef4" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef5" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef6" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef7" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef8" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef9" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef10" /></td>
                  <td class="td_center"><el-input v-model="form.griddlef11" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>累计筛余(%)</el-link></td>
                  <td class="td_center"><el-input v-model="form.griddlel1" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel2" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel3" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel4" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel5" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel6" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel7" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel8" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel9" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel10" /></td>
                  <td class="td_center"><el-input v-model="form.griddlel11" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>筛余标准值(%)</el-link></td>
                  <td class="td_center"><el-input v-model="form.griddleb1" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb2" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb3" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb4" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb5" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb6" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb7" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb8" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb9" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb10" /></td>
                  <td class="td_center"><el-input v-model="form.griddleb11" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">底盘：</td>
                <td colspan="11"><el-input v-model="form.chassis" /></td>
              </tr>
              <tr>
                <td class="td_right">散失率(%)：</td>
                <td colspan="2"><el-input v-model="form.ssp" /></td>
                <td class="td_right">公称最大粒径(mm)：</td>
                <td colspan="2"><el-input v-model="form.maxgriddle" /></td>
                <td class="td_right">结论：</td>
                <td colspan="6"><el-input v-model="form.jpChknote" /></td>
              </tr>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="11"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="11">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="11"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="3"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right">所用检测设备使用前状态：</td>
                <td colspan="7"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="3"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right">所用检测设备使用后状态：</td>
                <td colspan="7"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="3"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td colspan="3">
                  <el-input v-model="form.temperature" />
                </td>
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
          <td colspan="13" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
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
          <td class="td_right">供销单位：</td>
          <td colspan="3"><el-input v-model="form.bcFuc" /></td>
        </tr>

        <tr>
          <td colspan="13" style="text-align: right">
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
    name: 'Em310CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        sampleStatusOptions: [],
        szVarOptions: [],
        szSortOptions: [],
        specOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '310',
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
        listDictItemByCode('HJHS').then((response) => {
          this.hjxsOptions = response.data
        })
        listDictItemByCode('SZ_var310').then((response) => {
          this.szVarOptions = response.data
        })
        listDictItemByCode('SPEC310').then((response) => {
          this.specOptions = response.data
        })
        listDictItemByCode('sz_sort').then((response) => {
          this.szSortOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'SIIG' }
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
