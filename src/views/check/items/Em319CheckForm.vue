<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="11" style="background-color: #2b508a; color: #fff">委托项目-蒸压加气混凝土砌块</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>抗压强度</el-checkbox></td>
          <td><el-checkbox v-model="checked2" disabled>干体积密度试验</el-checkbox></td>
          <td colspan="9" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="11" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td colspan="3">{{ form.sampnum }}</td>
          <td class="td_right">样品状态：</td>
          <td colspan="2">
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
          <td class="td_right">强度等级：</td>
          <td colspan="2">
            <el-select v-model="form.cGrade" placeholder="请选择强度等级" style="width: 200px">
              <el-option v-for="item in cGradeOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">报告承诺日期：</td>
          <td colspan="3"><el-date-picker v-model="form.repcondate" placeholder="选择诺日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>

        <tr>
          <td class="td_right">公称尺寸：</td>
          <td colspan="3">
            <el-input v-model="form.size1" style="width: 56px" />
            ×
            <el-input v-model="form.size2" style="width: 56px" />
            ×
            <el-input v-model="form.size3" style="width: 56px" />
          </td>
          <td class="td_right">代表批量：</td>
          <td colspan="2"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">密度等级：</td>
          <td colspan="3">
            <el-select v-model="form.cMd" placeholder="请选择密度等级" style="width: 200px">
              <el-option v-for="item in mdDengjiOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">产品等级：</td>
          <td colspan="3">
            <el-select v-model="form.cDj" placeholder="请选择产品等级" style="width: 200px">
              <el-option v-for="item in cDjOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">样品数量：</td>
          <td colspan="2"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">生产日期：</td>
          <td colspan="3"><el-date-picker v-model="form.proddate" placeholder="选择生产日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>

        <tr>
          <td class="td_right">生产厂家：</td>
          <td colspan="3"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="11" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="11">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="11">抗压强度试验</th>
                </tr>
                <tr>
                  <th class="th_center">组数</th>
                  <th class="th_center" style="width: 9%">试件编号</th>
                  <th class="th_center" colspan="2" style="width: 18%">长度(mm)</th>
                  <th class="th_center" colspan="2" style="width: 18%">宽度(mm)</th>
                  <th class="th_center" colspan="2" style="width: 18%">荷载(KN)</th>
                  <th class="th_center" style="width: 9%">强度</th>
                  <th class="th_center" style="width: 9%">单组平均值</th>
                  <th class="th_center" style="width: 9%">实验平均值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>第一组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc11" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk11" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai11" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu11" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun1" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第一组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc12" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk12" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai12" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu12" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun1" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第一组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc13" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk13" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai13" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu13" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun1" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第二组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc21" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk21" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai21" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu21" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun2" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第二组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc22" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk22" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai22" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu22" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun2" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第二组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc23" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk23" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai23" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu23" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun2" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第三组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc31" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk31" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai31" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu31" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun3" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第三组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc32" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk32" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai32" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu32" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun3" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第三组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc33" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk33" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai33" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu33" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun3" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第四组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc41" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk41" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai41" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu41" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun4" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第四组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc42" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk42" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai42" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu42" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun4" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第四组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc43" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk43" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai43" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu43" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun4" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第五组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc51" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk51" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai51" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu51" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun5" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第五组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc52" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk52" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai52" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu52" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun5" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第五组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyc53" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.kyk53" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.hezai53" /></td>
                  <td class="td_center"><el-input v-model="form.qiangdu53" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun5" /></td>
                  <td class="td_center"><el-input v-model="form.Fpingjun" /></td>
                </tr>
                <tr>
                  <td class="td_right">单项评定</td>
                  <td colspan="10"><el-input v-model="form.checkitem1s" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="11">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center" colspan="10">干体积密度试验</th>
                </tr>
                <tr>
                  <th class="th_center">组数</th>
                  <th class="th_center">试样编号</th>
                  <th class="th_center" style="width: 9%">烘干后质量(g)</th>
                  <th class="th_center" style="width: 9%">长度(mm)</th>
                  <th class="th_center" style="width: 9%">宽度(mm)</th>
                  <th class="th_center" style="width: 9%">高度(mm)</th>
                  <th class="th_center" style="width: 9%">体积(mm³)</th>
                  <th class="th_center" style="width: 9%">体积密度(kg/m³)</th>
                  <th class="th_center" style="width: 9%">平均密度(kg/m³)</th>
                  <th class="th_center" style="width: 9%">技术指标(kg/m³)≤</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>第一组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.m11" /></td>
                  <td class="td_center"><el-input v-model="form.miduC11" /></td>
                  <td class="td_center"><el-input v-model="form.miduK11" /></td>
                  <td class="td_center"><el-input v-model="form.miduG11" /></td>
                  <td class="td_center"><el-input v-model="form.v11" /></td>
                  <td class="td_center"><el-input v-model="form.r11" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第一组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.m12" /></td>
                  <td class="td_center"><el-input v-model="form.miduC12" /></td>
                  <td class="td_center"><el-input v-model="form.miduK12" /></td>
                  <td class="td_center"><el-input v-model="form.miduG12" /></td>
                  <td class="td_center"><el-input v-model="form.v12" /></td>
                  <td class="td_center"><el-input v-model="form.r12" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第一组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center"><el-input v-model="form.m13" /></td>
                  <td class="td_center"><el-input v-model="form.miduC13" /></td>
                  <td class="td_center"><el-input v-model="form.miduK13" /></td>
                  <td class="td_center"><el-input v-model="form.miduG13" /></td>
                  <td class="td_center"><el-input v-model="form.v13" /></td>
                  <td class="td_center"><el-input v-model="form.r13" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第二组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.m21" /></td>
                  <td class="td_center"><el-input v-model="form.miduC21" /></td>
                  <td class="td_center"><el-input v-model="form.miduK21" /></td>
                  <td class="td_center"><el-input v-model="form.miduG21" /></td>
                  <td class="td_center"><el-input v-model="form.v21" /></td>
                  <td class="td_center"><el-input v-model="form.r21" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第二组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.m22" /></td>
                  <td class="td_center"><el-input v-model="form.miduC22" /></td>
                  <td class="td_center"><el-input v-model="form.miduK22" /></td>
                  <td class="td_center"><el-input v-model="form.miduG22" /></td>
                  <td class="td_center"><el-input v-model="form.v22" /></td>
                  <td class="td_center"><el-input v-model="form.r22" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第二组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center"><el-input v-model="form.m23" /></td>
                  <td class="td_center"><el-input v-model="form.miduC23" /></td>
                  <td class="td_center"><el-input v-model="form.miduK23" /></td>
                  <td class="td_center"><el-input v-model="form.miduG23" /></td>
                  <td class="td_center"><el-input v-model="form.v23" /></td>
                  <td class="td_center"><el-input v-model="form.r23" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第三组</el-link></td>
                  <td class="td_center"><el-link disabled>1</el-link></td>
                  <td class="td_center"><el-input v-model="form.m31" /></td>
                  <td class="td_center"><el-input v-model="form.miduC31" /></td>
                  <td class="td_center"><el-input v-model="form.miduK31" /></td>
                  <td class="td_center"><el-input v-model="form.miduG31" /></td>
                  <td class="td_center"><el-input v-model="form.v31" /></td>
                  <td class="td_center"><el-input v-model="form.r31" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第三组</el-link></td>
                  <td class="td_center"><el-link disabled>2</el-link></td>
                  <td class="td_center"><el-input v-model="form.m32" /></td>
                  <td class="td_center"><el-input v-model="form.miduC32" /></td>
                  <td class="td_center"><el-input v-model="form.miduK32" /></td>
                  <td class="td_center"><el-input v-model="form.miduG32" /></td>
                  <td class="td_center"><el-input v-model="form.v32" /></td>
                  <td class="td_center"><el-input v-model="form.r32" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>第三组</el-link></td>
                  <td class="td_center"><el-link disabled>3</el-link></td>
                  <td class="td_center"><el-input v-model="form.m33" /></td>
                  <td class="td_center"><el-input v-model="form.miduC33" /></td>
                  <td class="td_center"><el-input v-model="form.miduK33" /></td>
                  <td class="td_center"><el-input v-model="form.miduG33" /></td>
                  <td class="td_center"><el-input v-model="form.v33" /></td>
                  <td class="td_center"><el-input v-model="form.r33" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjun" /></td>
                  <td class="td_center"><el-input v-model="form.fpingjuns" /></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">单项评定</td>
                <td colspan="10"><el-input v-model="form.checkitem2s" /></td>
              </tr>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="10"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="10">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="10"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="2"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right" colspan="2">所用检测设备使用前状态：</td>
                <td colspan="8"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="2"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right" colspan="2">所用检测设备使用后状态：</td>
                <td colspan="8"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="2"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right" colspan="2">温度℃：</td>
                <td colspan="2"><el-input v-model="form.temperature" /></td>
                <td class="td_right">湿度%：</td>
                <td colspan="3"><el-input v-model="form.humidity" /></td>
              </tr>
              <tr>
                <td class="td_right">检测标准：</td>
                <td colspan="10"><el-input v-model="form.standname" /></td>
              </tr>
              <tr>
                <td class="td_right">评定标准：</td>
                <td colspan="10"><el-input v-model="form.pdstandardname" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="11" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td class="td_right">复核人：</td>
          <td colspan="2">{{ form.collateman }}</td>
          <td class="td_right">复核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td colspan="2">{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td>{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td colspan="2">{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td colspan="2">{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td colspan="2">{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td colspan="2">{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td colspan="2"><el-date-picker v-model="form.printdate" placeholder="选择打印日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td colspan="2">{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td colspan="2">{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td colspan="2"><el-date-picker v-model="form.getdate" placeholder="选择收样时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">收样地点：</td>
          <td colspan="4"><el-input v-model="form.getadd" /></td>
        </tr>
        <tr>
          <td class="td_right">检测人：</td>
          <td colspan="2">{{ form.chkid }}</td>
          <td class="td_right">检测时间：</td>
          <td colspan="2"><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测地点：</td>
          <td colspan="4"><el-input v-model="form.chkadd" /></td>
        </tr>
        <tr>
          <td colspan="11" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">出厂批号：</td>
          <td colspan="2"><el-input v-model="form.cPh" /></td>
          <td class="td_right">取样地点：</td>
          <td colspan="2"><el-input v-model="form.recadd" /></td>
        </tr>
        <tr>
          <td colspan="11" style="text-align: right">
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
    name: 'Em319CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        sampleStatusOptions: [],
        cDjOptions: [],
        cGradeOptions: [],
        mdDengjiOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '319',
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
        listDictItemByCode('C_md').then((response) => {
          this.mdDengjiOptions = response.data
        })
        listDictItemByCode('chanpindengjis').then((response) => {
          this.cDjOptions = response.data
        })
        listDictItemByCode('C_grade319').then((response) => {
          this.cGradeOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'ZYJQ' }
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
