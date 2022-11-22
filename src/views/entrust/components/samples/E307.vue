<template>
  <div class="app-container">
    <table style="width: 100%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-钢筋原材料拉伸机弯曲性能初验</td>
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
        <td>{{ form.entrustno }}</td>
        <td class="td_right">样品编号：</td>
        <td>{{ nums.sampno }}</td>
        <td class="td_right">报告编号：</td>
        <td colspan="2">{{ nums.entrustno }}</td>
      </tr>
      <tr>
        <td class="td_right" colspan="1">检测子项目：</td>
        <td colspan="1"><el-checkbox v-model="form.checkitem1" false-label="0" true-label="1">减水率试验</el-checkbox></td>
        <td colspan="1"><el-checkbox v-model="form.checkitem2" false-label="0" true-label="1">凝结时间差</el-checkbox></td>
        <td colspan="1"><el-checkbox v-model="form.checkitem3" false-label="0" true-label="1">含气量试验</el-checkbox></td>
        <td colspan="1"><el-checkbox v-model="form.checkitem4" false-label="0" true-label="1">28d收缩率比</el-checkbox></td>
        <td colspan="1"><el-checkbox v-model="form.checkitem5" false-label="0" true-label="1">抗压强度比试验</el-checkbox></td>
        <td colspan="2" style="text-align: right"><el-checkbox v-model="form.autodefine" false-label="0" true-label="1">系统自动检下结论</el-checkbox></td>
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
              <el-input v-model="form.sampnum" style="width: 200px" />
            </el-form-item>
            <el-form-item label="委托编号" prop="entnum">
              <el-input v-model="form.entnum" style="width: 200px" />
            </el-form-item>
            <el-form-item label="报告编号" prop="repnum">
              <el-input v-model="form.repnum" style="width: 200px" />
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
              <el-form-item label="样品名称" prop="sampname">
                <el-select v-model="form.sampname" placeholder="请选择样品名称" style="width: 200px">
                  <el-option v-for="item in sampnameOptions" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="委托日期" prop="entdate">
              <el-date-picker
                v-model="form.entdate"
                :editable="false"
                :picker-options="pickerOptions"
                placeholder="选择委托日期"
                style="width: 200px"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="报告承诺天数" prop="repcondays">
              <el-input v-model="form.repcondays" style="width: 200px" />
            </el-form-item>

            <el-form-item label="报告承诺日期" prop="repcondate">
              <el-date-picker
                v-model="form.repcondate"
                :editable="false"
                :picker-options="pickerOptions"
                placeholder="选择报告承诺日期"
                style="width: 200px"
                type="date"
                value-format="yyyy-MM-dd"
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
            <el-form-item label="样品类别" prop="entjx">
              <el-select v-model="form.entjx" placeholder="请选择样品类别" style="width: 200px">
                <el-option v-for="item in entJXOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="代表批量" prop="deputybat">
              <el-input-number v-model="form.deputybat" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="掺量" prop="cl">
              <el-autocomplete
                v-model="form.cl"
                :fetch-suggestions="queryClSearchAsync"
                placeholder="请输入掺量"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品等级" prop="entdj">
              <el-select v-model="form.entdj" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in entDJOptions" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="生产厂家" prop="unitnum">
              <el-input v-model="form.unitnum" style="width: 200px" />
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="生产日期" prop="proddate">
              <el-date-picker v-model="form.proddate" placeholder="选择生产日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
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
  // import { getByEntId } from '@/api/entrust/entrust'
  import { listDictItemByCode } from '@/api/system/dict-item'
  //import { nextval } from '@/api/system/sequence'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM307CONSTS from '@/consts/EM307_CONSTS'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'E307',
    components: {
      ProjectInfo,
      VueQr,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_hjsj',
        sampleStatusOptions: [],
        entDJOptions: [],
        entJXOptions: [],
        sampnameOptions: [],
        loaded: false,
        projectinfo: {},
        form: {
          autodefine: '',
          sampnum: '',
          entnum: '',
          repnum: '',
          checktype: '',
          repcondays: '',
          entdate: '',
          sampname: '',
          repcondate: '',
          structpart: '',
          entjx: '',
          sampstatus: '',
          deputybat: '',
          cl: '',
          entdj: '',
          unitnum: '',
          sampmout: '',
          proddate: '',
          checkitem1: 'true',
          checkitem2: 'true',
        },
        attchForm: {},
        checkForm: {},
        nums: {},
        oprtype: '',
        pronum: '',
        id: 0,
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
        pickerOptions: {
          disabledDate(date) {
            return date.getTime() <= Date.now() - 8.64e7
          },
        },
        structparts: [], //结构部位
        checktypes: [], //检验类别
        unitnums: [], //生产厂家
        expls: [], //备注
        recadds: [], //取样地点
        sampnums: [], //样品编码
        sendadds: [], //送样地点
        sampname: [], //样品名称
        cls: [], //掺量
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
        // 修改委托处理，添加委托处理，新建委托处理 三类情况判断
        // 编号不在初始化时创建，提交委托时处理
        // 添加委托时，委托和报告编号不变，样品编号加一，在最后提交时处理，显示时只是临时处理 避免两人同时添加委托单

        if (this.id) {
          getByEntId(this.id, '307').then((response) => {
            this.form = response.data
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
              this.form.project = this.buildCurtEntrustProjectInfo(this.projectinfo, this.form)
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
          //样品类别
          listDictItemByCode('entJX').then((response) => {
            this.entJXOptions = response.data
          })

          //样品等级
          listDictItemByCode('entDJ').then((response) => {
            this.entDJOptions = response.data
          })
          //样品名称
          listDictItemByCode('sampname307').then((response) => {
            this.sampnameOptions = response.data
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
        this.$refs.form.validate((formValid) => {
          if (formValid) {
            const Loading = this.$baseLoading(5)
            // this.$refs.attchForm.validate((attchValid) => {
            //   if (attchValid) {
            // console.log(JSON.stringify(this.form) + '|' + JSON.stringify(this.$refs.project.projectForm))
            // Object.assign(this.form, form)
            if (this.id) {
              // 编辑
              if (this.oprtype == 'append') {
                this.form.oprtype = this.oprtype
              } else {
                this.form.oprtype = oprtype
              }
              this.form.project = this.$refs.project.projectForm
              updateEntrust(this.id, this.form, '307').then(
                (res) => {
                  let sampnum = res.data
                  debugger
                  getBySampleKey(sampnum, '307').then((response) => {
                    this.form = response.data
                    this.id = this.form.id
                    if ('1100000000000000000000000000000000000001' == this.form.sampphase) {
                      this.showQrCdoe = true
                      this.qrvalue = this.form.entkey + '##' + this.form.entnum + '##xz_ent_hjsj##xz_chk_hjsj'
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
              addEntrust(this.form, '307').then(
                (response) => {
                  let sampnum = response.data
                  getBySampleKey(sampnum, '307').then((response) => {
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
          autodefine: '',
          sampnum: '',
          entnum: '',
          repnum: '',
          checktype: '',
          repcondays: '',
          entdate: '',
          sampname: '',
          repcondate: '',
          structpart: '',
          entjx: '',
          sampstatus: '',
          deputybat: '',
          cl: '',
          entdj: '',
          unitnum: '',
          sampmout: '',
          proddate: '',
          checkitem1: 'true',
          checkitem2: 'true',
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
        if (entdate && days) {
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
      //样品编码
      querySampnumSearchAsync(queryString, cb) {
        const restaurants = this.sampnums
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

      //掺量
      queryClSearchAsync(queryString, cb) {
        const restaurants = this.cls
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      //样品名称
      querySampnameSearchAsync(queryString, cb) {
        const restaurants = this.sampname
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
      // handleSampleNumSelect(item) {
      //   console.log('select item:' + JSON.stringify(item))
      //   let sampnum = this.nums.sampno
      //   // this.form.entnum = this.nums.entrustno
      //   // this.form.repnum = this.nums.entrustno
      //   let inputvalue = item.value
      //   if (inputvalue != sampnum) {
      //     if (inputvalue.length > 14) {
      //       this.form.entnum = inputvalue.substring(0, 14)
      //       this.form.repnum = inputvalue.substring(0, 14)
      //     }
      //   }
      // },
      // handleSampleNumChange(item) {
      //   console.log('change item:' + JSON.stringify(item))
      //   let sampnum = this.nums.sampno
      //   // this.form.entnum = this.nums.entrustno
      //   // this.form.repnum = this.nums.entrustno
      //   let inputvalue = item
      //   if (inputvalue != sampnum) {
      //     if (inputvalue.length > 14) {
      //       this.form.entnum = inputvalue.substring(0, 14)
      //       this.form.repnum = inputvalue.substring(0, 14)
      //     }
      //   }
      // },
      async loadHisColunmDatas() {
        this.listLoading = true
        const { data } = await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_CLS).then((response) => {
          this.cls = response.data //掺量
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_SAMPNAMES).then((response) => {
          this.sampname = response.data //样品名称
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_SAMPNUMS).then((response) => {
          this.sampnums = response.data //样品编号
        })
        await hislist(EM307CONSTS.ELMT_TYPE, EM307CONSTS.ELMT_CODE_SENDADDS).then((response) => {
          this.sendadds = response.data //送样地点
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
