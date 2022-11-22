<template>
  <div v-loading="listLoading" class="app-container">
    <table style="width: 100%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-混凝土实心砖</td>
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
        <td>{{ nums.entrustno }}</td>
        <td class="td_right">样品编号：</td>
        <td>{{ nums.sampno }}</td>
        <td class="td_right">报告编号：</td>
        <td colspan="2">{{ nums.entrustno }}</td>
      </tr>
      <tr>
        <td class="td_right">检测子项目：</td>
        <td colspan="6">
          <el-checkbox v-model="form.checkitem1">抗压强度</el-checkbox>
          <el-checkbox v-model="form.checkitem3">外观质量和偏差</el-checkbox>
          <el-checkbox v-model="form.checkitem7">密度</el-checkbox>
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
              <!-- <el-input v-model="form.sampnum" style="width: 200px" /> -->
              <el-autocomplete
                v-model="form.sampnum"
                :fetch-suggestions="querySampnumSearchAsync"
                placeholder="请输入样品编号"
                select-when-unmatched
                style="width: 200px"
                @change="handleSampleNumChange"
                @select="handleSampleNumSelect"
              />
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
              <el-input v-model="form.repcondays" readonly="readonly" style="width: 200px" />
            </el-form-item>
            <el-form-item label="设计强度等级" prop="cgrade">
              <el-select v-model="form.cGrade" placeholder="请选择设计强度等级" style="width: 200px">
                <el-option v-for="item in cGradeOptions" :key="item.name" :label="item.name" :value="item.value" />
              </el-select>
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
            <el-form-item label="公称尺寸" prop="size">
              <el-input v-model="form.size1" style="width: 56px" />
              ×
              <el-input v-model="form.size2" style="width: 56px" />
              ×
              <el-input v-model="form.size3" style="width: 56px" />
            </el-form-item>
            <el-form-item label="密度等级" prop="cdj">
              <el-select v-model="form.cMddj" placeholder="请选择密度等级" style="width: 200px">
                <el-option v-for="item in mdDengjiOptions" :key="item.name" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="费用类别" prop="name">
              <el-input v-model="form.name" placeholder="请输入费用类别" style="width: 200px" />
            </el-form-item> -->
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
                <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="结构部位" prop="structpart">
              <el-autocomplete
                v-model="form.structpart"
                :fetch-suggestions="queryStructpartSearchAsync"
                placeholder="请输入结构部位"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" />
            </el-form-item>
            <el-form-item label="砖品种" prop="cpz">
              <el-select v-model="form.cPz" placeholder="请选择砖品种" style="width: 200px">
                <el-option v-for="item in cPzOptions" :key="item.name" :label="item.name" :value="item.value" />
              </el-select>
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
            <el-form-item label="生产日期" prop="proddate">
              <el-date-picker
                v-model="form.proddate"
                :editable="false"
                :picker-options="pickerOptions"
                placeholder="选择生产日期"
                style="width: 200px"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="代表批量(万)" prop="deputybat">
              <el-input-number v-model="form.deputybat" controls-position="right" :min="1" style="width: 200px" />
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
        <td colspan="8" style="background-color: #d9b7c6; color: #fff">附加信息</td>
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
  import { nextval } from '@/api/system/sequence'
  //  import { getStandardTableList, getStandardColunmList } from '@/api/basic/standard'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM314CONSTS from '@/consts/EM314_CONSTS'
  import VabPrint from '@/extra/VabPrint'

  export default {
    name: 'E314',
    components: {
      ProjectInfo,
      // VueQrcode,
      VueQr,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_hsxz',
        sampleStatusOptions: [],
        cGradeOptions: [],
        mdDengjiOptions: [],
        cPzOptions: [],
        gcIdOptions: [],
        loaded: true,
        listLoading: true,
        projectinfo: {},
        form: {
          id: 0,
          sampnum: '',
          entnum: '',
          repnum: '',
          repcondays: 1,
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
          checkitem2: 'true',
        },
        attchForm: {},
        checkForm: {},
        nums: {},
        pronum: '',
        id: 0,
        rules: {
          entdate: [{ validator: this.validateEntdate, trigger: 'blur' }],
          repcondate: [{ validator: this.validateRepcondate, trigger: 'blur' }],
          repcondays: [{ validator: this.validateRepcondays, trigger: 'blur' }],
          sampnum: [
            { required: true, message: '样品编号必须输入', trigger: 'blur' },
            { validator: this.validateSamnumLength, trigger: 'blur' },
          ],
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
        pihaos: [], //炉、批号
        unitnums: [], //生产厂家
        mansNameFirst: [], //焊工姓名
        mansIdFirst: [], //焊工证号
        standnames: [], //检验标准
        expls: [], //备注
        bkcol1s: [], //母材单号
        bkcol2s: [], //技术等级
        bkcol3s: [], //焊条型号
        recadds: [], //取样地点
        paihaos: [], //牌号
        sampnums: [], //样品编码
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
        console.log('pronum:' + this.pronum + '|id:' + this.id + '| oprtype:' + this.form.oprtype)
        if (this.id) {
          getByEntId(this.id, '314').then((response) => {
            this.form = response.data
            // this.form.checkitem1 = true
            // this.pronum = this.form.pronum
            if ('1000000000000000000000000000000000000000' != this.form.sampphase) {
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
          if (!this.id) {
            console.log('generate nums....')
            nextval('CL_ZZ').then((response) => {
              this.nums = response.data
              this.form.sampnum = this.nums.sampno
              this.form.entnum = this.nums.entrustno
              this.form.repnum = this.nums.entrustno
            })
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
          listDictItemByCode('SAMPLESTATUS').then((response) => {
            this.sampleStatusOptions = response.data
          })
          listDictItemByCode('C_grade').then((response) => {
            this.cGradeOptions = response.data
          })
          listDictItemByCode('C_MDDJ').then((response) => {
            this.mdDengjiOptions = response.data
          })
          listDictItemByCode('C_PZ').then((response) => {
            this.cPzOptions = response.data
          })
          // const libParas = { libnum: 'HSXZ' }
          // getStandardColunmList(libParas).then((response) => {
          //   const colunmList = response.data
          //   if (colunmList.length > 0) {
          //     libParas.cols = colunmList.map((item) => item.datacol).join(',')
          //     getStandardTableList(libParas).then((response) => {
          //       this.gcIdOptions = response.data
          //     })
          //   }
          //   this.loading = false
          // })
          // listDictItemByCode('SAMPLESTATUS').then((response) => {
          //   this.gcIdOptions = response.data
          // })

          this.loaded = false
        } else {
          this.loaded = false
        }
      },
      handleSubmit: function (oprtype) {
        const Loading = this.$baseLoading(5)
        this.form.pronum = this.projectinfo.pronum
        this.$refs.form.validate((formValid) => {
          if (formValid) {
            // this.$refs.attchForm.validate((attchValid) => {
            //   if (attchValid) {
            // console.log(JSON.stringify(this.form) + '|' + JSON.stringify(this.$refs.project.projectForm))
            // Object.assign(this.form, form)
            if (this.id) {
              // 编辑
              // this.form.oprtype = this.$route.query.oprtype
              this.form.oprtype = oprtype
              this.form.project = this.$refs.project.projectForm
              updateEntrust(this.id, this.form, '314').then(
                (res) => {
                  getBySampleKey(this.form.sampnum, '314').then((response) => {
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
              addEntrust(this.form, '314').then(
                (response) => {
                  getBySampleKey(this.form.sampnum, '314').then((response) => {
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
          } else {
            this.$notify.error('输入数据验证失败，请确保必输项已经填写')
            Loading.close()
          }
        })
        //   }
        // })
      },
      handleGcIdChange: function (item) {
        // {"id":324,"shownum":2,"libid":"GHJC_002","libnum":"GHJC","c1":"低碳热轧圆盘条","c2":"Q235","c3":"Ⅰ","c4":"JGJ18-2003","f1":6,"f2":36,"f3":410,"deleted":0}
        // console.log(item.c2)
        // console.log(JSON.stringify(item))
        // this.form.structpart = item.c1
        this.$set(this.form, 'gcpz', item.c1)
        this.$set(this.form, 'paihao', item.c2)
        // this.form.paihao = item.c2
        // this.form.checktype = item.c3
        // this.form.dmin = item.f1
        this.$set(this.form, 'dmin', item.f1)
        this.$set(this.form, 'dmax', item.f2)
        this.$set(this.form, 'standname', item.c4)
        // this.form.dmax = item.f2
        // this.form.standname = item.c4
      },
      handleReset() {
        this.id = undefined
        this.form = {
          id: undefined,
          sampnum: '',
          entnum: '',
          repnum: '',
          repcondays: 1,
          sampmout: 1,
          project: {},
          paihao: '',
          structpart: '',
          checktype: '',
          sampbat: 1,
          oprtype: '',
          sampstatus: '',
          pihao: '',
          unitnum: '',
          gcid: '',
          hjxs: '',
          hgname: '',
          hgno: '',
          expl: '',
          bkcol1: '',
          bkcol2: '',
          bkcol3: '',
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
          // var difday = dateDiff(entdate, repcondate)
          // console.log(difday)
          if (Date.parse(repcondate) >= Date.parse(entdate)) {
            this.form.repcondays = dateDiff(entdate, repcondate)
            return callback()
          } else {
            return callback(new Error('报告承诺日期不得小于委托日期'))
          }
        } else {
          return callback()
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
      queryHgNameSearchAsync(queryString, cb) {
        const restaurants = this.mansNameFirst
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryHgNoSearchAsync(queryString, cb) {
        const restaurants = this.mansIdFirst
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryStandNameSearchAsync(queryString, cb) {
        const restaurants = this.standnames
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
      queryBkcol1SearchAsync(queryString, cb) {
        const restaurants = this.bkcol1s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryBkcol2SearchAsync(queryString, cb) {
        const restaurants = this.bkcol2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryBkcol3SearchAsync(queryString, cb) {
        const restaurants = this.bkcol3s
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
      querySampnumSearchAsync(queryString, cb) {
        const restaurants = this.sampnums
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
        const { data } = await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_PIHAOS).then((response) => {
          this.pihaos = response.data //炉、批号
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_STANDNAMES).then((response) => {
          this.standnames = response.data //检验标准
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_BKCOL1S).then((response) => {
          this.bkcol1s = response.data //母材单号
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_BKCOL2S).then((response) => {
          this.bkcol2s = response.data //技术等级
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_BKCOL3S).then((response) => {
          this.bkcol3s = response.data //焊条型号
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_PAIHAOS).then((response) => {
          this.paihaos = response.data //牌号
        })
        await hislist(EM314CONSTS.ELMT_TYPE, EM314CONSTS.ELMT_CODE_SAMPNUMS).then((response) => {
          this.sampnums = response.data //样品编号
        })
        this.listLoading = false
      },
      buildCurtEntrustProjectInfo(theProjectInfo, theForm) {
        const project = {}
        project.id = theProjectInfo.id
        project.entunitnum = theProjectInfo.entunitnum
        project.pronum = theProjectInfo.pronum
        project.proname = theProjectInfo.proname
        project.prochargtypeName = theProjectInfo.prochargtypeName
        project.sendman = theForm.sendman
        project.sendphone = theForm.sendphone
        project.witname = theForm.witname
        project.supername = theForm.supername
        project.witman = theForm.witman
        project.witno = theForm.witno
        project.witphone = theForm.witphone
        project.recman = theForm.recman
        project.recno = theForm.recno
        project.recphone = theForm.recphone
        project.recname = theForm.recname
        project.construcUnitName = theForm.connum
        project.inspman = theForm.inspname
        project.superman = theForm.superman
        project.buildUnitName = theForm.buildnum
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
