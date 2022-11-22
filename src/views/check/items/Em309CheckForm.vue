<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="8" style="background-color: #2b508a; color: #fff">委托项目-砂子物理性能（国标）</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>颗粒级配</el-checkbox></td>
          <td><el-checkbox v-model="checked3" disabled>含泥量</el-checkbox></td>
          <td><el-checkbox v-model="checked4">含泥块量</el-checkbox></td>
          <td colspan="4" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td style="width: 200px">{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td>
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 350px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td style="width: 200px">
            <el-input v-model="form.checktype" placeholder="请输入产地" />
          </td>
          <td class="td_right">沙类别：</td>
          <td>
            <el-select v-model="form.szSort" placeholder="请选择砂类别" style="width: 200px">
              <el-option v-for="item in szSortOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">品种：</td>
          <td colspan="3">
            <el-select v-model="form.szVar" placeholder="请选择品种" style="width: 350px">
              <el-option v-for="item in szVarOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">沙子产地：</td>
          <td style="width: 200px"><el-input v-model="form.chProde" placeholder="请输入产地" /></td>
          <td class="td_right">规格：</td>
          <td>
            <el-select v-model="form.spec" placeholder="请选择规格" style="width: 200px">
              <el-option v-for="item in specOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">代表批量：</td>
          <td colspan="3"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 350px" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td style="width: 250px"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" /></td>
          <td class="td_right">样品数量：</td>
          <td><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">工程编码：</td>
          <td colspan="3"><el-input-number v-model="form.pronum" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="4" style="width: 120px">含泥量</th>
                  <th class="th_center" colspan="4" style="width: 120px">含泥块量</th>
                </tr>
                <tr>
                  <th class="th_center" style="width: 120px">试样编号</th>
                  <th class="th_center" style="width: 120px">试前烘干前质量</th>
                  <th class="th_center" style="width: 120px">试后烘干质量</th>
                  <th class="th_center" style="width: 120px">含泥量</th>
                  <th class="th_center" style="width: 120px">试样编号</th>
                  <th class="th_center" style="width: 120px">118筛筛余的质量</th>
                  <th class="th_center" style="width: 120px">烘干后质量</th>
                  <th class="th_center" style="width: 120px">含泥块量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center" style="width: 120px"><el-link disabled>1</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMud11" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMud21" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMudp1" /></td>
                  <td class="td_center" style="width: 120px"><el-link disabled>1</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPug11" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPug21" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPugp1" /></td>
                </tr>
                <tr>
                  <td class="td_center" style="width: 120px"><el-link disabled>2</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMud12" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMud22" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMudp2" /></td>
                  <td class="td_center" style="width: 120px"><el-link disabled>2</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPug21" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPug22" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPugp2" /></td>
                </tr>
                <tr>
                  <td class="td_center" style="width: 120px"><el-link disabled>平均值</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMudpa" /></td>
                  <td class="td_center" style="width: 120px"><el-link disabled>指标(＞)</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cMudpbzf" /></td>
                  <td class="td_center" style="width: 120px"><el-link disabled>平均值</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPugpa" /></td>
                  <td class="td_center" style="width: 120px"><el-link disabled>指标(＞)</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.cPugpbzf" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <thead>
                <tr>
                  <td class="td_right">筛样质量(g)：</td>
                  <td style="width: 120px">{{ form.syzzl }}</td>
                  <td class="td_right">原沙质量(g)：</td>
                  <td style="width: 120px">{{ form.syyzzl }}</td>
                  <td class="td_right">95筛余量(g)：</td>
                  <td style="width: 120px">{{ form.sysyzl }}</td>
                  <td class="td_right"></td>
                  <td style="width: 200px"></td>
                </tr>
                <tr>
                  <th class="th_center" colspan="8">颗粒级匹配实验</th>
                </tr>
                <tr>
                  <th class="th_center" colspan="8">筛孔余量</th>
                </tr>
                <tr>
                  <th class="th_center" colspan="2" style="width: 120px">试样编号</th>
                  <th class="th_center" style="width: 120px">筛孔1余量</th>
                  <th class="th_center" style="width: 120px">筛孔2余量</th>
                  <th class="th_center" style="width: 120px">筛孔3余量</th>
                  <th class="th_center" style="width: 120px">筛孔4余量</th>
                  <th class="th_center" style="width: 120px">筛孔5余量</th>
                  <th class="th_center" style="width: 120px">筛孔6余量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center" colspan="2" style="width: 120px"><el-link disabled>1</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle11" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle21" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle31" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle41" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle51" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle61" /></td>
                </tr>
                <tr>
                  <td class="td_center" colspan="2" style="width: 120px"><el-link disabled>2</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle12" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle22" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle32" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle42" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle52" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddle62" /></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th class="th_center" colspan="8">筛孔分计筛余</th>
                </tr>
                <tr>
                  <th class="th_center" colspan="2" style="width: 120px">试样编号</th>
                  <th class="th_center" style="width: 120px">筛孔1分计余量</th>
                  <th class="th_center" style="width: 120px">筛孔2分计余量</th>
                  <th class="th_center" style="width: 120px">筛孔3分计余量</th>
                  <th class="th_center" style="width: 120px">筛孔4分计余量</th>
                  <th class="th_center" style="width: 120px">筛孔5分计余量</th>
                  <th class="th_center" style="width: 120px">筛孔6分计余量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center" colspan="2" style="width: 120px"><el-link disabled>1</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef11" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef21" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef31" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef41" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef51" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef61" /></td>
                </tr>
                <tr>
                  <td class="td_center" colspan="2" style="width: 120px"><el-link disabled>2</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef12" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef22" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef32" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef42" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef52" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlef62" /></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th class="th_center" colspan="8">筛孔分计筛余</th>
                </tr>
                <tr>
                  <th class="th_center" colspan="2" style="width: 120px">试样编号</th>
                  <th class="th_center" style="width: 120px">筛孔1累计余量</th>
                  <th class="th_center" style="width: 120px">筛孔2累计余量</th>
                  <th class="th_center" style="width: 120px">筛孔3累计余量</th>
                  <th class="th_center" style="width: 120px">筛孔4累计余量</th>
                  <th class="th_center" style="width: 120px">筛孔5累计余量</th>
                  <th class="th_center" style="width: 120px">筛孔6累计余量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center" colspan="2" style="width: 120px"><el-link disabled>1</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel11" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel21" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel31" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel41" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel51" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel61" /></td>
                </tr>
                <tr>
                  <td class="td_center" colspan="2" style="width: 120px"><el-link disabled>2</el-link></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel12" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel22" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel32" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel42" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel52" /></td>
                  <td class="td_center" style="width: 120px"><el-input v-model="form.griddlel62" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">底盘1：</td>
                <td colspan="3" style="width: 120px"><el-input v-model="form.chassis1" /></td>
                <td class="td_right">底盘2：</td>
                <td colspan="3" style="width: 200px"><el-input v-model="form.chassis2" /></td>
              </tr>
              <tr>
                <td class="td_right">细度模量1：</td>
                <td style="width: 120px"><el-input v-model="form.bittyp1" /></td>
                <td class="td_right">细度模量2：</td>
                <td style="width: 200px"><el-input v-model="form.bittyp2" /></td>
                <td class="td_right">结果细度模量：</td>
                <td colspan="3" style="width: 200px"><el-input v-model="form.bittypa" /></td>
              </tr>
              <tr>
                <td class="td_right">结果级匹配1：</td>
                <td colspan="3" style="width: 120px"><el-input v-model="form.szVerdict1" /></td>
                <td class="td_right">结果级匹配2：</td>
                <td colspan="3" style="width: 120px"><el-input v-model="form.szVerdict2" /></td>
              </tr>
              <tr>
                <td class="td_right">结果级匹区属：</td>
                <td colspan="3" style="width: 120px"><el-input v-model="form.pdsort" /></td>
                <td class="td_right">结果沙规格属：</td>
                <td colspan="3" style="width: 120px"><el-input v-model="form.pdspec" /></td>
              </tr>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="7" style="width: 120px"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="7" style="width: 120px">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="7" style="width: 120px"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="2" style="width: 120px"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right">所用检测设备使用前状态：</td>
                <td colspan="4" style="width: 120px"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="2" style="width: 120px"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right">所用检测设备使用后状态：</td>
                <td colspan="4" style="width: 120px"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td style="width: 120px"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td style="width: 120px"><el-input v-model="form.temperature" /></td>
                <td class="td_right">湿度%：</td>
                <td colspan="3" style="width: 120px"><el-input v-model="form.humidity" /></td>
              </tr>
              <tr>
                <td class="td_right">检测标准：</td>
                <td colspan="7" style="width: 120px"><el-input v-model="form.standname" /></td>
              </tr>
              <tr>
                <td class="td_right">评定标准：</td>
                <td colspan="7" style="width: 120px"><el-input v-model="form.pdstandardname" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td class="td_right">复核人：</td>
          <td style="width: 100px">{{ form.collateman }}</td>
          <td class="td_right">复核日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td style="width: 100px">{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td style="width: 100px">{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td style="width: 100px">{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td style="width: 100px">{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td style="width: 100px">{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td style="width: 100px">{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.printdate" placeholder="选择打印日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td style="width: 100px">{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td style="width: 100px"><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td style="width: 100px">{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td style="width: 100px"><el-date-picker v-model="form.getdate" placeholder="选择收样时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">收样地点：</td>
          <td colspan="3" style="width: 160px"><el-input v-model="form.getadd" /></td>
        </tr>
        <tr>
          <td class="td_right">检测人：</td>
          <td style="width: 100px">{{ form.chkid }}</td>
          <td class="td_right">检测时间：</td>
          <td style="width: 100px"><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测地点：</td>
          <td colspan="3" style="width: 160px"><el-input v-model="form.chkadd" /></td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">取样地点：</td>
          <td style="width: 100px"><el-input v-model="form.recadd" /></td>
          <td class="td_right">供销单位：</td>
          <td style="width: 260px"><el-input v-model="form.bcFuc" /></td>
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
    name: 'Em309CheckForm',
    data() {
      return {
        hjxsOptions: [],
        szSortOptions: [],
        szVarOptions: [],
        specOptions: [],
        sampleStatusOptions: [],
        form: { sampnum: ' ' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '309',
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
        listDictItemByCode('SZ_var').then((response) => {
          this.szVarOptions = response.data
        })
        listDictItemByCode('SPEC').then((response) => {
          this.specOptions = response.data
        })
        listDictItemByCode('sz_sort').then((response) => {
          this.szSortOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'SZIG' }
        getStandardColunmList(libParas).then((response) => {
          const colunmList = response.data
          if (colunmList.length > 0) {
            libParas.cols = colunmList.map((item) => item.datacol).join(',')
            getStandardTableList(libParas).then((response) => {
              this.szsortOptions = response.data
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
      handleSzSortChange: function (item) {
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
