<template>
  <div v-loading="listLoading" class="app-container">
    <table style="width: 100%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-混凝土试块抗压强实验</td>
      </tr>
      <tr>
        <td class="td_right">当前工程编码：</td>
        <td>{{ projectinfo.pronum }}</td>
        <td class="td_right">当前工程名称：</td>
        <td colspan="4">{{ projectinfo.proname }}</td>
        <td rowspan="5" style="width: 200px">
          <div v-show="showQrCdoe" @click="openPrintDialag">
            <vue-qr ref="vab-print-qrimage" color-dark="#1e1921" color-light="#fff" :logo-scale="0.2" :logo-src="logoSrc" :margin="0" :size="200" :text="qrvalue" />
          </div>
        </td>
      </tr>
      <tr>
        <td class="td_right">缴费方式：</td>
        <td>{{ projectinfo.prochargtypeName }}</td>
        <td class="td_right">委托单位：</td>
        <td colspan="4">{{ projectinfo.entunit }}</td>
      </tr>
      <tr>
        <td class="td_right">合同编号：</td>
        <td></td>
        <td class="td_right">监督备案号：</td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td class="td_right">委托编号：</td>
        <td>{{ form.entnum }}</td>
        <td class="td_right">样品编号：</td>
        <td>{{ form.sampnum }}</td>
        <td class="td_right">报告编号：</td>
        <td colspan="2">{{ form.repnum }}</td>
      </tr>
      <tr>
        <td class="td_right">检测子项目：</td>
        <td colspan="6">
          <el-checkbox v-model="form.checkitem1" false-label="0" true-label="1">试块抗压强度</el-checkbox>
        </td>
      </tr>
      <tr>
        <td colspan="8" style="padding: 0px">
          <project-info ref="project" />
        </td>
      </tr>
      <tr>
        <td colspan="8" style="background-color: #5f73ce; color: #fff">样品信息</td>
      </tr>
      <tr>
        <td colspan="8">
          <el-form ref="form" :inline="true" label-width="150px" :model="form" :rules="rules" size="small">
            <el-form-item label="样品编号" prop="sampnum">
              <el-input v-model="form.sampnum" readonly="readonly" style="width: 200px" />
            </el-form-item>
            <el-form-item label="委托编号" prop="entnum">
              <el-input v-model="form.entnum" readonly="readonly" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告编号" prop="repnum">
              <el-input v-model="form.repnum" readonly="readonly" style="width: 200px" />
            </el-form-item>
            <el-form-item label="检验类别" prop="checktype">
              <!-- <el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.checktype"
                :fetch-suggestions="queryCheckTypeSearchAsync"
                placeholder="请输入送检类别"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="成型日期" prop="chengxingriqi">
              <el-date-picker
                v-model="form.chengxingriqi"
                :editable="false"
                placeholder="选择成型日期"
                style="width: 200px"
                type="date"
                value-format="yyyy-MM-dd"
                @change="handeldtlq"
              />
            </el-form-item>
            <el-form-item label="当天龄期" prop="dtlq">
              <el-input v-model="form.dtlq" readonly="readonly" style="width: 200px" />
            </el-form-item>
            <el-form-item label="要求龄期" prop="ql">
              <el-input-number v-model="form.ql" controls-position="right" f :min="0" style="width: 200px" />
            </el-form-item>
            <el-form-item label="要求试验日期" prop="checkdate">
              <el-date-picker v-model="form.checkdate" :editable="false" placeholder="选择要求试验日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="委托日期" prop="entdate">
              <el-date-picker v-model="form.entdate" :editable="false" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="报告承诺天数" prop="repcondays">
              <el-input-number v-model="form.repcondays" controls-position="right" f :min="0" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告承诺日期" prop="repcondate">
              <el-date-picker v-model="form.repcondate" :editable="false" placeholder="选择报告承诺日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="设计强度等级" prop="qddj">
              <el-select v-model="form.qddj" placeholder="请选择设计强度等级" style="width: 200px">
                <el-option v-for="item in qddjOptions" :key="item.value" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="检验批号" prop="testbatch">
              <el-autocomplete
                v-model="form.testbatch"
                :fetch-suggestions="queryTestbatchSearchAsync"
                placeholder="请输入检验批号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="代表批量" prop="deputybatch">
              <el-input v-model="form.deputybatch" placeholder="请输入代表批量" style="width: 200px" />
            </el-form-item>
            <el-form-item label="养护开始日期" prop="yanghubdate">
              <el-date-picker v-model="form.yanghubdate" :editable="false" placeholder="选择养护开始日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="养护结束日期" prop="yanghuedate">
              <el-date-picker v-model="form.yanghuedate" :editable="false" placeholder="选择养护结束日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="累计温度" prop="ljwd">
              <el-input v-model="form.ljwd" placeholder="请输入累计温度" style="width: 200px" />
            </el-form-item>
            <el-form-item label="构建名称" prop="cqpart">
              <el-autocomplete
                v-model="form.cqpart"
                :fetch-suggestions="queryCqpartSearchAsync"
                placeholder="请输入构建名称"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="种类" prop="wtsjlx">
              <el-autocomplete
                v-model="form.wtsjlx"
                :fetch-suggestions="queryWtsjlxSearchAsync"
                placeholder="请输入种类"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="检测标准" prop="standardname">
              <el-autocomplete
                v-model="form.standardname"
                :fetch-suggestions="queryStandardNameSearchAsync"
                placeholder="请输入检测标准"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="结构部位" prop="structpart">
              <el-autocomplete
                v-model="form.structpart"
                :fetch-suggestions="queryStructpartSearchAsync"
                placeholder="请输入结构部位"
                select-when-unmatched
                style="width: 560px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>

            <el-form-item label="养护条件" prop="yhtj">
              <el-select v-model="form.yhtj" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in yhtjOptions" :key="item.value" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="尺寸" prop="ccun">
              <el-select v-model="form.ccun" placeholder="请选择尺寸" style="width: 200px">
                <el-option v-for="item in ccunOptions" :key="item.value" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="成型方法" prop="cxff">
              <el-select v-model="form.cxff" placeholder="请选择成型方法" style="width: 200px">
                <el-option v-for="item in cxffOptions" :key="item.value" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="外观形状" prop="wglx">
              <el-select v-model="form.wglx" placeholder="请选择外观形状" style="width: 200px">
                <el-option v-for="item in wgxzOptions" :key="item.value" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="混凝土类型" prop="sampname">
              <el-select v-model="form.sampname" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in hntlxOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="检验批名称" prop="jyph">
              <el-autocomplete
                v-model="form.jyph"
                :fetch-suggestions="queryJyphsearchAsync"
                placeholder="请输入检验批名称"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="生产厂家" prop="unitnum">
              <!-- <el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.unitnum"
                :fetch-suggestions="queryUnitnumSearchAsync"
                placeholder="请输入生产厂家"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="配合比编号" prop="importnum">
              <el-autocomplete
                v-model="form.importnum"
                :fetch-suggestions="queryImportnumsearchAsync"
                placeholder="请输入配合比编号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="备注" prop="expl">
              <!-- <el-input v-model="form.expl" placeholder="请输入备注" style="width: 560px" /> -->
              <el-autocomplete
                v-model="form.expl"
                :fetch-suggestions="queryExplSearchAsync"
                placeholder="请输入备注"
                select-when-unmatched
                style="width: 560px"
                @select="handleSelect"
              />
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
            <el-form-item label="取样地点" prop="recadd">
              <!-- <el-input v-model="form.recadd" placeholder="请输入取样地点" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.recadd"
                :fetch-suggestions="queryRecaddSearchAsync"
                placeholder="请输入取样地点"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="制作人" prop="zzuor">
              <!-- <el-input v-model="form.recadd" placeholder="请输入制作人" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.zzuor"
                :fetch-suggestions="queryBackupcolumns2earchAsync"
                placeholder="请输入制作人"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="取样地点" prop="recadd2">
              <!-- <el-input v-model="form.recadd" placeholder="请输入取样地点" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.recadd2"
                :fetch-suggestions="queryRecaddS2earchAsync"
                placeholder="请输入取样地点"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td colspan="8" style="text-align: right">
          <el-button v-permissions="['ent:form:submit']" type="primary" @click="handleSubmit('submit')">提交</el-button>
          <el-button v-permissions="['ent:form:check']" type="primary" @click="handleSubmit('check')">委托单校核</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import ProjectInfo from '@/views/entrust/components/ProjectInfo'
  import { detail } from '@/api/basic/project'
  import { updateEntrust, addEntrust, getByEntId, getBySampleKey } from '@/api/entrust/entrust'
  import { listDictItemByCode } from '@/api/system/dict-item'
  //import { nextval } from '@/api/system/sequence'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM305CONSTS from '@/consts/EM305_CONSTS'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'E305',
    components: {
      ProjectInfo,
      VueQr,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_hnky',
        hjxsOptions: [],
        sampleStatusOptions: [],
        loaded: true,
        listLoading: true,
        projectinfo: {},
        form: {
          checkitem1: 'true',
          sampnum: '',
          entnum: '',
          repnum: '',
          checktype: '',
          repcondays: '',
          qddj: '',
          structpart: '',
          sampstatus: '',
          chengxingriqi: '',
          entdate: '',
          repcondate: '',
          yhtj: '',
          ccun: '',
          cxff: '',
          wgxz: '',
          ql: '',
          checkdate: '',
          sampmout: '',
          sampname: '',
          jyph: '',
          unitnum: '',
          importnum: '',
          expl: '仅对来样负责',
          recadd: '施工现场',
          zzuor: '',
          recadd2: '',
        },
        dtlq: '',
        attchForm: {},
        nums: {},
        oprtype: '',
        pronum: '',
        id: 0,
        rules: {
          entdate: [{ validator: this.validateEntdate, trigger: 'blur' }],
          repcondate: [{ validator: this.validateRepcondate, trigger: 'blur' }],
          repcondays: [{ validator: this.validateRepcondays, trigger: 'blur' }],
          chengxingriqi: [{ validator: this.validateChengxingriqi, trigger: 'blur' }],
          checkdate: [{ validator: this.validateCheckdate, trigger: 'blur' }],
          ql: [{ validator: this.validateQl, trigger: 'blur' }],

          // sampnum: [
          //   //{ required: true, message: '样品编号必须输入', trigger: 'blur' },
          //   { validator: this.validateSamnumLength, trigger: 'blur' },
          // ],
          // dmin: [{ type: 'number', message: '必须为数字值', trigger: 'change' }],
          // dmax: [{ type: 'number', message: '必须为数字值', trigger: 'change' }],
        },
        showQrCdoe: false,
        qrvalue: 'Hello World!',
        logoSrc: require('@/assets/qrlogo.png'),
        // logoCornerRadius: 10,
        ccunOptions: [],
        qddjOptions: [],
        yhtjOptions: [],
        wgxzOptions: [],
        hntlxOptions: [],
        cxffOptions: [],
        structparts: [], //结构部位
        checktypes: [], //检验类别
        jyphs: [], //检验批名称
        importnums: [], //配合比编号
        backupcolumns2: [], //制作人
        unitnums: [], //生产厂家
        expls: [], //备注
        recadds: [], //取样地点
        recadds2: [], //取样地点2
        testbatchs: [], // 检验批号
        cqparts: [], // 构建名称
        wtsjlxs: [], // 种类
        standardnames: [], // 检测标准
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
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      loadData() {
        this.listLoading = true
        // const checknum = this.$route.query.checknum
        this.pronum = this.$route.query.pronum
        this.id = this.$route.query.id
        this.oprtype = this.$route.query.oprtype ? this.$route.query.oprtype : ''
        console.log('pronum:' + this.pronum + '|id:' + this.id + '| oprtype:' + this.form.oprtype)
        // 修改委托处理，添加委托处理，新建委托处理 三类情况判断
        // 编号不在初始化时创建，提交委托时处理
        // 添加委托时，委托和报告编号不变，样品编号加一，在最后提交时处理，显示时只是临时处理 避免两人同时添加委托单

        if (this.id) {
          getByEntId(this.id, '305').then((response) => {
            this.form = response.data
            if ('1000000000000000000000000000000000000000' != this.form.sampphase && this.oprtype != 'append') {
              this.showQrCdoe = true
              this.qrvalue = this.form.entkey + '##' + this.form.entnum + '##' + this.table
            } else if (this.oprtype == 'append') {
              this.id = undefined
            } else {
              this.showQrCdoe = false
              this.qrvalue = 'Hello world'
            }
            this.initData()
          })
        } else {
          this.initData()
          this.handleReset()
          this.showQrCdoe = false
          this.qrvalue = 'Hello world'
        }
        this.loadHisColunmDatas()
      },
      initData() {
        if (this.pronum) {
          if (this.oprtype == 'append') {
            this.form.sampnum = this.form.entnum + '-**'
          } else if (this.oprtype == 'add') {
            this.form.sampnum = '****-**-******-**'
            this.form.entnum = '****-**-******'
            this.form.repnum = '****-**-******'
          }
          detail(this.pronum).then((response) => {
            this.projectinfo = response.data
            // console.log(JSON.stringify(this.projectdata))
            if (this.id) {
              this.form.project = this.buildCurtEntrustProjectInfo(this.form)
              this.$refs.project.setProjectData(this.form.project)
            } else {
              this.$refs.project.setProjectData(this.projectinfo)
              this.form.project = this.projectinfo
            }
          })
          //样品状态
          listDictItemByCode('SAMPLESTATUS').then((response) => {
            this.sampleStatusOptions = response.data
          })
          //设计强度等级
          listDictItemByCode('SheJiDengJi').then((response) => {
            this.qddjOptions = response.data
          })
          // 养护条件
          listDictItemByCode('YangHuTiaoJian').then((response) => {
            this.yhtjOptions = response.data
          })
          // 外观形状
          listDictItemByCode('XingZhuang').then((response) => {
            this.wgxzOptions = response.data
          })
          // 混凝土类型
          listDictItemByCode('sampname305').then((response) => {
            this.hntlxOptions = response.data
          })
          // 成型方法
          listDictItemByCode('ChengXingFangFa').then((response) => {
            this.cxffOptions = response.data
          })
          // 尺寸
          listDictItemByCode('ChiCun').then((response) => {
            this.ccunOptions = response.data
          })
          listDictItemByCode('HJHS').then((response) => {
            this.hjxsOptions = response.data
          })
          this.loaded = false
        } else {
          this.loaded = false
        }
      },
      handleSubmit: function (oprtype) {
        this.form.pronum = this.projectinfo.pronum
        this.pronum = this.$route.query.pronum
        this.oprtype = this.$route.query.oprtype ? this.$route.query.oprtype : ''
        console.log('pronum:' + this.pronum + '|id:' + this.id + '| oprtype:' + this.oprtype)
        this.$refs.form.validate((formValid) => {
          if (formValid) {
            const Loading = this.$baseLoading(5)
            // this.$refs.attchForm.validate((attchValid) => {
            //   if (attchValid) {
            console.log(JSON.stringify(this.form))
            // Object.assign(this.form, form)
            if (this.oprtype == 'append') {
              this.form.oprtype = this.oprtype
            } else if (this.oprtype == 'update') {
              this.form.oprtype = this.oprtype
            } else {
              this.form.oprtype = oprtype
            }
            this.form.project = this.$refs.project.projectForm
            if (this.id) {
              // 编辑
              if (oprtype == 'review') {
                this.form.oprtype = 'review'
              } else {
                this.form.oprtype = 'update'
              }

              console.log('update:' + JSON.stringify(this.form))
              updateEntrust(this.id, this.form, '305').then(
                (res) => {
                  let sampnum = res.data
                  getBySampleKey(sampnum, '305').then((response) => {
                    this.form = response.data
                    this.id = this.form.id
                    if ('1100000000000000000000000000000000000001' == this.form.sampphase) {
                      this.showQrCdoe = true
                      this.qrvalue = this.form.entkey + '##' + this.form.entnum + '##xz_ent_hnky##xz_chk_hnky'
                    } else {
                      this.showQrCdoe = false
                      this.qrvalue = 'Hello world'
                    }
                  })
                  this.$notify.success('修改委托信息成功' + res.msg)
                  Loading.close()
                },
                (err) => {
                  this.$notify.error(err)
                  Loading.close()
                }
              )
            } else {
              // 新增
              console.log('add:' + JSON.stringify(this.form))
              addEntrust(this.form, '305').then(
                (response) => {
                  let sampnum = response.data
                  console.log('added return samnum:' + sampnum)
                  getBySampleKey(sampnum, '305').then((response) => {
                    console.log('find by samplekey:' + JSON.stringify(response.data))
                    this.form = response.data
                    this.id = this.form.id
                  })
                  this.$notify.success('新增委托信息成功' + response.msg)
                  Loading.close()
                },
                (err) => {
                  this.$notify.error(err)
                  Loading.close()
                }
              )
            }
          }
        })
        //   }
        // })
      },
      handleReset() {
        this.id = undefined
        this.form = {
          checkitem1: '',
          sampnum: '',
          entnum: '',
          repnum: '',
          checktype: '',
          repcondays: '',
          qddj: '',
          structpart: '',
          sampstatus: '',
          chengxingriqi: '',
          entdate: '',
          repcondate: '',
          yhtj: '',
          ccun: '',
          cxff: '',
          wgxz: '',
          ql: '',
          checkdate: '',
          sampmout: '',
          sampname: '',
          jyph: '',
          unitnum: '',
          importnum: '',
          expl: '',
          recadd: '',
          zzuor: '',
          recadd2: '',
        }
        this.dtlq = ''
      },
      async openPrintDialag() {
        await this.foldSideBar()
        await VabPrint(this.$refs['vab-print-qrimage'], { noPrintParent: true })
        await this.openSideBar()
      },
      validateEntdate(rule, value, callback) {
        const entdate = value
        const repcondate = this.form.repcondate
        if (entdate && repcondate) {
          // var difday = dateDiff(entdate, repcondate)
          // console.log(difday)
          if (Date.parse(entdate) <= Date.parse(repcondate)) {
            this.form.repcondays = dateDiff(entdate, repcondate)
            return callback()
          } else {
            return callback(new Error('委托日期不得大于报告承诺日期'))
          }
        } else {
          return callback()
        }
      },
      validateRepcondate(rule, value, callback) {
        const repcondate = value
        const entdate = this.form.entdate
        if (entdate && repcondate) {
          // console.log(difday)
          if (Date.parse(repcondate) >= Date.parse(entdate)) {
            this.form.repcondays = dateDiff(entdate, repcondate)
            return callback()
          } else {
            return callback(new Error('报告承诺日期不得小于委托日期'))
          }
        } else {
          return callback(new Error('报告承诺日期不能为空'))
        }
      },
      validateRepcondays(rule, value, callback) {
        const days = value
        const entdate = this.form.entdate
        if (entdate && days >= 0) {
          var nDate = Date.parse(entdate)
          var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000
          let rDate = new Date(millSeconds)
          let today = rDate.getFullYear() + '-' + (rDate.getMonth() + 1).toString().padStart(2, '0') + '-' + rDate.getDate().toString().padStart(2, '0')
          console.log(today)
          this.$set(this.form, 'repcondate', today)
          // this.form.repcondate = rDate
          return callback()
        }
      },

      validateChengxingriqi(rule, value, callback) {
        const chengxingriqi = value
        const checkdate = this.form.checkdate
        if (chengxingriqi && checkdate) {
          // var difday = dateDiff(entdate, repcondate)
          // console.log(difday)
          if (Date.parse(chengxingriqi) <= Date.parse(checkdate)) {
            this.form.ql = dateDiff(chengxingriqi, checkdate)
            return callback()
          } else {
            return callback(new Error('成型日期不得大于要求试验日期'))
          }
        } else {
          return callback()
        }
      },
      validateCheckdate(rule, value, callback) {
        const checkdate = value
        const chengxingriqi = this.form.chengxingriqi
        if (chengxingriqi && checkdate) {
          // console.log(difday)
          if (Date.parse(checkdate) >= Date.parse(chengxingriqi)) {
            this.form.ql = dateDiff(chengxingriqi, checkdate)
            return callback()
          } else {
            return callback(new Error('要求试验日期不得小于成型日期'))
          }
        } else {
          return callback()
        }
      },
      validateQl(rule, value, callback) {
        const days = value
        const chengxingriqi = this.form.chengxingriqi
        if (chengxingriqi && days >= 0) {
          var nDate = Date.parse(chengxingriqi)
          var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000
          let rDate = new Date(millSeconds)
          let today = rDate.getFullYear() + '-' + (rDate.getMonth() + 1).toString().padStart(2, '0') + '-' + rDate.getDate().toString().padStart(2, '0')
          console.log(today)
          this.$set(this.form, 'checkdate', today)
          // this.form.repcondate = rDate
          return callback()
        } else {
          return callback(new Error('报告承诺天数不能为空'))
        }
      },
      handeldtlq() {
        if (this.form.chengxingriqi != '') {
          //date1结束时间
          let date1 = new Date()
          //date2当前时间
          let date2 = new Date(this.form.chengxingriqi)
          date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
          date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
          const diff = date1.getTime() - date2.getTime() //目标时间减去当前时间
          // this.$set(this.form, 'dtlq', alert(diff / (24 * 60 * 60 * 1000)))
          this.dtlq = (diff / (24 * 60 * 60 * 1000)).toString() //计算当前时间与结束时间之间相差天数
          this.$set(this.$data, 'dtlq', (diff / (24 * 60 * 60 * 1000)).toString())

          // var nDate = Date.parse()
          // var millSeconds = Math.abs(nDate) + 1 * 24 * 60 * 60 * 1000
          // let rDate = new Date(millSeconds)
          // alert(rDate - nDate)
          // this.form.dtlq = rDate - nDate
          // this.form.dtlq = rDate.getFullYear() + '-' + (rDate.getMonth() + 1).toString().padStart(2, '0') + '-' + rDate.getDate().toString().padStart(2, '0')
        }
      },
      validateSamnumLength(rule, value, callback) {
        const samnum = value
        if (samnum && samnum.length == 17) {
          return callback()
        } else if (samnum && samnum.length != 17) {
          return callback(new Error('样品编码长度不超过17个字符'))
        }
      },
      //结构部位
      queryStructpartSearchAsync(queryString, cb) {
        const restaurants = this.structparts
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //检验类别
      queryCheckTypeSearchAsync(queryString, cb) {
        const restaurants = this.checktypes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //生产厂家
      queryUnitnumSearchAsync(queryString, cb) {
        const restaurants = this.unitnums
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //备注
      queryExplSearchAsync(queryString, cb) {
        const restaurants = this.expls
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },

      //取样地点
      queryRecaddSearchAsync(queryString, cb) {
        const restaurants = this.recadds
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //取样地点2
      queryRecaddS2earchAsync(queryString, cb) {
        const restaurants = this.recadds2
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //检验批名称
      queryJyphsearchAsync(queryString, cb) {
        const restaurants = this.jyphs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //配合比编号
      queryImportnumsearchAsync(queryString, cb) {
        const restaurants = this.importnums
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },

      //制作人
      queryBackupcolumns2earchAsync(queryString, cb) {
        const restaurants = this.backupcolumns2
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 检验批号
      queryTestbatchSearchAsync(queryString, cb) {
        const restaurants = this.testbatchs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 构建名称
      queryCqpartSearchAsync(queryString, cb) {
        const restaurants = this.cqparts
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 种类
      queryWtsjlxSearchAsync(queryString, cb) {
        const restaurants = this.wtsjlxs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 检测标准
      queryStandardNameSearchAsync(queryString, cb) {
        const restaurants = this.standardnames
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      createStateFilterParent(queryString) {
        return (state) => state.value.includes(queryString.toLowerCase())
      },
      handleSelect(item) {
        console.log('select item:' + JSON.stringify(item))
      },
      async loadHisColunmDatas() {
        this.listLoading = true
        const { data } = await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_RECADD2S).then((response) => {
          this.recadds2 = response.data //取样地点2
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_JYPHS).then((response) => {
          this.jyphs = response.data //检验批名称
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_IMPORTNUMS).then((response) => {
          this.importnums = response.data //配合比编号
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_BACKUPCOLUMN2S).then((response) => {
          this.backupcolumns2 = response.data //制作人
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_TESTBATCHS).then((response) => {
          this.testbatchs = response.data //检验批号
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_CQPARTS).then((response) => {
          this.cqparts = response.data //构建名称
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_WTSJLXS).then((response) => {
          this.wtsjlxs = response.data //种类
        })
        await hislist(EM305CONSTS.ELMT_TYPE, EM305CONSTS.ELMT_CODE_STANDARDNAMES).then((response) => {
          this.standardnames = response.data //检测标准
        })

        this.listLoading = false
      },
      buildCurtEntrustProjectInfo(theForm) {
        const project = {}
        project.entunit = theForm.entunit // 委托单位
        project.entunitnum = theForm.entunitnum // 委托单位编号
        project.pronum = theForm.pronum // 工程编码
        project.proname = theForm.proname // 工程名称
        // project.prochargtypeName = theForm.prochargtypeName
        project.sendman = theForm.sendman // 送样人
        project.sendphone = theForm.sendphone // 送检人电话
        project.witname = theForm.witname // 见证单位
        project.supername = theForm.supername // 工程监理员
        project.witman = theForm.witman // 见证人
        project.witno = theForm.witno // 见证人证号
        project.witphone = theForm.witphone // 见证人电话
        project.recman = theForm.recman // 取样人
        project.recno = theForm.recno // 取样人证号
        project.recphone = theForm.recphone // 取样人电话
        project.recname = theForm.recname // 取样单位
        project.construcUnitName = theForm.construcUnitName // 施工单位
        project.inspman = theForm.inspname // 质量监督员
        project.superman = theForm.superman // 工程监理员
        project.buildUnitName = theForm.buildUnitName // 建设单位
        project.consstructionnum = theForm.consstructionnum //施工许可证号
        project.jcproject = theForm.jcproject //检测工程代码
        return project
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
