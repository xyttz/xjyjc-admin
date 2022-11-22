<template>
  <div>
    <el-form ref="projectForm" :model="projectForm" :rules="rules" size="small">
      <table style="width: 100%; border-collapse: collapse">
        <tr>
          <td colspan="6" style="background-color: #3e84f1; color: #fff">单位及人员信息</td>
        </tr>
        <tr>
          <td class="td_right">见证人：</td>
          <!-- <td>{{ projectdatta.witName }}</td> -->
          <td>
            <el-autocomplete
              v-model="projectForm.witman"
              :fetch-suggestions="queryMansSearchAsync"
              placeholder="请输入见证人"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">见证人证号：</td>
          <td>
            <el-autocomplete
              v-model="projectForm.witno"
              :fetch-suggestions="queryManIdNosSearchAsync"
              placeholder="请输入见证人证号"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">Name:{{ item.name }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">见证人电话：</td>
          <!-- <td>{{ projectdatta.witmobile }}</td> -->
          <td>
            <el-form-item prop="witphone" style="margin-bottom: 0px">
              <el-autocomplete
                v-model="projectForm.witphone"
                :fetch-suggestions="queryManPhonesSearchAsync"
                placeholder="请输入见证人电话"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">Name:{{ item.name }} No:{{ item.idno }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="td_right">取样人：</td>
          <!-- <td>{{ projectdatta.recName }}</td> -->
          <td>
            <el-autocomplete
              v-model="projectForm.recman"
              :fetch-suggestions="queryMansSearchAsync"
              placeholder="请输入取样人"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">取样人证号：</td>
          <td>
            <el-autocomplete
              v-model="projectForm.recno"
              :fetch-suggestions="queryManIdNosSearchAsync"
              placeholder="请输入取样人证号"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">Name:{{ item.name }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">取样人电话：</td>
          <!-- <td>{{ projectdatta.recmobile }}</td> -->
          <td>
            <el-form-item prop="recphone" style="margin-bottom: 0px">
              <el-autocomplete
                v-model="projectForm.recphone"
                :fetch-suggestions="queryManPhonesSearchAsync"
                placeholder="请输入取样人电话"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">Name:{{ item.name }} No:{{ item.idno }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="td_right">委托单位：</td>
          <td colspan="5">
            <!-- {{ projectdatta.entunit }} -->
            <el-input v-model="projectForm.entunit" style="width: 500px" />
          </td>
        </tr>
        <tr>
          <td class="td_right">工程名称：</td>
          <td colspan="5">
            <!-- {{ projectdatta.proname }} -->
            <el-input v-model="projectForm.proname" style="width: 500px" />
          </td>
        </tr>
        <tr>
          <td class="td_right">见证单位：</td>
          <!-- <td colspan="2">{{ projectdatta.witnessUnitName }}</td> -->
          <td colspan="2">
            <el-autocomplete
              v-model="projectForm.witname"
              :fetch-suggestions="queryCompanysSearchAsync"
              placeholder="请输入见证单位"
              select-when-unmatched
              style="width: 300px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">送样人：</td>
          <!-- <td colspan="2">{{ projectdatta.sendName }}</td> -->
          <td colspan="2">
            <el-autocomplete
              v-model="projectForm.sendman"
              :fetch-suggestions="queryMansSearchAsync"
              placeholder="请输入送样人"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
        </tr>
        <tr>
          <td class="td_right">取样单位：</td>
          <td colspan="2">
            <!-- {{ projectdatta.recname }} -->
            <el-autocomplete
              v-model="projectForm.recname"
              :fetch-suggestions="queryCompanysSearchAsync"
              placeholder="请输入取样单位"
              select-when-unmatched
              style="width: 300px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">送检人电话：</td>
          <!-- <td colspan="2">{{ projectdatta.recmobile }}</td> -->
          <td colspan="2">
            <el-form-item prop="sendphone" style="margin-bottom: 0px">
              <el-autocomplete
                v-model="projectForm.sendphone"
                :fetch-suggestions="queryManPhonesSearchAsync"
                placeholder="请输入送样人"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">Name:{{ item.name }} No:{{ item.idno }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="td_right">施工单位：</td>
          <td colspan="2">
            <!-- {{ projectdatta.construcUnitName }} -->
            <el-autocomplete
              v-model="projectForm.construcUnitName"
              :fetch-suggestions="queryCompanysSearchAsync"
              placeholder="请输入施工单位"
              select-when-unmatched
              style="width: 300px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">质量监督员：</td>
          <!-- <td colspan="2">{{ projectdatta.insName }}</td> -->
          <td colspan="2">
            <el-autocomplete
              v-model="projectForm.inspman"
              :fetch-suggestions="queryMansSearchAsync"
              placeholder="请输入质量监督员"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
        </tr>
        <tr>
          <td class="td_right">监理单位：</td>
          <!-- <td colspan="2">{{ projectdatta.supervisorUnitName }}</td> -->
          <td colspan="2">
            <el-autocomplete
              v-model="projectForm.supername"
              :fetch-suggestions="queryCompanysSearchAsync"
              placeholder="请输入监理单位"
              select-when-unmatched
              style="width: 300px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </td>
          <td class="td_right">工程监理员：</td>
          <!-- <td colspan="2">{{ projectdatta.superName }}</td> -->
          <td colspan="2">
            <el-autocomplete
              v-model="projectForm.superman"
              :fetch-suggestions="queryMansSearchAsync"
              placeholder="请输入工程监理员"
              select-when-unmatched
              style="width: 150px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
        </tr>
        <tr>
          <td class="td_right">建设单位：</td>
          <td colspan="5">
            <!-- {{ projectdatta.buildUnitName }} -->
            <el-autocomplete
              v-model="projectForm.buildUnitName"
              :fetch-suggestions="queryCompanysSearchAsync"
              placeholder="请输入建设单位"
              select-when-unmatched
              style="width: 300px"
              @select="handleSelect"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">No:{{ item.idno }} Phone:{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </td>
        </tr>
        <tr>
          <td class="td_right">施工许可证号：</td>
          <td><el-input v-model="projectForm.consstructionnum" placeholder="检测工程代码" style="width: 200px" /></td>
          <td class="td_right">检测工程代码：</td>
          <td colspan="3"><el-input v-model="projectForm.jcproject" placeholder="检测工程代码" style="width: 200px" /></td>
          <!-- <td class="td_right">工程项目编码：</td>
          <td><el-input v-model="projectForm.pronum" placeholder="工程项目编码" style="width: 150px" /></td> -->
        </tr>
      </table>
    </el-form>
  </div>
