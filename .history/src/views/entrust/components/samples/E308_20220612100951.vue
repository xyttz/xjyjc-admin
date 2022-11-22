<template>
  <div v-loading="listLoading" class="app-container">
    <table style="width: 90%; border-collapse: collapse">
      <tr>
        <td colspan="8" style="background-color: #5e5c5f; color: #fff">基础信息-砂浆配合比</td>
      </tr>
      <tr>
        <td class="td_right">当前工程编码：</td>
        <td>{{ projectinfo.pronum }}</td>
        <td class="td_right">当前工程名称：</td>
        <td colspan="4">
          {{ projectinfo.proname }}
        </td>
        <td rowspan="5" style="width: 200px">
          <div v-show="showQrCdoe" @click="openPrintDialag">
            <vue-qr ref="vab-print-qrimage" color-dark="#1e1921" color-light="#fff" :logo-scale="0.2" :logo-src="logoSrc" :margin="(0, 0, 0, 0)" :size="200" :text="qrvalue" />
          </div>
        </td>
      </tr>
      <tr>
        <td class="td_right">缴费方式：</td>
        <td>{{ projectinfo.prochargtypeName }}</td>
        <td class="td_right">委托单位：</td>
        <td colspan="4">
          {{ projectinfo.entunit }}
        </td>
      </tr>
      <tr>
        <td class="td_right">合同编号：</td>
        <td></td>
        <td class="td_right">监督备案号：</td>
        <td colspan="4"></td>
      </tr>
      <tr>
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
          <el-checkbox v-model="form.checkitem1">配合比</el-checkbox>
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
                style="width: 150px"
                @change="handleSampleNumChange"
                @select="handleSampleNumSelect"
              />
            </el-form-item>
            <el-form-item label="委托编号" prop="entnum">
              <el-input v-model="form.entnum" readonly="readonly" style="width: 150px" />
            </el-form-item>
            <el-form-item label="报告编号" prop="repnum">
              <el-input v-model="form.repnum" readonly="readonly" style="width: 150px" />
            </el-form-item>
            <el-form-item label="检验类别" prop="checktype">
              <el-autocomplete
                v-model="form.checktype"
                :fetch-suggestions="queryCheckTypeSearchAsync"
                placeholder="请输入送检类别"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="搅拌方式" prop="jbfh">
              <el-autocomplete
                v-model="form.jbfh"
                :fetch-suggestions="queryJbfsSearchAsync"
                placeholder="请输入搅拌方式"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="委托日期" prop="entdate">
              <el-date-picker v-model="form.entdate" :editable="false" placeholder="选择委托日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="报告承诺天数" prop="repcondays">
              <el-input v-model="form.repcondays" style="width: 150px" />
            </el-form-item>
            <el-form-item label="报告承诺日期" prop="repcondate">
              <el-date-picker v-model="form.repcondate" :editable="false" placeholder="选择报告承诺日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="结构部位" prop="structpart">
              <el-autocomplete
                v-model="form.structpart"
                :fetch-suggestions="queryStructpartSearchAsync"
                placeholder="请输入结构部位"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="K值" prop="kz">
              <el-autocomplete
                v-model="form.kz"
                :fetch-suggestions="queryKzSearchAsync"
                placeholder="请输入K值"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="粘结强度" prop="njqd">
              <el-autocomplete
                v-model="form.njqd"
                :fetch-suggestions="queryNjqdSearchAsync"
                placeholder="请输入粘结强度"
                select-when-unmatched
                style="width: 110px"
                @select="handleSelect"
              />
              (MPa)
            </el-form-item>
            <el-form-item label="样品状态" prop="sampstatus">
              <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 150px">
                <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="代表批量" prop="deputybat">
              <el-input-number v-model="form.deputybat" controls-position="right" :min="1" style="width: 150px" />
            </el-form-item>
            <el-form-item label="砂浆品种" prop="sjpz">
              <el-autocomplete
                v-model="form.sjpz"
                :fetch-suggestions="querySjpzSearchAsync"
                placeholder="请输砂浆品种"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="强度等级" prop="cDj">
              <el-autocomplete
                v-model="form.cDj"
                :fetch-suggestions="queryCdjSearchAsync"
                placeholder="请输入强度等级"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="标准差" prop="cBzc">
              <el-input v-model="form.cBzc" style="width: 150px" />
              <!-- <el-autocomplete
                v-model="form.cBzc"
                :fetch-suggestions="queryCbzcSearchAsync"
                placeholder="请输入标准差"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
            </el-form-item>
            <el-form-item label="配置强度" prop="cPqd">
              <el-input v-model="form.cPqd" style="width: 150px" />
              <!-- <el-autocomplete
                v-model="form.phb"
                :fetch-suggestions="queryCpqdSearchAsync"
                placeholder="请输入配置强度"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              /> -->
            </el-form-item>
            <el-form-item label="成型方法" prop="cxff">
              <el-autocomplete
                v-model="form.cxff"
                :fetch-suggestions="queryCxffSearchAsync"
                placeholder="请输入成型方法"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="稠度" prop="cdzb">
              <el-input v-model="form.cdzb" style="width: 110px" />
              (mm)
            </el-form-item>
            <el-form-item label="保水率" prop="fcd">
              <el-input v-model="form.fcd" style="width: 130px" />
              (%)
            </el-form-item>
            <el-form-item label="水灰比" prop="shb">
              <el-input v-model="form.shb" style="width: 150px" />
            </el-form-item>
            <el-form-item label="养护条件" prop="yhbz">
              <el-autocomplete
                v-model="form.yhbz"
                :fetch-suggestions="queryYhbzSearchAsync"
                placeholder="请输入养护条件"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="生产厂家" prop="unitnum">
              <el-autocomplete
                v-model="form.unitnum"
                :fetch-suggestions="queryUnitnumSearchAsync"
                placeholder="请输入生产厂家"
                select-when-unmatched
                style="width: 460px"
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
            <el-form-item label="抗渗性能" prop="ksxn">
              <el-autocomplete
                v-model="form.ksxn"
                :fetch-suggestions="queryKsxnSearchAsync"
                placeholder="请输入抗渗性能"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="样品数量" prop="sampmout">
              <el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 150px" />
            </el-form-item>
            <el-form-item label="检测标准" prop="standname">
              <el-autocomplete
                v-model="form.standname"
                :fetch-suggestions="queryStandnameSearchAsync"
                placeholder="请输入检测标准"
                select-when-unmatched
                style="width: 150px"
                @select="handleSelect"
              />
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td colspan="8">原材料信息</td>
      </tr>
      <tr>
        <td colspan="8">
          <table width="100%">
            <tr>
              <td colspan="3" style="text-align: center">原材料数据信息</td>
              <td colspan="4" style="text-align: center">调用常用配合比设计数据</td>
              <td style="width: 90px; text-align: right" width="111">样品编号</td>
              <td><el-input v-model="form.name" /></td>
            </tr>
            <tr>
              <td height="55" rowspan="3">水泥</td>
              <td style="width: 100px; text-align: right">样品编号</td>
              <td>
                <el-autocomplete
                  v-model="form.cCno"
                  :fetch-suggestions="queryCcnoSearchAsync"
                  placeholder="请输入样品编号"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="width: 100px; text-align: right">品种代号</td>
              <td>
                <el-autocomplete
                  v-model="form.cVty"
                  :fetch-suggestions="queryCvtySearchAsync"
                  placeholder="请输入品种代号"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="width: 100px; text-align: right">强度等级</td>
              <td colspan="3">
                <el-autocomplete
                  v-model="form.cCdj"
                  :fetch-suggestions="queryCcdjSearchAsync"
                  placeholder="请输入强度等级"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">安定性</td>
              <td>
                <el-autocomplete
                  v-model="form.cSaftes"
                  :fetch-suggestions="queryCsaftesSearchAsync"
                  placeholder="请输入安定性"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">生产厂名</td>
              <td>
                <el-autocomplete
                  v-model="form.cProde"
                  :fetch-suggestions="queryCprodeSearchAsync"
                  placeholder="请输入生产厂名"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">生产日期</td>
              <td colspan="3">
                <el-date-picker v-model="form.cProddate" :editable="false" placeholder="选择生产日期" style="width: 100px" type="date" value-format="yyyy-MM-dd" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">抗折强度(3d/7d)</td>
              <td>
                <el-input v-model="form.cCzpt" style="width: 130px" />
              </td>
              <td style="text-align: right">抗折强度(28d)</td>
              <td>
                <el-input v-model="form.cCzpte" style="width: 130px" />
              </td>
              <td style="text-align: right">抗压强度(3d/7d)</td>
              <td>
                <el-input v-model="form.cCmpt" style="width: 130px" />
              </td>
              <td style="text-align: right">抗压强度(28d)</td>
              <td>
                <el-input v-model="form.cCmpte" style="width: 130px" />
              </td>
            </tr>
            <tr>
              <td rowspan="3">骨料(1)</td>
              <td style="text-align: right">样品编号</td>
              <td>
                <el-autocomplete
                  v-model="form.szNum"
                  :fetch-suggestions="querySzNumSearchAsync"
                  placeholder="请输入样品编号"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">品种</td>
              <td>
                <el-autocomplete
                  v-model="form.szSva"
                  :fetch-suggestions="querySzSvaSearchAsync"
                  placeholder="请输入品种"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">规格</td>
              <td colspan="3">
                <el-autocomplete v-model="form.szSpec" :fetch-suggestions="querySzSpecSearchAsync" placeholder="请输入规格" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">产地</td>
              <td>
                <el-autocomplete
                  v-model="form.szProde"
                  :fetch-suggestions="querySzProdeSearchAsync"
                  placeholder="请输入产地"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">级配区</td>
              <td>
                <el-autocomplete
                  v-model="form.szRid"
                  :fetch-suggestions="querySzRidSearchAsync"
                  placeholder="请输入级配区"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">细度模数</td>
              <td>
                <el-input v-model="form.szMod" style="width: 130px" />
              </td>
              <td style="text-align: right">空隙率(%)</td>
              <td><el-input v-model="form.szScgmass" /></td>
            </tr>
            <tr>
              <td style="text-align: right">含泥量(%)</td>
              <td>
                <el-input v-model="form.szNsd" style="width: 130px" />
              </td>
              <td style="text-align: right">表观密度(kg/m³)</td>
              <td>
                <el-input v-model="form.szSty" style="width: 130px" />
              </td>
              <td style="text-align: right">堆积密度(kg/m³)</td>
              <td colspan="3">
                <el-input v-model="form.szSdi" />
              </td>
            </tr>
            <tr>
              <td rowspan="3">骨料(2)</td>
              <td style="text-align: right">样品编号</td>
              <td>
                <el-autocomplete
                  v-model="form.szNum2"
                  :fetch-suggestions="querySzNum2SearchAsync"
                  placeholder="请输入样品编号"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">品种</td>
              <td>
                <el-autocomplete
                  v-model="form.szSva2"
                  :fetch-suggestions="querySzSva2SearchAsync"
                  placeholder="请输入品种"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">规格</td>
              <td colspan="3">
                <el-autocomplete v-model="form.szSpec2" :fetch-suggestions="querySzSpec2SearchAsync" placeholder="请输入规格" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">产地</td>
              <td>
                <el-autocomplete
                  v-model="form.szProde2"
                  :fetch-suggestions="querySzProde2SearchAsync"
                  placeholder="请输入产地"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">级配区</td>
              <td>
                <el-autocomplete
                  v-model="form.szRid2"
                  :fetch-suggestions="querySzRid2SearchAsync"
                  placeholder="请输入级配区"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">细度模数</td>
              <td>
                <el-input v-model="form.szMod2" style="width: 130px" />
              </td>
              <td style="text-align: right">空隙率(%)</td>
              <td><el-input v-model="form.szScgmass2" /></td>
            </tr>
            <tr>
              <td style="text-align: right">含泥量(%)</td>
              <td>
                <el-input v-model="form.szNsd2" style="width: 130px" />
              </td>
              <td style="text-align: right">表观密度(kg/m³)</td>
              <td>
                <el-input v-model="form.szSty2" style="width: 130px" />
              </td>
              <td style="text-align: right">堆积密度(kg/m³)</td>
              <td colspan="3">
                <el-input v-model="form.szSdi2" />
              </td>
            </tr>
            <tr>
              <td rowspan="2">石灰膏</td>
              <td style="text-align: right">品名</td>
              <td>
                <el-autocomplete
                  v-model="form.mtPz"
                  :fetch-suggestions="queryMtPzSearchAsync"
                  placeholder="请输入品名"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">掺量</td>
              <td>
                <el-input v-model="form.mtQdp" style="width: 130px" />
              </td>
              <td style="text-align: right">用量</td>
              <td colspan="3">
                <el-input v-model="form.chYl" style="width: 130px" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">稠度</td>
              <td>
                <el-input v-model="form.chCd" style="width: 130px" />
              </td>
              <td style="text-align: right">产地</td>
              <td colspan="5">
                <el-autocomplete v-model="form.mtProde" :fetch-suggestions="queryMtProdeSearchAsync" placeholder="请输入产地" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
            <tr>
              <td rowspan="2">掺加料</td>
              <td style="text-align: right">品种</td>
              <td>
                <el-autocomplete
                  v-model="form.chPinz"
                  :fetch-suggestions="queryChPinzSearchAsync"
                  placeholder="请输入品种"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">等级</td>
              <td>
                <el-autocomplete
                  v-model="form.mtDj"
                  :fetch-suggestions="queryMtDjSearchAsync"
                  placeholder="请输入等级"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">接入方式</td>
              <td colspan="3">
                <el-autocomplete v-model="form.mtSyfh" :fetch-suggestions="queryMtSyfhSearchAsync" placeholder="请输入接入方式" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">取代率(%)</td>
              <td>
                <el-input v-model="form.chCdb" style="width: 130px" />
              </td>
              <td style="text-align: right">掺量</td>
              <td>
                <el-input v-model="form.chCl" style="width: 130px" />
              </td>
              <td style="text-align: right">生产厂家</td>
              <td colspan="3">
                <el-autocomplete v-model="form.chProde" :fetch-suggestions="queryChProdeSearchAsync" placeholder="请输入生产厂家" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
            <tr>
              <td rowspan="2">外加剂</td>
              <td style="text-align: right">样品编号</td>
              <td>
                <el-autocomplete
                  v-model="form.wjNo"
                  :fetch-suggestions="queryWjNoSearchAsync"
                  placeholder="请输入样品编号"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">品种</td>
              <td>
                <el-autocomplete
                  v-model="form.wjPz"
                  :fetch-suggestions="queryWjPzSearchAsync"
                  placeholder="请输入品种"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">品名</td>
              <td>
                <el-autocomplete
                  v-model="form.wjPm"
                  :fetch-suggestions="queryWjPmSearchAsync"
                  placeholder="请输入品名"
                  select-when-unmatched
                  style="width: 130px"
                  @select="handleSelect"
                />
              </td>
              <td style="text-align: right">掺量(%)</td>
              <td><el-input v-model="form.wjCl" /></td>
            </tr>
            <tr>
              <td style="text-align: right">用量</td>
              <td>
                <el-input v-model="form.wjYl" style="width: 130px" />
              </td>
              <td style="text-align: right">容量</td>
              <td>
                <el-input v-model="form.wjJsl" style="width: 130px" />
              </td>
              <td style="text-align: right">生产厂家</td>
              <td colspan="3">
                <el-autocomplete v-model="form.wjProde" :fetch-suggestions="queryWjProdeSearchAsync" placeholder="请输入生产厂家" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right">水源</td>
              <td colspan="8">
                <el-autocomplete v-model="form.mtWater" :fetch-suggestions="queryMtWaterSearchAsync" placeholder="请输入水源" select-when-unmatched @select="handleSelect" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td colspan="8">附加信息</td>
      </tr>
      <tr>
        <td colspan="8">
          <el-form ref="attchForm" :inline="true" label-width="150px" :model="attchForm" size="small">
            <el-form-item label="水泥出厂编号" prop="outnub">
              <el-autocomplete
                v-model="form.outnub"
                :fetch-suggestions="queryOutnubSearchAsync"
                placeholder="请输入水泥出厂编号"
                select-when-unmatched
                style="width: 200px"
                @select="handleSelect"
              />
            </el-form-item>
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
  // import { getByEntId } from '@/api/entrust/entrust'
  import { listDictItemByCode } from '@/api/system/dict-item'
  import { nextval } from '@/api/system/sequence'
  import VueQr from 'vue-qr'
  import { dateDiff } from '@/utils/index'
  import { hislist } from '@/api/entrust/hisformrecords'
  import * as EM308CONSTS from '@/consts/EM308_CONSTS'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'E308',
    components: {
      ProjectInfo,
      // VueQrcode,
      VueQr,
    },
    // props: ['checknum', 'pronum'],
    data() {
      return {
        table: 'xz_ent_ston',
        pathType: '308',
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
          sampmout: 1,
          sampphase: '',
          project: {},
          paihao: '',
          structpart: '',
          checktype: '',
          deputybat: 1,
          oprtype: '',
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
        structparts: [], //结构部位
        checktypes: [], //检验类别
        unitnums: [], //生产厂家
        expls: [], //备注
        jbfss: [], // 搅拌方式
        kzs: [], // K值
        njqds: [], // 粘结强度
        sjpzs: [], // 砂浆品种
        cxffs: [], // 成型方法
        yhbzs: [], // 养护条件
        ksxns: [], // 抗渗性能
        standnames: [], // 检测标准
        cDjs: [], // 强度等级
        // cBzcs: [], // 标准差
        cCnos: [], // 水泥样品编号
        cVtys: [], // 水泥品种代号
        cCdjs: [], // 水泥强度等级
        // cPqds: [], // 配置强度
        cProdes: [], // 水泥生产厂名
        cSaftess: [], // 水泥安定性
        szNums: [], // 骨料样品编号
        szSvas: [], // 骨料品种
        szSpecs: [], // 骨料规格
        szProdes: [], // 骨料产地
        szRids: [], // 骨料级配区
        szNum2s: [], // 骨料样品编号2
        szSva2s: [], // 骨料品种2
        szSpec2s: [], // 骨料规格2
        szProde2s: [], // 骨料产地2
        szRid2s: [], // 骨料级配区2
        mtPzs: [], // 石灰膏品名
        mtProdes: [], // 石灰膏产地
        chPinzs: [], // 掺加料品种
        mtDjs: [], // 掺加料等级
        mtSyfhs: [], // 掺加料掺入方式
        chProdes: [], // 掺加料生产厂家
        wjNos: [], // 外加剂样品编号
        wjPzs: [], // 外加剂品种
        wjPms: [], // 外加剂品名
        wjProdes: [], // 生产厂家
        mtWaters: [], // 水源
        outnubs: [], // 水泥出厂编号
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
        this.pronum = this.$route.query.pronum
        this.id = this.$route.query.id
        console.log('pronum:' + this.pronum + '|id:' + this.id + '| oprtype:' + this.form.oprtype)
        if (this.id) {
          getByEntId(this.id, this.pathType).then((response) => {
            this.form = response.data
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
            nextval('CL_SP').then((response) => {
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
              // this.form.oprtype = this.$route.query.oprtype
              this.form.oprtype = oprtype
              this.form.project = this.$refs.project.projectForm
              updateEntrust(this.id, this.form, this.pathType).then(
                (res) => {
                  getBySampleKey(this.form.sampnum, this.pathType).then((response) => {
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
                  getBySampleKey(this.form.sampnum, this.pathType).then((response) => {
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
      queryJbfsSearchAsync(queryString, cb) {
        //搅拌方式
        const restaurants = this.jbfss
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryKzSearchAsync(queryString, cb) {
        //K值
        const restaurants = this.kzs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryNjqdSearchAsync(queryString, cb) {
        //粘结强度
        const restaurants = this.njqds
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySjpzSearchAsync(queryString, cb) {
        //砂浆品种
        const restaurants = this.sjpzs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCxffSearchAsync(queryString, cb) {
        //成型方法
        const restaurants = this.cxffs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryYhbzSearchAsync(queryString, cb) {
        //养护条件
        const restaurants = this.yhbzs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryKsxnSearchAsync(queryString, cb) {
        //抗渗性能
        const restaurants = this.ksxns
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryStandnameSearchAsync(queryString, cb) {
        //检测标准
        const restaurants = this.standnames
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCdjSearchAsync(queryString, cb) {
        //强度等级
        const restaurants = this.cDjs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // queryCbzcSearchAsync(queryString, cb) {
      //   //标准差
      //   const restaurants = this.cBzcs
      //   const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
      //   clearTimeout(this.timeout)
      //   this.timeout = setTimeout(() => {
      //     cb(results)
      //   }, 500)
      // },
      queryCcnoSearchAsync(queryString, cb) {
        //水泥样品编号
        const restaurants = this.cCnos
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCvtySearchAsync(queryString, cb) {
        //水泥品种代号
        const restaurants = this.cVtys
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCcdjSearchAsync(queryString, cb) {
        //水泥强度等级
        const restaurants = this.cCdjs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      // queryCpqdSearchAsync(queryString, cb) {
      //   //配置强度
      //   const restaurants = this.cPqds
      //   const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
      //   clearTimeout(this.timeout)
      //   this.timeout = setTimeout(() => {
      //     cb(results)
      //   }, 500)
      // },
      queryCprodeSearchAsync(queryString, cb) {
        //水泥生产厂名
        const restaurants = this.cProdes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryCsaftesSearchAsync(queryString, cb) {
        //水泥安定性
        const restaurants = this.cSaftess
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzNumSearchAsync(queryString, cb) {
        //骨料样品编号
        const restaurants = this.szNums
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzNum2SearchAsync(queryString, cb) {
        //骨料样品编号
        const restaurants = this.szNum2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzSvaSearchAsync(queryString, cb) {
        //骨料品种
        const restaurants = this.szSvas
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzSva2SearchAsync(queryString, cb) {
        //骨料品种
        const restaurants = this.szSva2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzSpecSearchAsync(queryString, cb) {
        //骨料规格
        const restaurants = this.szSpecs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzSpec2SearchAsync(queryString, cb) {
        //骨料规格
        const restaurants = this.szSpec2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzProdeSearchAsync(queryString, cb) {
        //骨料产地
        const restaurants = this.szProdes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzProde2SearchAsync(queryString, cb) {
        //骨料产地
        const restaurants = this.szProde2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzRidSearchAsync(queryString, cb) {
        //骨料级配区
        const restaurants = this.szRids
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      querySzRid2SearchAsync(queryString, cb) {
        //骨料级配区
        const restaurants = this.szRid2s
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryMtPzSearchAsync(queryString, cb) {
        //石灰膏品名
        const restaurants = this.mtPzs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryMtProdeSearchAsync(queryString, cb) {
        //石灰膏产地
        const restaurants = this.mtProdes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryChPinzSearchAsync(queryString, cb) {
        //掺加料品种
        const restaurants = this.chPinzs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryMtDjSearchAsync(queryString, cb) {
        //掺加料等级
        const restaurants = this.mtDjs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryMtSyfhSearchAsync(queryString, cb) {
        //掺加料掺入方式
        const restaurants = this.mtSyfhs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryChProdeSearchAsync(queryString, cb) {
        //掺加料生产厂家
        const restaurants = this.chProdes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryWjNoSearchAsync(queryString, cb) {
        //外加剂样品编号
        const restaurants = this.wjNos
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryWjPzSearchAsync(queryString, cb) {
        //外加剂品种
        const restaurants = this.wjPzs
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryWjPmSearchAsync(queryString, cb) {
        //外加剂品名
        const restaurants = this.wjPms
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryWjProdeSearchAsync(queryString, cb) {
        //生产厂家
        const restaurants = this.wjProdes
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryMtWaterSearchAsync(queryString, cb) {
        //水源
        const restaurants = this.mtWaters
        const results = queryString ? restaurants.filter(this.createStateFilterParent(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500)
      },
      queryOutnubSearchAsync(queryString, cb) {
        //水泥出厂编号
        const restaurants = this.outnubs
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
        const { data } = await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_STRUCTPARTS)
        this.structparts = data //结构部位
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CHECKTYPES).then((response) => {
          this.checktypes = response.data //检验类别
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_UNITNUMS).then((response) => {
          this.unitnums = response.data //生产厂家
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_RECADDS).then((response) => {
          this.recadds = response.data //取样地点
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_EXPLS).then((response) => {
          this.expls = response.data //备注
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SAMPNUMS).then((response) => {
          this.sampnums = response.data //样品编号
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_JBFSS).then((response) => {
          this.jbfss = response.data //搅拌方式
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_KZS).then((response) => {
          this.kzs = response.data //K值
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_NJQDS).then((response) => {
          this.njqds = response.data //粘结强度
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SJPZS).then((response) => {
          this.sjpzs = response.data //砂浆品种
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CXFFS).then((response) => {
          this.cxffs = response.data //成型方法
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_YHBZS).then((response) => {
          this.yhbzs = response.data //养护条件
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_KSXNS).then((response) => {
          this.ksxns = response.data //抗渗性能
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_STANDNAMES).then((response) => {
          this.standnames = response.data //检测标准
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CDJS).then((response) => {
          this.cDjs = response.data //强度等级
        })
        // await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CBZCS).then((response) => {
        //   this.cBzcs = response.data //标准差
        // })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CCNOS).then((response) => {
          this.cCnos = response.data //水泥样品编号
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CVTYS).then((response) => {
          this.cVtys = response.data //水泥品种代号
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CCDJS).then((response) => {
          this.cCdjs = response.data //水泥强度等级
        })
        // await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CPQDS).then((response) => {
        //   this.cPqds = response.data //配置强度
        // })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CPRODES).then((response) => {
          this.cProdes = response.data //水泥生产厂名
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CSAFTESS).then((response) => {
          this.cSaftess = response.data //水泥安定性
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZNUMS).then((response) => {
          this.szNums = response.data //骨料样品编号
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZNUM2S).then((response) => {
          this.szNum2s = response.data //骨料样品编号2
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZSVAS).then((response) => {
          this.szSvas = response.data //骨料品种
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZSVA2S).then((response) => {
          this.szSva2s = response.data //骨料品种
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZSPECS).then((response) => {
          this.szSpecs = response.data //骨料规格
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZSPEC2S).then((response) => {
          this.szSpec2s = response.data //骨料规格
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZPRODES).then((response) => {
          this.szProdes = response.data //骨料产地
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZPRODE2S).then((response) => {
          this.szProde2s = response.data //骨料产地
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZRIDS).then((response) => {
          this.szRids = response.data //骨料级配区
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_SZRID2S).then((response) => {
          this.szRid2s = response.data //骨料级配区
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_MTPZS).then((response) => {
          this.mtPzs = response.data //石灰膏品名
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_MTPRODES).then((response) => {
          this.mtProdes = response.data //石灰膏产地
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CHPINZS).then((response) => {
          this.chPinzs = response.data //掺加料品种
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_MTDJS).then((response) => {
          this.mtDjs = response.data //掺加料等级
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_MTSYFHS).then((response) => {
          this.mtSyfhs = response.data //掺加料掺入方式
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_CHPRODES).then((response) => {
          this.chProdes = response.data //掺加料生产厂家
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_WJNOS).then((response) => {
          this.wjNos = response.data //外加剂样品编号
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_WJPZS).then((response) => {
          this.wjPzs = response.data //外加剂品种
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_WJPMS).then((response) => {
          this.wjPms = response.data //外加剂品名
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_WJPRODES).then((response) => {
          this.wjProdes = response.data //生产厂家
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_MTWATERS).then((response) => {
          this.mtWaters = response.data //水源
        })
        await hislist(EM308CONSTS.ELMT_TYPE, EM308CONSTS.ELMT_CODE_OUTNUBS).then((response) => {
          this.outnubs = response.data //水泥出厂编号
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
