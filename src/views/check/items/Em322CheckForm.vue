<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="12" style="background-color: #2b508a; color: #fff">委托项目-聚合物水泥防水涂料</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>拉伸强度</el-checkbox></td>
          <td><el-checkbox v-model="checked2" disabled>断裂延伸率</el-checkbox></td>
          <td><el-checkbox v-model="checked3" disabled>低温柔性</el-checkbox></td>
          <td><el-checkbox v-model="checked4" disabled>不透水性</el-checkbox></td>
          <td><el-checkbox v-model="checked5" disabled>固体含量</el-checkbox></td>
          <td><el-checkbox v-model="checked7" disabled>潮湿基面粘合强度</el-checkbox></td>
          <td><el-checkbox v-model="checked8" disabled>抗渗性</el-checkbox></td>
          <td colspan="5" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td colspan="3">{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td colspan="3">
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td colspan="3"><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /></td>
          <td class="td_right">样品名称：</td>
          <td colspan="3"><el-input v-model="form.sampname" style="width: 200px" /></td>
          <td class="td_right">规格型号：</td>
          <td colspan="3"><el-input v-model="form.cSt" placeholder="请输入产地" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">类型：</td>
          <td colspan="3">
            <el-select v-model="form.cXh" placeholder="请选择类型" style="width: 200px">
              <el-option v-for="item in cXhOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">商标：</td>
          <td colspan="3"><el-input v-model="form.cSb" placeholder="请输入商标" style="width: 200px" /></td>
          <td class="td_right">批号：</td>
          <td colspan="3"><el-input v-model="form.cPh" placeholder="请输入批号" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">样品数量：</td>
          <td colspan="3"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">代表批量：</td>
          <td colspan="3"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">生产日期：</td>
          <td colspan="3"><el-date-picker v-model="form.proddate" placeholder="选择生产日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td colspan="3"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="12">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="6">拉伸强度</th>
                  <th class="th_center" colspan="6">断裂延伸率</th>
                </tr>
                <tr>
                  <th class="th_center">试样</th>
                  <th class="th_center">1</th>
                  <th class="th_center">2</th>
                  <th class="th_center">3</th>
                  <th class="th_center">4</th>
                  <th class="th_center">5</th>
                  <th class="th_center">试样</th>
                  <th class="th_center">1</th>
                  <th class="th_center">2</th>
                  <th class="th_center">3</th>
                  <th class="th_center">4</th>
                  <th class="th_center">5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>中间宽度(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.kudu1" /></td>
                  <td class="td_center"><el-input v-model="form.kudu2" /></td>
                  <td class="td_center"><el-input v-model="form.kudu3" /></td>
                  <td class="td_center"><el-input v-model="form.kudu4" /></td>
                  <td class="td_center"><el-input v-model="form.kudu5" /></td>
                  <td class="td_center"><el-link disabled>拉伸前标线间距(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.csbj1" /></td>
                  <td class="td_center"><el-input v-model="form.csbj2" /></td>
                  <td class="td_center"><el-input v-model="form.csbj3" /></td>
                  <td class="td_center"><el-input v-model="form.csbj4" /></td>
                  <td class="td_center"><el-input v-model="form.csbj5" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>实测厚度(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.hodu1" /></td>
                  <td class="td_center"><el-input v-model="form.hodu2" /></td>
                  <td class="td_center"><el-input v-model="form.hodu3" /></td>
                  <td class="td_center"><el-input v-model="form.hodu4" /></td>
                  <td class="td_center"><el-input v-model="form.hodu5" /></td>
                  <td class="td_center"><el-link disabled>断裂时标线间距(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.dhbj1" /></td>
                  <td class="td_center"><el-input v-model="form.dhbj2" /></td>
                  <td class="td_center"><el-input v-model="form.dhbj3" /></td>
                  <td class="td_center"><el-input v-model="form.dhbj4" /></td>
                  <td class="td_center"><el-input v-model="form.dhbj5" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>最大荷载(KN)</el-link></td>
                  <td class="td_center"><el-input v-model="form.zdzh1" /></td>
                  <td class="td_center"><el-input v-model="form.zdzh2" /></td>
                  <td class="td_center"><el-input v-model="form.zdzh3" /></td>
                  <td class="td_center"><el-input v-model="form.zdzh4" /></td>
                  <td class="td_center"><el-input v-model="form.zdzh5" /></td>
                  <td class="td_center"><el-link disabled>断裂延伸率(%)</el-link></td>
                  <td class="td_center"><el-input v-model="form.dlys1" /></td>
                  <td class="td_center"><el-input v-model="form.dlys2" /></td>
                  <td class="td_center"><el-input v-model="form.dlys3" /></td>
                  <td class="td_center"><el-input v-model="form.dlys4" /></td>
                  <td class="td_center"><el-input v-model="form.dlys5" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>拉伸强度(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqd1" /></td>
                  <td class="td_center"><el-input v-model="form.lsqd2" /></td>
                  <td class="td_center"><el-input v-model="form.lsqd3" /></td>
                  <td class="td_center"><el-input v-model="form.lsqd4" /></td>
                  <td class="td_center"><el-input v-model="form.lsqd5" /></td>
                  <td class="td_center"><el-link disabled>平均率(%)</el-link></td>
                  <td class="td_center"><el-input v-model="form.dlyspjz" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspjz" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspjz" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspjz" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspjz" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均值(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdpjz" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdpjz" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center"><el-link disabled>≥</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdzb" /></td>
                  <td class="td_center"><el-link disabled>技术指标(%)</el-link></td>
                  <td class="td_center"><el-link disabled>≥</el-link></td>
                  <td class="td_center"><el-input v-model="form.dlyszb" /></td>
                  <td class="td_center"><el-input v-model="form.dlyszb" /></td>
                  <td class="td_center"><el-input v-model="form.dlyszb" /></td>
                  <td class="td_center"><el-input v-model="form.dlyszb" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdpd" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdpd" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdpd" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdpd" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdpd" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.dlyspd" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspd" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspd" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspd" /></td>
                  <td class="td_center"><el-input v-model="form.dlyspd" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="12">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="6">不透水性</th>
                  <th class="th_center" colspan="6">固体含量</th>
                </tr>
                <tr>
                  <th class="th_center">试样</th>
                  <th class="th_center">1</th>
                  <th class="th_center" colspan="2">2</th>
                  <th class="th_center" colspan="2">3</th>
                  <th class="th_center" colspan="2">试样</th>
                  <th class="th_center" colspan="2">1</th>
                  <th class="th_center" colspan="2">2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>压力(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.btsxyl1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsxyl2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsxyl3" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>培养皿质量(g)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.pymzl1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.pymzl2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>保持时间(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.btsxsj1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsxsj2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsxsj3" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>干燥前培养皿和样品质量(g)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.qyppymzl1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.qyppymzl2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>有无透水</el-link></td>
                  <td class="td_center"><el-input v-model="form.btsx1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsx2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsx3" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>干燥后培养皿和样品质量(g)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hyppymzl1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hyppymzl2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center"><el-input v-model="form.btsx" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsx" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.btsx" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>固体含量(%)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.gthl1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.gthl2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.btsxzb" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center"><el-link disabled>≥</el-link></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.gthlzb" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.btsxpd" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.gthlpd" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="12">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="6">低温柔性</th>
                  <th class="th_center" colspan="6">干燥时间</th>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>温度(℃)</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.rdwd" /></td>
                  <td class="td_center"><el-link disabled>涂刷时刻</el-link></td>
                  <td class="td_center"><el-input v-model="form.tmtqtime" /></td>
                  <td class="td_center"><el-link disabled>不粘手时刻</el-link></td>
                  <td class="td_center"><el-input v-model="form.tmnstime" /></td>
                  <td class="td_center"><el-link disabled>无粘着时刻</el-link></td>
                  <td class="td_center"><el-input v-model="form.tmzztime" /></td>
                </tr>
                <tr>
                  <th class="th_center">试样</th>
                  <th class="th_center" colspan="2">1</th>
                  <th class="th_center" colspan="2">2</th>
                  <th class="th_center" colspan="2">3</th>
                  <th class="th_center" colspan="2">涂膜表干时间(h))</th>
                  <th class="th_center" colspan="2">技术指标</th>
                  <th class="th_center" colspan="2">单项评定</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>有无裂纹</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.rdxx1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.rdxx2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.rdxx3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.tmbg" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.tmbgsjzb" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.tmbgsjpd" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.rdxx" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>涂膜实干时间(h))</el-link></td>
                  <td class="td_center" colspan="2"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center" colspan="2"><el-link disabled>单项评定</el-link></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.rdxxzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.rdxxpd" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.tmsg" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.tmsgsjzb" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.tmsgsjpd" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="12">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="6">潮湿基面粘合强度</th>
                  <th class="th_center" colspan="6">抗渗性</th>
                </tr>
                <tr>
                  <th class="th_center">试样</th>
                  <th class="th_center">1</th>
                  <th class="th_center">2</th>
                  <th class="th_center">3</th>
                  <th class="th_center">4</th>
                  <th class="th_center">5</th>
                  <th class="th_center" colspan="2">试样</th>
                  <th class="th_center">1</th>
                  <th class="th_center">2</th>
                  <th class="th_center" colspan="2">3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>截面长度（mm）</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqdc1" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdc2" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdc3" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdc4" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdc5" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>压力(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.ksxyl1" /></td>
                  <td class="td_center"><el-input v-model="form.ksxyl2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.ksxyl3" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>截面宽度（mm）</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqdk1" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdk2" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdk3" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdk4" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdk5" /></td>
                  <td class="td_center" colspan="2"><el-link disabled>有无透水</el-link></td>
                  <td class="td_center"><el-input v-model="form.ksx1" /></td>
                  <td class="td_center"><el-input v-model="form.ksx2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.ksx3" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>最大荷载（KN）</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqdhz1" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdhz2" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdhz3" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdhz4" /></td>
                  <td class="td_center"><el-input v-model="form.zzqdhz5" /></td>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.ksx" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>单个强度</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqd1" /></td>
                  <td class="td_center"><el-input v-model="form.zzqd2" /></td>
                  <td class="td_center"><el-input v-model="form.zzqd3" /></td>
                  <td class="td_center"><el-input v-model="form.zzqd4" /></td>
                  <td class="td_center"><el-input v-model="form.zzqd5" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.ksxzb" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqdavg" /></td>
                  <td class="td_center"><el-link disabled>技术指标≥</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqdzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.zzqdpd" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.ksxpd" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="12"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="12">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="12"><el-input v-model="form.expl" /></td>
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
                <td colspan="3"><el-input v-model="form.temperature" /></td>
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
          <td colspan="12" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td class="td_right">复核人：</td>
          <td colspan="2">{{ form.collateman }}</td>
          <td class="td_right">复核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td colspan="2">{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td colspan="2">{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td colspan="2">{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td colspan="2">{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td colspan="2">{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td colspan="2"><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td colspan="2">{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td colspan="2"><el-date-picker v-model="form.printdate" placeholder="选择打印日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td colspan="2">{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td colspan="2"><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td colspan="3">{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td colspan="3"><el-date-picker v-model="form.getdate" placeholder="选择收样时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">收样地点：</td>
          <td colspan="3"><el-input v-model="form.getadd" /></td>
        </tr>
        <tr>
          <td class="td_right">检测人：</td>
          <td colspan="3">{{ form.chkid }}</td>
          <td class="td_right">检测时间：</td>
          <td colspan="3"><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测地点：</td>
          <td colspan="3"><el-input v-model="form.chkadd" /></td>
        </tr>
        <tr>
          <td colspan="12" style="text-align: right">
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
    name: 'Em322CheckForm',
    data() {
      return {
        cXhOptions: [],
        gcIdOptions: [],
        sampleStatusOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '322',
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
        listDictItemByCode('C_xh').then((response) => {
          this.cXhOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'PMCW' }
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