</template>

<script>
  import { getMans, getCompanys } from '@/api/entrust/entrust'
  export default {
    name: 'ProjectInfoModel',
    // props: {
    //   projectinfo: Object,
    // },
    data() {
      return {
        projectdatta: {},
        form: {},
        projectForm: {},
        mansNameFirst: [],
        mansIdFirst: [],
        mansPhoneFirst: [],
        companys: [],
        rules: {
          recphone: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
          witphone: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
          sendphone: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
        },
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        const {
          data: { idnos, names, phones },
        } = await getMans()
        this.mansNameFirst = names
        this.mansIdFirst = idnos
        this.mansPhoneFirst = phones
        this.$emit('refMansNameFirst', names)
        this.$emit('refMansIdNoFirst', idnos)
      },
      setProjectData(data) {
        this.projectdatta = data
        this.projectForm = data
        getCompanys(this.projectForm.entunitnum).then((response) => {
          this.companys = response.data
        })
      },
      queryMansSearchAsync(queryString, cb) {
        const restaurants = this.mansNameFirst
        const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryManIdNosSearchAsync(queryString, cb) {
        const restaurants = this.mansIdFirst
        const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryManPhonesSearchAsync(queryString, cb) {
        const restaurants = this.mansPhoneFirst
        const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCompanysSearchAsync(queryString, cb) {
        const restaurants = this.companys
        const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      createStateFilter(queryString) {
        return (state) => state.value.includes(queryString.toLowerCase())
      },
      handleSelect(item) {
        console.log('select item:' + JSON.stringify(item))
      },
    },
  }
</script>
<style scoped>
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
  li {
    line-height: normal;
    padding: 1px;
  }
  .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .addr {
    font-size: 12px;
    color: #b4b4b4;
  }

  .highlighted .addr {
    color: #ddd;
  }
</style>
