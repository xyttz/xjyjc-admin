<template>
  <div v-loading="listLoading" class="app-container">
    <table style="width: 100%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-钢筋机械连接接头初验</td>
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
          <el-checkbox v-model="form.checkitem1" false-label="0" true-label="1">钢筋试验</el-checkbox>
          <el-checkbox v-model="form.checkitem5" false-label="0" true-label="1">残余变形</el-checkbox>
          <el-checkbox v-model="form.checkitem2" false-label="0" true-label="1">单向拉伸</el-checkbox>
          <el-checkbox v-model="form.checkitem3" false-label="0" true-label="1">高应力反复拉压</el-checkbox>
          <el-checkbox v-model="form.checkitem4" false-label="0" true-label="1">大变形反复拉压</el-checkbox>
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
            <el-form-item label="代表批量" prop="deputybat">
              <el-input-number v-model="form.deputybat" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="钢筋类别" prop="gcid">
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
            </el-form-item>
            <el-form-item label="公称直径(mm)" prop="dm">
              <el-input v-model="form.dMin" style="width: 92px" />
              ~
              <el-input v-model="form.dMax" style="width: 92px" />
            </el-form-item>
            <el-form-item label="面积(mm)">
              <el-input v-model="form.jmj" style="width: 200px" />
            </el-form-item>
            <el-form-item label="表面形状">
              <el-input v-model="form.shape" style="width: 200px" />
            </el-form-item>
            <el-form-item label="工程部位" prop="structpart">
              <el-autocomplete
                v-model="form.structpart"
                :fetch-suggestions="queryStructpartSearchAsync"
                placeholder="请输入工程部位"
                select-when-unmatched
                style="width: 560px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="接头等级" prop="gjjb">
              <el-select v-model="form.gjjb" placeholder="请选择接头等级" style="width: 200px">
                <el-option v-for="item in gjjbs" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <!-- <el-autocomplete
                v-model="form.gjjb"
                :fetch-suggestions="queryGjjbSearchAsync"
                placeholder="请输入接头等级"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
            </el-form-item>
            <el-form-item label="检验形式" prop="checkfrm">
              <el-select v-model="form.checkfrm" placeholder="请选择检验形式" style="width: 200px">
                <el-option v-for="item in checkfrms" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <!-- <el-autocomplete
                v-model="form.checkfrm"
                :fetch-suggestions="queryCheckFrmSearchAsync"
                placeholder="请输入检验形式"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
            </el-form-item>
            <el-form-item label="牌号" prop="paihao">
              <el-autocomplete
                v-model="form.paihao"
                :fetch-suggestions="queryPaiHaoSearchAsync"
                placeholder="请输入牌号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="接头类别" prop="jtlx">
              <el-select v-model="form.jtlx" placeholder="请选择接头类别" style="width: 200px">
                <el-option v-for="item in jtlxs" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <!-- <el-input v-model="form.jtlx" style="width: 200px" /> -->
              <!-- <el-autocomplete
                v-model="form.jtlx"
                :fetch-suggestions="queryJtlxSearchAsync"
                placeholder="请输入接头类别"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
            </el-form-item>
            <el-form-item label="操作员" prop="oprname">
              <el-autocomplete
                v-model="form.oprname"
                :fetch-suggestions="queryOprNameSearchAsync"
                placeholder="请输入操作员"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="操作员证号" prop="oprno">
              <el-autocomplete
                v-model="form.oprno"
                :fetch-suggestions="queryOprNoSearchAsync"
                placeholder="请输入焊工证号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">Name:{{ item.name }} Phone:{{ item.phone }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="炉、批号">
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
              <el-autocomplete
                v-model="form.unitnum"
                :fetch-suggestions="queryUnitnumSearchAsync"
                placeholder="请输入生产厂家"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" />
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
          </el-form>
        </td>
      </tr>
      <tr>
        <td colspan="8" style="background-color: #d9b7c6; color: #fff">附加信息</td>
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
  // import { nextval } from '@/api/system/sequence'
  import { getStandardTableList, getStandardColunmList } from '@/api/basic/standard'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM302CONSTS from '@/consts/EM302_CONSTS'
  import VabPrint from '@/extra/VabPrint'
import ProjectInfo from '../ProjectInfo.vue'
  export default {
    name: 'E302',
    components: {
      ProjectInfo,
      VueQr
        ProjectInfo,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_gmjc',
        hjxsOptions: [],
        sampleStatusOptions: [],
        gcIdOptions: [],
        loaded: true,
        listLoading: true,
        projectinfo: {},
        form: {
          id: 0,
          sampnum: '',
          entnum: '',
          repnum: '',
          // repcondays: 1,
          sampmout: 1,
          project: {},
          paihao: '',
          structpart: '',
          checktype: '',
          sampbat: 1,
          oprtype: '',
          dmin: 0,
          dmax: 0,
          standname: '',
          checkitem1: 'true',
          pronum: undefined,
        },
        attchForm: {},
        nums: {},
        pronum: '',
        id: 0,
        oprtype: '',
        pathType: '302',
        rules: {
          entdate: [{ validator: this.validateEntdate, trigger: 'blur' }],
          repcondate: [{ validator: this.validateRepcondate, trigger: 'blur' }],
          repcondays: [{ validator: this.validateRepcondays, trigger: 'blur' }],
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
        pihaos: [], //炉、批号
        unitnums: [], //生产厂家
        mansNameFirst: [], //操作员姓名
        mansIdFirst: [], //操作员证号
        expls: [], //备注
        recadds: [], //取样地点
        paihaos: [], //牌号
        sampnums: [], //样品编码
        gjjbs: [], //接头等级
        checkfrms: [], //检验形式
        jtlxs: [], // 接头类型
        sampnames: [], //样品名称
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
        console.log('pronum:' + this.pronum + '|id:' + this.id + '| oprtype:' + this.oprtype)
        if (this.id) {
          getByEntId(this.id, this.pathType).then((response) => {
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

          if (this.id) {
            this.form.project = this.buildCurtEntrustProjectInfo(this.form)
            this.$refs.project.setProjectData(this.form.project)
          } else {
            detail(this.pronum).then((response) => {
              this.projectinfo = response.data
              this.$refs.project.setProjectData(this.projectinfo)
              this.form.project = this.projectinfo
            })
          }

          // detail(this.pronum).then((response) => {
          //   this.projectinfo = response.data
          //   // console.log(JSON.stringify(this.projectdata))
          //   if (this.id) {
          //     this.form.project = this.buildCurtEntrustProjectInfo(this.form)
          //     this.$refs.project.setProjectData(this.form.project)
          //   } else {
          //     this.$refs.project.setProjectData(this.projectinfo)
          //     this.form.project = this.projectinfo
          //   }
          // })
          listDictItemByCode('SAMPLESTATUS').then((response) => {
            this.sampleStatusOptions = response.data
          })
          listDictItemByCode('HJHS').then((response) => {
            this.hjxsOptions = response.data
          })
          listDictItemByCode('CHKFORM').then((response) => {
            this.checkfrms = response.data
          })
          listDictItemByCode('GJJB').then((response) => {
            this.gjjbs = response.data
          })
          listDictItemByCode('JTLX').then((response) => {
            this.jtlxs = response.data
          })

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
              updateEntrust(this.id, this.form, this.pathType).then(
                (res) => {
                  let sampnum = res.data
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
              console.log('add:' + JSON.stringify(this.form))
              addEntrust(this.form, this.pathType).then(
                (response) => {
                  let sampnum = response.data
                  console.log('added return samnum:' + sampnum)
                  getBySampleKey(sampnum, this.pathType).then((response) => {
                    console.log('find by samplekey:' + JSON.stringify(response.data))
                    // this.oprtype == 'update'
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
      handleGcIdChange: function (item) {
        //{"id":324,"shownum":2,"libid":"GHJC_002","libnum":"GHJC","c1":"低碳热轧圆盘条","c2":"Q235","c3":"Ⅰ","c4":"JGJ18-2003","f1":6,"f2":36,"f3":410,"deleted":0}
        // console.log(item.c2)
        console.log(JSON.stringify(item))
        // this.form.structpart = item.c1
        // this.$set(this.form, 'gjjb', item.c3)
        this.$set(this.form, 'paihao', item.c2)
        // this.form.paihao = item.c2
        this.$set(this.form, 'shape', item.c5)
        this.form.gcpz = item.c1

        // this.form.checktype = item.c3
        // this.form.dmin = item.f1
        this.$set(this.form, 'dMin', item.f3)
        this.$set(this.form, 'dMax', item.f4)
        let jmj = Math.round(Math.PI * Math.pow(item.f3 / 2, 2))
        this.$set(this.form, 'jmj', jmj)
        // this.$set(this.form, 'standname', item.c4)
        // this.form.dmax = item.f2
        this.form.standname = item.c6
        this.form.mmpabz = item.f5
        this.form.mpabz = item.f6
      },
      handleReset() {
        this.id = undefined
        this.form = {
          id: undefined,
          sampnum: '',
          entnum: '',
          repnum: '',
          // repcondays: 1,
          sampmout: 1,
          project: {},
          paihao: '',
          structpart: '',
          checktype: '',
          deputybat: 1,
          oprtype: '',
          sampstatus: '',
          gcId: '',
          gjjb: '',
          checkfrm: '',
          jtlx: '',
          oprname: '',
          oprno: '',
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
      queryPiHaoSearchAsync(queryString, cb) {
        const restaurants = this.pihaos
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
      queryOprNameSearchAsync(queryString, cb) {
        const restaurants = this.mansNameFirst
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryOprNoSearchAsync(queryString, cb) {
        const restaurants = this.mansIdFirst
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
      queryRecaddSearchAsync(queryString, cb) {
        const restaurants = this.recadds
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryPaiHaoSearchAsync(queryString, cb) {
        const restaurants = this.paihaos
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
      createStateFilterParent(queryString) {
        return (state) => state.value.includes(queryString.toLowerCase())
      },
      handleSelect(item) {
        console.log('select item:' + JSON.stringify(item))
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
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_SAMPNAMES).then((response) => {
          this.sampnames = response.data //样品名称
        })
        const { data } = await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_PIHAOS).then((response) => {
          this.pihaos = response.data //炉、批号
        })
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM302CONSTS.ELMT_TYPE, EM302CONSTS.ELMT_CODE_PAIHAOS).then((response) => {
          this.paihaos = response.data //牌号
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
