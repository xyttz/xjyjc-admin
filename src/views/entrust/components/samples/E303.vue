<template>
  <div v-loading="listLoading" class="app-container">
    <table style="width: 100%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-钢筋原材料拉伸机弯曲性能初验</td>
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
          <el-checkbox v-model="form.checkitem1" false-label="0" true-label="1">拉伸</el-checkbox>
          <el-checkbox v-model="form.checkitem2" false-label="0" true-label="1">冷弯</el-checkbox>
          <el-checkbox v-model="form.checkitem9" false-label="0" true-label="1">反向弯曲性能</el-checkbox>
          <el-checkbox v-model="form.checkitem3" false-label="0" true-label="1">化学分析</el-checkbox>
          <el-checkbox v-model="form.checkitem4" false-label="0" true-label="1">尺寸</el-checkbox>
          <el-checkbox v-model="form.checkitem5" false-label="0" true-label="1">重量偏差</el-checkbox>
          <el-checkbox v-model="form.checkitem6" false-label="0" true-label="1">最大力总伸长率</el-checkbox>
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
            <el-form-item label="样品名称" prop="sampname">
              <el-autocomplete
                v-model="form.sampname"
                :fetch-suggestions="querySampnamesSearchAsync"
                placeholder="请输入样品名称"
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
            <el-form-item label="委托日期" prop="entdate">
              <el-date-picker v-model="form.entdate" :editable="false" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
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
            <el-form-item label="报告承诺天数" prop="repcondays">
              <el-input v-model="form.repcondays" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告承诺日期" prop="repcondate">
              <el-date-picker v-model="form.repcondate" :editable="false" placeholder="选择报告承诺日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="代表批量(吨)" prop="deputybat">
              <el-input-number v-model="form.deputybat" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="炉、批号" prop="pihao">
              <!-- <el-input v-model="form.pihao" placeholder="请输入炉、批号" style="width: 560px" /> -->
              <el-autocomplete
                v-model="form.pihao"
                :fetch-suggestions="queryPiHaoSearchAsync"
                placeholder="请输入炉、批号"
                select-when-unmatched
                style="width: 560px"
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
            <el-form-item label="钢筋类别" prop="gcid">
              <el-select v-model="form.gcid" placeholder="请选择" style="width: 200px; padding: 0">
                <div class="tableHeader">
                  <span style="float: left; width: 100px">钢筋种类</span>
                  <span style="float: left">牌号</span>
                  <span style="float: left">盘条牌号</span>
                  <span style="float: left">最小公称直径</span>
                  <span style="float: left">最大公称直径</span>
                  <span style="float: left">级别</span>
                  <span style="float: left">表面形状</span>
                  <span style="float: left">弯心直径</span>
                  <span style="float: left">弯曲角度</span>
                  <span style="float: left">屈服强度</span>
                  <span style="float: left">极限强度</span>
                  <span style="float: left">伸长率</span>
                  <span style="float: left">冷弯</span>
                  <span style="float: left; width: 150px">检验标准</span>
                  <span style="float: left">碳(C)</span>
                  <span style="float: left">锰(Mn)</span>
                  <span style="float: left">硅(Si)</span>
                  <span style="float: left">磷(P)</span>
                  <span style="float: left">硫(S)</span>
                  <span style="float: left">釩(V)</span>
                  <span style="float: left">钛(Ti)</span>
                  <span style="float: left">碳当量(Ceq)</span>
                </div>
                <el-option v-for="item in gcIdOptions" :key="item.shownum" :label="item.c1" :value="item.shownum" @click.native="handleGcIdChange(item)">
                  <span style="float: left; width: 100px">{{ item.c1 }}</span>
                  <span style="float: left">{{ item.c2 }}</span>
                  <span style="float: left">{{ item.c15 }}</span>
                  <span style="float: left">{{ item.f3 }}</span>
                  <span style="float: left">{{ item.f4 }}</span>
                  <span style="float: left">{{ item.c3 }}</span>
                  <span style="float: left">{{ item.c5 }}</span>
                  <span style="float: left">{{ item.f1 }}</span>
                  <span style="float: left">{{ item.f2 }}</span>
                  <span style="float: left">{{ item.f5 }}</span>
                  <span style="float: left">{{ item.f6 }}</span>
                  <span style="float: left">{{ item.f7 }}</span>
                  <span style="float: left">{{ item.c4 }}</span>
                  <span style="float: left; width: 150px">{{ item.c6 }}</span>
                  <span style="float: left">{{ item.c7 }}</span>
                  <span style="float: left">{{ item.c8 }}</span>
                  <span style="float: left">{{ item.c9 }}</span>
                  <span style="float: left">{{ item.c10 }}</span>
                  <span style="float: left">{{ item.c11 }}</span>
                  <span style="float: left">{{ item.c12 }}</span>
                  <span style="float: left">{{ item.c13 }}</span>
                  <span style="float: left">{{ item.c14 }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公称直径(mm)" prop="da">
              <el-input v-model="form.da" style="width: 200px" />
            </el-form-item>
            <el-form-item label="合格证号" prop="hgcode">
              <!-- <el-input v-model="form.paihao" placeholder="请输入牌号" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.hgcode"
                :fetch-suggestions="queryHgCodeSearchAsync"
                placeholder="请输入合格证号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="牌号" prop="paihao">
              <el-input v-model="form.paihao" placeholder="牌号" style="width: 200px" />
            </el-form-item>
            <el-form-item label="抗震等级" prop="kzdj">
              <el-select v-model="form.kzdj" placeholder="请选择抗震等级" style="width: 200px">
                <el-option v-for="item in kzdjOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="盘条牌号" prop="ptpaihao">
              <el-input v-model="form.ptpaihao" placeholder="盘条牌号" style="width: 200px" />
            </el-form-item>

            <el-form-item label="检验批号">
              <!-- <el-input v-model="form.expl" placeholder="请输入备注" style="width: 560px" /> -->
              <el-autocomplete
                v-model="form.testbatch"
                :fetch-suggestions="queryTestBatchSearchAsync"
                placeholder="请输入检验批号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="加工状态">
              <!-- <el-input v-model="form.expl" placeholder="请输入备注" style="width: 560px" /> -->
              <el-autocomplete
                v-model="form.jgzt"
                :fetch-suggestions="queryJgztSearchAsync"
                placeholder="请输入加工状态"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="结构类型" prop="jgtype">
              <el-select v-model="form.jgtype" placeholder="请选择结构类型" style="width: 200px">
                <el-option v-for="item in jgtypeOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="检测标准">
              <el-input v-model="form.standname" placeholder="请输入检测标准" style="width: 560px" />
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
            <el-form-item label="经销单位" prop="vol1">
              <!-- <el-input v-model="form.recadd" placeholder="请输入取样地点" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.vol1"
                :fetch-suggestions="queryVol1SearchAsync"
                placeholder="请输入经销单位"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="实测直径1" prop="vol2">
              <!-- <el-input v-model="form.recadd" placeholder="请输入取样地点" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.vol2"
                :fetch-suggestions="queryVol2SearchAsync"
                placeholder="请输入实测直径1"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="实测直径2" prop="vol3">
              <!-- <el-input v-model="form.recadd" placeholder="请输入取样地点" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.vol3"
                :fetch-suggestions="queryVol3SearchAsync"
                placeholder="请输入实测直径2"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
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
            <el-form-item label="送样地点" prop="recadd">
              <!-- <el-input v-model="form.recadd" placeholder="请输入取样地点" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.sendadd"
                :fetch-suggestions="querySendaddSearchAsync"
                placeholder="请输入送样地点"
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
  import { getStandardTableList, getStandardColunmList } from '@/api/basic/standard'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM303CONSTS from '@/consts/EM303_CONSTS'
  import VabPrint from '@/extra/VabPrint'

  export default {
    name: 'E303',
    components: {
      ProjectInfo,
      VueQr,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_gjcc',
        jgtypeOptions: [],
        sampleStatusOptions: [],
        chkformOptions: [],
        kzdjOptions: [],
        gcIdOptions: [],
        loaded: true,
        listLoading: true,
        projectinfo: {},
        form: {
          checkitem1: false,
          checkitem2: false,
          checkitem3: false,
          id: 0,
          sampnum: '',
          entnum: '',
          repnum: '',
          structpart: '',
          entdate: '',
          checktype: '',
          repcondays: 1,
          sampstatus: '',
          deputybat: '',
          pihao: '',
          unitnum: '',
          gcid: '',
          dm: '',
          hgCode: '',
          paihao: '',
          kZdj: '',
          expl: '',
          jgtype: '',
          vol1: '',
          vol2: '',
          vol3: '',
          recadd: '',
          sendadd: '',
          project: {},
          oprtype: '',
        },
        attchForm: {},
        checkForm: {},
        oprtype: '',
        pronum: '',
        id: 0,
        rules: {
          entdate: [{ validator: this.validateEntdate, trigger: 'blur' }],
          repcondate: [{ validator: this.validateRepcondate, trigger: 'blur' }],
          repcondays: [{ validator: this.validateRepcondays, trigger: 'blur' }],
          da: [{ required: true, message: '公称直径必须输入', trigger: 'blur' }],
        },
        showQrCdoe: false,
        qrvalue: 'Hello World!',
        logoSrc: require('@/assets/qrlogo.png'),
        // logoCornerRadius: 10,
        structparts: [], //结构部位
        checktypes: [], //检验类别
        pihaos: [], //炉、批号
        unitnums: [], //生产厂家
        expls: [], //备注
        hg_codes: [], //合格证号
        recadds: [], //取样地点
        vol1s: [], //经销单位
        vol2s: [], //实测直径1
        vol3s: [], //实测直径2
        sendadds: [], //送样地点
        sampnames: [], //样品名称
        jgzts: [], //加工状态
        testbatchs: [], // 检验批号
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
          getByEntId(this.id, '303').then((response) => {
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
          //结构类型
          listDictItemByCode('Jgtype').then((response) => {
            this.jgtypeOptions = response.data
          })
          //抗震等级
          listDictItemByCode('KZDJ').then((response) => {
            this.kzdjOptions = response.data
          })
          //盘条牌号（无）
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
          // listDictItemByCode('SAMPLESTATUS').then((response) => {
          //   this.gcIdOptions = response.data
          // })
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
              updateEntrust(this.id, this.form, '303').then(
                (res) => {
                  let sampnum = res.data
                  getBySampleKey(sampnum, '303').then((response) => {
                    this.form = response.data
                    this.id = this.form.id
                    if ('1100000000000000000000000000000000000001' == this.form.sampphase) {
                      this.showQrCdoe = true
                      this.qrvalue = this.form.entkey + '##' + this.form.entnum + '##xz_ent_gjcc##xz_chk_gjcc'
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
              addEntrust(this.form, '303').then(
                (response) => {
                  let sampnum = response.data
                  console.log('added return samnum:' + sampnum)
                  getBySampleKey(sampnum, '303').then((response) => {
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
      handleGcIdChange: function (item) {
        /* {"id":984,"shownum":5,"libid":"GJCC_005",
        "libnum":"GJCC","c1":"低碳热轧圆盘条","c2":"Q235","c3":"B","c4":"受弯曲部位表面无裂纹",
        "c5":"圆盘条","c6":"GB/T 701-1997","c7":"0.12-0.20","c8":"0.30-0.70","c9":"0.00-0.30",
        "c10":"0.00-0.045","c11":"0.00-0.045","c12":"/","c13":"/","c14":"/","c15":"Q235",
        "f1":0.5,"f2":180,"f3":6,"f4":36,"f5":235,"f6":410,"f7":23,"deleted":0} */
        // console.log(item.c2)
        // console.log(JSON.stringify(item))
        // this.form.structpart = item.c1
        this.$set(this.form, 'paihao', item.c2)
        // this.form.paihao = item.c2
        // this.form.checktype = item.c3
        // this.form.dmin = item.f1
        this.$set(this.form, 'standname', item.c6)
        this.form.gcpz = item.c1
        this.form.gczjmin = item.f3
        this.form.gczjmax = item.f4
        this.form.jbcode = item.c3
        this.form.wqbzc = item.c4
        this.form.bmxz = item.c5
        this.form.hcezb = item.c7
        this.form.hmnzb = item.c8
        this.form.hsizb = item.c9
        this.form.hpzb = item.c10
        this.form.hszb = item.c11
        this.form.hvzb = item.c12
        this.form.htizb = item.c13
        this.form.hceqzb = item.c14
        this.form.ptpaihao = item.c15
        this.form.wxdbz = item.f1
        this.form.wqjd = item.f2
        this.form.mpaqfbzf = item.f5
        this.form.mpajxbzf = item.f6
        this.form.sbzf = item.f7
        // this.form.dmax = item.f2
        // this.form.standname = item.c4
      },
      handleReset() {
        this.id = undefined
        this.form = {
          checkitem1: false,
          checkitem2: false,
          checkitem3: false,
          id: 0,
          sampnum: '',
          entnum: '',
          repnum: '',
          structpart: '',
          entdate: '',
          checktype: '',
          sampstatus: '',
          deputybat: '',
          pihao: '',
          unitnum: '',
          gcid: '',
          dm: '',
          hgCode: '',
          paihao: '',
          kZdj: '',
          expl: '',
          jgtype: '',
          vol1: '',
          vol2: '',
          vol3: '',
          recadd: '',
          sendadd: '',
          project: {},
          oprtype: '',
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
      //合格证号
      queryHgCodeSearchAsync(queryString, cb) {
        const restaurants = this.hg_codes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
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
      //批号
      queryPiHaoSearchAsync(queryString, cb) {
        const restaurants = this.pihaos
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
      //经销单位
      queryVol1SearchAsync(queryString, cb) {
        const restaurants = this.vol1s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //实测直径1
      queryVol2SearchAsync(queryString, cb) {
        const restaurants = this.vol2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //实测直径2
      queryVol3SearchAsync(queryString, cb) {
        const restaurants = this.vol3s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //送样地点
      querySendaddSearchAsync(queryString, cb) {
        const restaurants = this.sendadds
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 样品名称
      querySampnamesSearchAsync(queryString, cb) {
        const restaurants = this.sampnames
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 加工状态
      queryJgztSearchAsync(queryString, cb) {
        const restaurants = this.jgzts
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // 检验批号
      queryTestBatchSearchAsync(queryString, cb) {
        const restaurants = this.testbatchs
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
        const { data } = await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_PIHAOS).then((response) => {
          this.pihaos = response.data //炉、批号
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_HG_CODES).then((response) => {
          this.hg_codes = response.data //合格证号
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_VOL1S).then((response) => {
          this.vol1s = response.data //经销单位
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_VOL2S).then((response) => {
          this.vol2s = response.data //实测直径1
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_VOL3S).then((response) => {
          this.vol3s = response.data //实测直径2
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_SENDADDS).then((response) => {
          this.sendadds = response.data //送样地点
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_SAMPNAMES).then((response) => {
          this.sampnames = response.data //样品名称
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_JGZTS).then((response) => {
          this.jgzts = response.data //加工状态
        })
        await hislist(EM303CONSTS.ELMT_TYPE, EM303CONSTS.ELMT_CODE_TESTBATCHS).then((response) => {
          this.testbatchs = response.data //检验批号
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
