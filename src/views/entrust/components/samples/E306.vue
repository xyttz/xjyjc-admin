<template>
  <div v-loading="listLoading" class="app-container">
    <table style="width: 100%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-混凝土抗水渗透性能</td>
      </tr>
      <tr>
        <td class="td_right">当前工程编码：</td>
        <td>{{ projectinfo.pronum }}</td>
        <td class="td_right">当前工程名称：</td>
        <td colspan="4">
          {{ projectinfo.proname }}
          <!-- <el-input v-model="form.project.proname" style="width: 500px" /> -->
        </td>
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
        <td colspan="4">
          {{ projectinfo.entunit }}
          <!-- <el-input v-model="form.project.entunit" style="width: 500px" /> -->
        </td>
      </tr>
      <tr>
        <td class="td_right">合同编号：</td>
        <td></td>
        <td class="td_right">监督备案号：</td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <!-- <td class="td_right">最新编号：</td>
        <td>{{ nums.entrustno }}</td> -->
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
          <el-checkbox v-model="form.checkitem1" false-label="0" true-label="1">混凝土抗渗强度</el-checkbox>
        </td>
      </tr>
      <tr>
        <td colspan="8" style="padding: 0px">
          <project-info ref="project" @refMansIdNoFirst="refMansIdNoFirst" @refMansNameFirst="refMansNameFirst" />
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
            <el-form-item label="试样名称" prop="sampname">
              <el-autocomplete
                v-model="form.sampname"
                :fetch-suggestions="querySampnamesSearchAsync"
                placeholder="请输入试样名称"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="检验类别" prop="checktype">
              <el-autocomplete
                v-model="form.checktype"
                :fetch-suggestions="queryCheckTypeSearchAsync"
                placeholder="请输入送检类别"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="成型日期" prop="modeldate">
              <el-date-picker v-model="form.modeldate" placeholder="选择成型日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="要求龄期" prop="lingqi">
              <el-input-number v-model="form.lingqi" controls-position="right" :min="1" style="width: 200px" />
              <!-- <el-autocomplete
                v-model="form.lingqi"
                :fetch-suggestions="querylingqiSearchAsync"
                placeholder="请输入龄期"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
            </el-form-item>
            <el-form-item label="委托日期" prop="entdate">
              <el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="报告承诺天数" prop="repcondays">
              <el-input v-model="form.repcondays" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告承诺日期" prop="repcondate">
              <el-date-picker v-model="form.repcondate" :editable="false" placeholder="选择报告承诺日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="强度等级C" prop="qddjc">
              <!-- <el-input v-model="form.qddjc" style="width: 200px" /> -->
              <el-select v-model="form.qddjc" placeholder="请选择抗渗等级" style="width: 200px">
                <el-option v-for="item in qddjcs" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="要求试验日期" prop="reqcheckdate">
              <el-date-picker v-model="form.reqcheckdate" placeholder="选择试验日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
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
            <el-form-item label="水泥品种" prop="cementtype">
              <el-autocomplete
                v-model="form.cementtype"
                :fetch-suggestions="queryCementtypeSearchAsync"
                placeholder="请输入水泥品种"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="检验批号" prop="jyph">
              <el-autocomplete
                v-model="form.jyph"
                :fetch-suggestions="queryJianYanPiHaoSearchAsync"
                placeholder="请输入检验批号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="配合比编号" prop="phbbh">
              <el-autocomplete
                v-model="form.phbbh"
                :fetch-suggestions="queryPhbbhSearchAsync"
                placeholder="请输入配合比编号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="养护条件" prop="yhtj">
              <el-autocomplete
                v-model="form.yhtj"
                :fetch-suggestions="queryYhtjSearchAsync"
                placeholder="请输入养护条件"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="配合比" prop="phb">
              <el-autocomplete
                v-model="form.phb"
                :fetch-suggestions="queryPhbSearchAsync"
                placeholder="请输入配合比"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品尺寸" prop="ypcc">
              <el-autocomplete
                v-model="form.ypcc"
                :fetch-suggestions="queryYpccSearchAsync"
                placeholder="请输入样品尺寸"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="水灰比" prop="shb">
              <el-autocomplete
                v-model="form.shb"
                :fetch-suggestions="queryShbSearchAsync"
                placeholder="请输入水灰比"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="生产厂家" prop="unitnum">
              <el-autocomplete
                v-model="form.unitnum"
                :fetch-suggestions="queryUnitnumSearchAsync"
                placeholder="请输入生产厂家"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="抗渗等级" prop="ksdj">
              <!-- <el-autocomplete
                v-model="form.ksdj"
                :fetch-suggestions="queryKsdjSearchAsync"
                placeholder="请输入抗渗等级"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
              <el-select v-model="form.ksdj" placeholder="请选择抗渗等级" style="width: 200px">
                <el-option v-for="item in ksdjs" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="代表批量" prop="deputybat">
              <el-input v-model="form.deputybat" style="width: 200px" />
            </el-form-item>
            <el-form-item label="水泥标号" prop="snbh">
              <el-autocomplete
                v-model="form.snbh"
                :fetch-suggestions="querySnbhSearchAsync"
                placeholder="请输入水泥标号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="水泥用量" prop="snyl">
              <el-autocomplete
                v-model="form.snyl"
                :fetch-suggestions="querySnylSearchAsync"
                placeholder="请输入水泥标号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="砂率" prop="shalv">
              <el-autocomplete
                v-model="form.shalv"
                :fetch-suggestions="queryShalvSearchAsync"
                placeholder="请输入砂率"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="外加剂种类1" prop="additive1">
              <el-autocomplete
                v-model="form.additive1"
                :fetch-suggestions="queryAdditive1SearchAsync"
                placeholder="请输入外加剂种类1"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="外加剂种类2" prop="additive2">
              <el-autocomplete
                v-model="form.additive2"
                :fetch-suggestions="queryAdditive2SearchAsync"
                placeholder="请输入外加剂种类2"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="外加剂种类3" prop="additive3">
              <el-autocomplete
                v-model="form.additive3"
                :fetch-suggestions="queryAdditive3SearchAsync"
                placeholder="请输入外加剂种类3"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="备注" prop="expl">
              <el-autocomplete
                v-model="form.expl"
                :fetch-suggestions="queryExplSearchAsync"
                placeholder="请输入备注"
                select-when-unmatched
                style="width: 560px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="检测标准" prop="expl">
              <el-autocomplete
                v-model="form.standname"
                :fetch-suggestions="queryJcbzSearchAsync"
                placeholder="请输入检测标准"
                select-when-unmatched
                style="width: 200px"
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
              <el-autocomplete
                v-model="form.recadd"
                :fetch-suggestions="queryRecaddSearchAsync"
                placeholder="请输入取样地点"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="生产单位" prop="produnit">
              <el-autocomplete
                v-model="form.produnit"
                :fetch-suggestions="queryProdunitSearchAsync"
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
  // import { getByEntId } from '@/api/entrust/entrust'
  import { listDictItemByCode } from '@/api/system/dict-item'
  // import { nextval } from '@/api/system/sequence'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM306CONSTS from '@/consts/EM306_CONSTS'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'E306',
    components: {
      ProjectInfo,
      // VueQrcode,
      VueQr,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_hnks',
        pathType: '306',
        sampleStatusOptions: [],
        loaded: true,
        listLoading: true,
        projectinfo: {},
        form: {
          id: 0,
          sampnum: '',
          entnum: '',
          repnum: '',
          // repcondays: 1,
          sampphase: '',
          sampmout: 1,
          project: {},
          paihao: '',
          structpart: '',
          checktype: '',
          deputybat: 1,
          oprtype: '',
          lingqi: 1,
        },
        attchForm: {},
        checkForm: {},
        pronum: '',
        id: 0,
        oprtype: '',
        rules: {
          entdate: [{ validator: this.validateEntdate, trigger: 'blur' }],
          repcondate: [{ validator: this.validateRepcondate, trigger: 'blur' }],
          repcondays: [{ validator: this.validateRepcondays, trigger: 'blur' }],
          lingqi: [{ validator: this.validateLingQi, trigger: 'blur' }],
          // modeldate: [{ validator: this.validateChxdate, trigger: 'blur' }],
          // sampnum: [
          //   { required: true, message: '样品编号必须输入', trigger: 'blur' },
          //   { validator: this.validateSamnumLength, trigger: 'blur' },
          // ],
          // dmin: [{ type: 'number', message: '必须为数字值', trigger: 'change' }],
          // dmax: [{ type: 'number', message: '必须为数字值', trigger: 'change' }],
        },
        showQrCdoe: false,
        qrvalue: 'Hello World!',
        logoSrc: require('@/assets/qrlogo.png'),
        // logoCornerRadius: 10,
        structparts: [], //结构部位
        checktypes: [], //检验类别
        unitnums: [], //生产厂家
        sampnames: [], //样品名称
        expls: [], //备注
        recadds: [], //取样地点
        sampnums: [], //样品编码
        jianyanpihao: [], // 检验批号
        qddjcs: [], // 强度等级C
        // lingqis: [], //  要求龄期
        cementtypes: [], // 水泥品种
        phbbhs: [], //  配合比编号
        yhtjs: [], //  养护条件
        phbs: [], // 配合比
        ypccs: [], // 样品尺寸
        snbs: [], // 水灰比
        ksdjs: [], // 抗渗等级
        snbhs: [], //  水泥标号
        snyls: [], //水泥用量
        shalvs: [], //  砂率
        additive1s: [], //  外加剂种类1
        additive2s: [], //  外加剂种类2
        additive3s: [], //  外加剂种类3
        produnits: [], // 生产单位
        jcbzs: [], // 检测标准
      }
    },
    watch: {
      $route(val, oldval) {
        console.log('val:' + val + 'oldval' + oldval)
        this.loadData()
      },
    },
    created() {
      // this.$nextTick(() => {
      this.loadData()
      // })
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
        if (this.id) {
          getByEntId(this.id, this.pathType).then((response) => {
            // console.log(this.id)
            // console.log(JSON.stringify(response.data))
            this.form = response.data

            // this.pronum = this.form.pronum
            if ('1000000000000000000000000000000000000000' != this.form.sampphase && this.oprtype != 'append') {
              this.showQrCdoe = true
              this.qrvalue = this.form.entkey + '##' + this.form.entnum + '##' + this.table
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
          listDictItemByCode('SAMPLESTATUS').then((response) => {
            this.sampleStatusOptions = response.data
          })
          listDictItemByCode('KSDJ306').then((response) => {
            this.ksdjs = response.data
          })
          listDictItemByCode('SheJiDengJi').then((response) => {
            this.qddjcs = response.data
          })

          this.loaded = false
        } else {
          this.loaded = false
        }
      },
      handleSubmit: function (oprtype) {
        this.form.pronum = this.projectinfo.pronum
        this.$refs.form.validate((formValid) => {
          if (formValid) {
            const Loading = this.$baseLoading(5)
            // this.$refs.attchForm.validate((attchValid) => {
            //   if (attchValid) {
            console.log(JSON.stringify(this.form))
            // Object.assign(this.form, form)
            if (this.id) {
              // 编辑
              if (this.oprtype == 'append') {
                this.form.oprtype = this.oprtype
              } else if (this.oprtype == 'update') {
                this.form.oprtype = this.oprtype
              } else {
                this.form.oprtype = oprtype
              }
              this.form.project = this.$refs.project.projectForm
              updateEntrust(this.id, this.form, this.pathType).then(
                (res) => {
                  let sampnum = res.data
                  console.log('updated sampnum:' + sampnum)
                  getBySampleKey(sampnum, this.pathType).then((response) => {
                    this.form = response.data
                    this.id = this.form.id
                    if ('1100000000000000000000000000000000000001' == this.form.sampphase) {
                      this.showQrCdoe = true
                      this.qrvalue = this.form.entkey + '##' + this.form.entnum + '##xz_ent_ghjc##xz_chk_ghjc'
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
              addEntrust(this.form, this.pathType).then(
                (response) => {
                  let sampnum = response.data
                  console.log('added return samnum:' + sampnum)
                  getBySampleKey(sampnum, this.pathType).then((response) => {
                    console.log('find by samplekey:' + JSON.stringify(response.data))
                    this.oprtype == 'update'
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
      },
      handleReset() {
        this.form = {
          sampnum: '',
          entnum: '',
          repnum: '',
          // repcondays: 1,
          sampmout: 1,
          project: {},
          paihao: '',
          structpart: '',
          checktype: '',
          oprtype: '',
          sampstatus: '',
          pihao: '',
          unitnum: '',
          expl: '',
          recadd: '',
        }
      },
      async openPrintDialag() {
        await this.foldSideBar()
        await VabPrint(this.$refs['vab-print-qrimage'], { noPrintParent: true })
        await this.openSideBar()
      },
      validateEntdate(rule, value, callback) {
        const entdate = value
        const repcondate = this.form.repcondate
        var lingqi = this.form.lingqi
        var chxdate = this.form.modeldate
        if (entdate && repcondate) {
          // var difday = dateDiff(entdate, repcondate)
          // console.log(difday)
          if (Date.parse(entdate) <= Date.parse(repcondate)) {
            this.form.repcondays = dateDiff(entdate, repcondate)
            return callback()
          } else {
            return callback(new Error('委托日期不得大于报告承诺日期'))
          }
        } else if (lingqi && lingqi >= 0 && chxdate) {
          var nDate = Date.parse(chxdate)
          var millSeconds = Math.abs(nDate) + lingqi * 24 * 60 * 60 * 1000
          let rDate = new Date(millSeconds)
          let today = rDate.getFullYear() + '-' + (rDate.getMonth() + 1).toString().padStart(2, '0') + '-' + rDate.getDate().toString().padStart(2, '0')
          console.log(today)
          this.$set(this.form, 'entdate', today)
          // this.form.repcondate = rDate
          return callback()
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
        } else {
          return callback(new Error('报告承诺天数不能为空'))
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
      validateLingQi(rule, value, callback) {
        var lingqi = value
        if (lingqi && lingqi >= 0) {
          var chxdate = this.form.modeldate
          if (chxdate) {
            var nDate = Date.parse(chxdate)
            var millSeconds = Math.abs(nDate) + lingqi * 24 * 60 * 60 * 1000
            let rDate = new Date(millSeconds)
            let today = rDate.getFullYear() + '-' + (rDate.getMonth() + 1).toString().padStart(2, '0') + '-' + rDate.getDate().toString().padStart(2, '0')
            console.log(today)
            this.$set(this.form, 'entdate', today)
            // this.form.repcondate = rDate
            return callback()
          } else {
            return callback(new Error('请选择成型日期'))
          }
        }
      },
      // validateChxdate(rule, value, callback) {
      //   var chxdate = value
      // },
      queryStructpartSearchAsync(queryString, cb) {
        const restaurants = this.structparts
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCheckTypeSearchAsync(queryString, cb) {
        const restaurants = this.checktypes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryUnitnumSearchAsync(queryString, cb) {
        const restaurants = this.unitnums
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryRecaddSearchAsync(queryString, cb) {
        const restaurants = this.recadds
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryExplSearchAsync(queryString, cb) {
        const restaurants = this.expls
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySampnumSearchAsync(queryString, cb) {
        const restaurants = this.sampnums
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryJianYanPiHaoSearchAsync(queryString, cb) {
        const restaurants = this.jianyanpihao
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // queryQDDJCSearchAsync(queryString, cb) {
      //   const restaurants = this.qddjcs
      //   const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
      //   clearTimeout(this.timeout)
      //   this.timeout = setTimeout(() => {
      //     cb(results)
      //   }, 500)
      // },
      // querylingqiSearchAsync(queryString, cb) {
      //   const restaurants = this.lingqis
      //   const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
      //   clearTimeout(this.timeout)
      //   this.timeout = setTimeout(() => {
      //     cb(results)
      //   }, 500)
      // },
      queryCementtypeSearchAsync(queryString, cb) {
        const restaurants = this.cementtypes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryPhbbhSearchAsync(queryString, cb) {
        const restaurants = this.phbbhs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryYhtjSearchAsync(queryString, cb) {
        const restaurants = this.yhtjs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryPhbSearchAsync(queryString, cb) {
        const restaurants = this.phbs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryYpccSearchAsync(queryString, cb) {
        const restaurants = this.ypccs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryShbSearchAsync(queryString, cb) {
        const restaurants = this.snbs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // queryKsdjSearchAsync(queryString, cb) {
      //   const restaurants = this.ksdjs
      //   const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
      //   clearTimeout(this.timeout)
      //   this.timeout = setTimeout(() => {
      //     cb(results)
      //   }, 500)
      // },
      querySnbhSearchAsync(queryString, cb) {
        const restaurants = this.snbhs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySnylSearchAsync(queryString, cb) {
        const restaurants = this.snyls
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySampnamesSearchAsync(queryString, cb) {
        const restaurants = this.sampnames
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryShalvSearchAsync(queryString, cb) {
        const restaurants = this.shalvs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryAdditive1SearchAsync(queryString, cb) {
        const restaurants = this.additive1s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryAdditive2SearchAsync(queryString, cb) {
        const restaurants = this.additive2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryAdditive3SearchAsync(queryString, cb) {
        const restaurants = this.additive3s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryProdunitSearchAsync(queryString, cb) {
        const restaurants = this.produnits
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryJcbzSearchAsync(queryString, cb) {
        const restaurants = this.jcbzs
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
      handleSampleNumSelect(item) {
        console.log('select item:' + JSON.stringify(item))
        let sampnum = this.nums.sampno
        // this.form.entnum = this.nums.entrustno
        // this.form.repnum = this.nums.entrustno
        let inputvalue = item.value
        if (inputvalue != sampnum) {
          if (inputvalue.length > 14) {
            this.form.entnum = inputvalue.substring(0, 14)
            this.form.repnum = inputvalue.substring(0, 14)
          }
        }
      },
      handleSampleNumChange(item) {
        console.log('change item:' + JSON.stringify(item))
        let sampnum = this.nums.sampno
        // this.form.entnum = this.nums.entrustno
        // this.form.repnum = this.nums.entrustno
        let inputvalue = item
        if (inputvalue != sampnum) {
          if (inputvalue.length > 14) {
            this.form.entnum = inputvalue.substring(0, 14)
            this.form.repnum = inputvalue.substring(0, 14)
          }
        }
      },
      refMansNameFirst(mansNameFirst) {
        if (mansNameFirst) {
          // console.log(mansNameFirst)
          this.mansNameFirst = mansNameFirst
        }
      },
      refMansIdNoFirst(mansIdFirst) {
        if (mansIdFirst) {
          // console.log(mansNameFirst)
          this.mansIdFirst = mansIdFirst
        }
      },
      async loadHisColunmDatas() {
        this.listLoading = true
        const { data } = await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_SAMPNUMS).then((response) => {
          this.sampnums = response.data //样品编号
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_JIANYANPIHAO).then((response) => {
          this.jianyanpihao = response.data //检验批号
        })
        // await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_QDDJC).then((response) => {
        //   this.qddjcs = response.data //强度等级C
        // })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_LINGQI).then((response) => {
          this.lingqis = response.data //要求龄期
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_CEMENTTYPE).then((response) => {
          this.cementtypes = response.data //水泥品种
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_PHBBH).then((response) => {
          this.phbbhs = response.data //配合比编号
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_YHTJ).then((response) => {
          this.yhtjs = response.data //养护条件
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_PHB).then((response) => {
          this.yhtjs = response.data //配合比
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_YPCC).then((response) => {
          this.ypccs = response.data //样品尺寸
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_SNB).then((response) => {
          this.snbs = response.data //水灰比
        })
        // await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_KSDJ).then((response) => {
        //   this.ksdjs = response.data //抗渗等级
        // })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_SNBH).then((response) => {
          this.snbhs = response.data //水泥标号
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_SNYL).then((response) => {
          this.snyls = response.data //水泥用量
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_SHALV).then((response) => {
          this.shalvs = response.data //砂率
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_ADDITIVE1).then((response) => {
          this.additive1s = response.data //外加剂种类1
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_ADDITIVE2).then((response) => {
          this.additive2s = response.data //外加剂种类2
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_ADDITIVE3).then((response) => {
          this.additive3s = response.data //外加剂种类3
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_PRODUNIT).then((response) => {
          this.produnits = response.data //外加剂种类3
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_JCBZ).then((response) => {
          this.jcbzs = response.data //外加剂种类3
        })
        await hislist(EM306CONSTS.ELMT_TYPE, EM306CONSTS.ELMT_CODE_SAMPNAMES).then((response) => {
          this.sampnames = response.data //样品名称
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
