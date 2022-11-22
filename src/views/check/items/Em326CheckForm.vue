<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="12" style="background-color: #2b508a; color: #fff">委托项目-预铺防水卷材</td>
        </tr>
        <tr>
          <!-- <td><el-checkbox v-model="checked1" disabled>拉伸强度</el-checkbox></td>
          <td><el-checkbox v-model="checked2" disabled>拉力</el-checkbox></td>
          <td><el-checkbox v-model="checked3" disabled>不透水性</el-checkbox></td> -->
          <td><el-checkbox v-model="checked6" disabled>耐热性</el-checkbox></td>
          <td><el-checkbox v-model="checked8" disabled>低温柔度</el-checkbox></td>
          <td><el-checkbox v-model="checked7" disabled>低温弯折性</el-checkbox></td>
          <td colspan="6" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td colspan="3">{{ form.sampnum }}</td>
          <td class="td_right">委托编号：</td>
          <td colspan="3">{{ form.entnum }}</td>
          <td class="td_right">报告编号：</td>
          <td colspan="3">{{ form.repnum }}</td>
        </tr>
        <tr>
          <td class="td_right">工程编码：</td>
          <td colspan="3"><el-input v-model="form.pronum" placeholder="请输入工程编码" style="width: 200px" /></td>
          <td class="td_right">样品状态：</td>
          <td colspan="3">
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">样品名称：</td>
          <td colspan="3"><el-input v-model="form.sampname" placeholder="请输入样品名称" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">报告承诺天数：</td>
          <td colspan="3"><el-input-number v-model="form.repcondays" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">承诺到期日期：</td>
          <td colspan="3">
            <el-date-picker v-model="form.repcondate" placeholder="选择承诺到期日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" />
          </td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td colspan="3"><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /></td>
          <td class="td_right">规格型号：</td>
          <td colspan="3">
            <el-select v-model="form.spec" placeholder="请选择体材料" style="width: 200px">
              <el-option v-for="item in specOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">批号：</td>
          <td colspan="3"><el-input v-model="form.pihao" placeholder="请输入批号" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">工程部位：</td>
          <td colspan="7"><el-input v-model="form.unitnum" placeholder="请输入工程部位" style="width: 775px" /></td>
          <td class="td_right">样品数量：</td>
          <td colspan="3"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">代表批量：</td>
          <td colspan="3"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">主体材料：</td>
          <td colspan="3">
            <el-select v-model="form.sort" placeholder="请选择体材料" style="width: 200px">
              <el-option v-for="item in sortOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">商标：</td>
          <td colspan="3"><el-input v-model="form.sbiao" placeholder="请输入商标" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">公称厚度：</td>
          <td colspan="3">
            <el-select v-model="form.gcbh" placeholder="请选择公称厚度" style="width: 200px">
              <el-option v-for="item in cHdOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">粘结表面：</td>
          <td colspan="3">
            <el-select v-model="form.sbmcl" placeholder="请选择粘结表面" style="width: 200px">
              <el-option v-for="item in sbmclOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">生产日期：</td>
          <td colspan="3"><el-date-picker v-model="form.proddate" placeholder="选择生产日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">生产厂家：</td>
          <td colspan="11"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 1200px" /></td>
        </tr>
        <tr>
          <td colspan="12" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="12">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="12">拉伸强度</th>
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
                  <td class="td_center"><el-link disabled>纵向拉伸强度(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdz1" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdz2" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdz3" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdz4" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdz5" /></td>
                  <td class="td_center"><el-link disabled>横向拉伸强度(Mpa)</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdh1" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdh2" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdh3" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdh4" /></td>
                  <td class="td_center"><el-input v-model="form.lsqdh5" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>纵向试验现象</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsxxz1" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxz2" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxz3" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxz4" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxz5" /></td>
                  <td class="td_center"><el-link disabled>横向试验现象</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsxxh1" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxh2" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxh3" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxh4" /></td>
                  <td class="td_center"><el-input v-model="form.lsxxh5" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdzpjz" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdzzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdzpd" /></td>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdhpjz" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdhzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.lsqdhpd" /></td>
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
                  <th class="th_center" colspan="12">拉力</th>
                </tr>
                <tr>
                  <th class="th_center">试件</th>
                  <th class="th_center">横向(N/50mm)</th>
                  <th class="th_center" colspan="4">试验现象</th>
                  <th class="th_center"></th>
                  <th class="th_center">纵向(N/50mm)</th>
                  <th class="th_center" colspan="4">试验现象</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxll1" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.hxllxx1" /></td>
                  <td class="td_center"></td>
                  <td class="td_center"><el-input v-model="form.zxll1" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.zxllxx1" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxll2" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.hxllxx2" /></td>
                  <td class="td_center"></td>
                  <td class="td_center"><el-input v-model="form.zxll2" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.zxllxx2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxll3" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.hxllxx3" /></td>
                  <td class="td_center"></td>
                  <td class="td_center"><el-input v-model="form.zxll3" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.zxllxx3" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>4</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxll4" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.hxllxx4" /></td>
                  <td class="td_center"></td>
                  <td class="td_center"><el-input v-model="form.zxll4" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.zxllxx4" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>5</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxll5" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.hxllxx5" /></td>
                  <td class="td_center"></td>
                  <td class="td_center"><el-input v-model="form.zxll5" /></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.zxllxx5" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxllpjz" /></td>
                  <td class="td_center"><el-link disabled>技术指标≥</el-link></td>
                  <td class="td_center"><el-input v-model="form.hxlzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.lzb" /></td>
                  <td class="td_center"><el-link disabled>平均值</el-link></td>
                  <td class="td_center"><el-input v-model="form.zxllpjz" /></td>
                  <td class="td_center"><el-link disabled>技术指标≥</el-link></td>
                  <td class="td_center"><el-input v-model="form.zxlzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.zxllpd" /></td>
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
                  <th class="th_center" colspan="12">低温柔度</th>
                </tr>
                <tr>
                  <th class="th_center">上表面</th>
                  <th class="th_center">1</th>
                  <th class="th_center">2</th>
                  <th class="th_center">3</th>
                  <th class="th_center">4</th>
                  <th class="th_center">5</th>
                  <th class="th_center">下表面</th>
                  <th class="th_center">1</th>
                  <th class="th_center">2</th>
                  <th class="th_center">3</th>
                  <th class="th_center">4</th>
                  <th class="th_center">5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>有无裂纹</el-link></td>
                  <td class="td_center"><el-input v-model="form.rdxx11" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx12" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx13" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx14" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx15" /></td>
                  <td class="td_center"><el-link disabled>有无裂纹</el-link></td>
                  <td class="td_center"><el-input v-model="form.rdxx21" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx22" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx23" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx24" /></td>
                  <td class="td_center"><el-input v-model="form.rdxx25" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.rdxx1" /></td>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.rdxx2" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.rdxx" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center"><el-input v-model="form.rdwdzb" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.rdxxzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.rdpd" /></td>
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
                  <th class="th_center" colspan="12">低温弯折性</th>
                </tr>
                <tr>
                  <th class="th_center">试件</th>
                  <th class="th_center">温度</th>
                  <th class="th_center" colspan="2">现象</th>
                  <th class="th_center">温度</th>
                  <th class="th_center">现象</th>
                  <th class="th_center">温度</th>
                  <th class="th_center" colspan="2">现象</th>
                  <th class="th_center">温度</th>
                  <th class="th_center" colspan="2">现象</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>有无裂纹</el-link></td>
                  <td class="td_center"><el-input v-model="form.wzrdwd11" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wzrdxx11" /></td>
                  <td class="td_center"><el-input v-model="form.wzrdwd12" /></td>
                  <td class="td_center"><el-input v-model="form.wzrdxx12" /></td>
                  <td class="td_center"><el-link disabled>有无裂纹</el-link></td>
                  <td class="td_center"><el-input v-model="form.wzrdwd21" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wzrdxx21" /></td>
                  <td class="td_center"><el-input v-model="form.wzrdwd22" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wzrdxx22" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.wzrd1" /></td>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.wzrd1" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>检验结果</el-link></td>
                  <td class="td_center" colspan="5"><el-input v-model="form.wzrd" /></td>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center"><el-input v-model="form.wzrdwd" /></td>
                  <td class="td_center"><el-input v-model="form.wzrdzb" /></td>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center"><el-input v-model="form.wzrdpd" /></td>
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
                  <th class="th_center" colspan="5">不透水性</th>
                  <th class="th_center" colspan="7">耐热性</th>
                </tr>
                <tr>
                  <th class="th_center">试样</th>
                  <th class="th_center" colspan="4">结果</th>
                  <th class="th_center">试样</th>
                  <th class="th_center">温度(℃)</th>
                  <th class="th_center">位移</th>
                  <th class="th_center">现象</th>
                  <th class="th_center">检验结果</th>
                  <th class="th_center">技术指标</th>
                  <th class="th_center">单项评定</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>试验结果</el-link></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.btsxjg" /></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.nrwd1" /></td>
                  <td class="td_center"><el-input v-model="form.nrwy1" /></td>
                  <td class="td_center"><el-input v-model="form.nrxx1" /></td>
                  <td class="td_center"><el-input v-model="form.nr" /></td>
                  <td class="td_center"><el-input v-model="form.nrwdzb" /></td>
                  <td class="td_center"><el-input v-model="form.nrpd" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>技术指标</el-link></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.btsxzb" /></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.nrwd2" /></td>
                  <td class="td_center"><el-input v-model="form.nrwy2" /></td>
                  <td class="td_center"><el-input v-model="form.nrxx2" /></td>
                  <td class="td_center"><el-input v-model="form.nr" /></td>
                  <td class="td_center"><el-input v-model="form.nrwyzb" /></td>
                  <td class="td_center"><el-input v-model="form.nrpd" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>单项评定</el-link></td>
                  <td class="td_center" colspan="4"><el-input v-model="form.btsxpd" /></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center"><el-input v-model="form.nrwd3" /></td>
                  <td class="td_center"><el-input v-model="form.nrwy3" /></td>
                  <td class="td_center"><el-input v-model="form.nrxx3" /></td>
                  <td class="td_center"><el-input v-model="form.nr" /></td>
                  <td class="td_center"><el-input v-model="form.nrxxzb" /></td>
                  <td class="td_center"><el-input v-model="form.nrpd" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="11"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="11">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="11"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="4"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right">所用检测设备使用前状态：</td>
                <td colspan="6"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="4"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right">所用检测设备使用后状态：</td>
                <td colspan="6"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="4"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td colspan="2"><el-input v-model="form.temperature" /></td>
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
          <td colspan="12" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">取样地点：</td>
          <td colspan="3"><el-input v-model="form.recadd" /></td>
          <td class="td_right">供销单位：</td>
          <td colspan="7"><el-input v-model="form.bcFuc" /></td>
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
    name: 'Em326CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        specOptions: [],
        sampleStatusOptions: [],
        sortOptions: [],
        sbmclOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '326',
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
        listDictItemByCode('sort').then((response) => {
          this.sortOptions = response.data
        })
        listDictItemByCode('C_xh').then((response) => {
          this.specOptions = response.data
        })
        listDictItemByCode('sbmcl').then((response) => {
          this.sbmclOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'PAWS' }
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
