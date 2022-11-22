<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="8" style="background-color: #2b508a; color: #fff">委托项目-砂浆配合比</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="form.checkitem1">配合比</el-checkbox></td>
          <td colspan="7" style="text-align: right">
            <el-checkbox v-model="form.checked3" disabled>系统自动检下结论</el-checkbox>
          </td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <tr>
                <td class="td_right">样品编号：</td>
                <td>{{ form.sampnum }}</td>
                <td class="td_right">样品状态：</td>
                <td>
                  <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 150px">
                    <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
                  </el-select>
                </td>
                <td class="td_right">委托日期：</td>
                <td colspan="3">
                  <el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" />
                </td>
              </tr>
              <tr>
                <td class="td_right">检验类别：</td>
                <td><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 150px" /></td>
                <td class="td_right">砂浆品种：</td>
                <td>
                  <el-input v-model="form.sjpz" placeholder="请输入砂浆品种" style="width: 150px" />
                </td>
                <td class="td_right">抗渗性能：</td>
                <td colspan="3">
                  <el-input v-model="form.ksxn" placeholder="请输入抗渗性能" style="width: 150px" />
                </td>
              </tr>
              <tr>
                <td class="td_right">工程部位：</td>
                <td><el-input v-model="form.structpart" placeholder="请输入工程部位" style="width: 150px" /></td>
                <td class="td_right">K值：</td>
                <td>
                  <el-input v-model="form.kz" placeholder="请输入K值" style="width: 150px" />
                </td>
                <td class="td_right">搅拌方式：</td>
                <td colspan="3"><el-input v-model="form.jbfh" placeholder="请输入搅拌方式" style="width: 150px" /></td>
              </tr>
              <tr>
                <td class="td_right">强度等级：</td>
                <td><el-input v-model="form.cDj" placeholder="请输入强度等级" style="width: 150px" /></td>
                <td class="td_right">标准差：</td>
                <td>
                  <el-input v-model="form.cBzc" placeholder="请输入标准差" style="width: 150px" />
                </td>
                <td class="td_right">配置强度：</td>
                <td colspan="3"><el-input v-model="form.cPqd" placeholder="请输入配置强度" style="width: 150px" /></td>
              </tr>

              <tr>
                <td class="td_right">成型方法：</td>
                <td><el-input v-model="form.cxff" placeholder="请输入成型方法" style="width: 150px" /></td>
                <td class="td_right">稠度：</td>
                <td><el-input v-model="form.cdzb" placeholder="请输入稠度" style="width: 150px" /></td>
                <td class="td_right">保水率：</td>
                <td colspan="3">
                  <el-input v-model="form.fcd" placeholder="请输入保水率" style="width: 150px" />
                  (%)
                </td>
              </tr>
              <tr>
                <td class="td_right">水灰比：</td>
                <td><el-input v-model="form.shb" placeholder="请输入水灰比" style="width: 150px" /></td>
                <td class="td_right">养护条件：</td>
                <td><el-input v-model="form.yhbz" placeholder="请输入养护条件" style="width: 150px" /></td>
                <td class="td_right">代表批量：</td>
                <td colspan="3">
                  <el-input v-model="form.deputybat" placeholder="请输入代表批量" style="width: 150px" />
                </td>
              </tr>
              <tr>
                <td class="td_right">生产厂家：</td>
                <td colspan="3"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 150px" /></td>
                <td class="td_right">粘结强度：</td>
                <td colspan="3"><el-input v-model="form.njqd" placeholder="请输入代表批量" style="width: 150px" /></td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="8" style="background-color: #d8c14d; color: #fff">检测信息</td>
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
                <td><el-input v-model="form.cCno" style="width: 130px" /></td>
                <td style="width: 100px; text-align: right">强度等级</td>
                <td><el-input v-model="form.cCdj" style="width: 130px" /></td>
                <td style="width: 100px; text-align: right">安定性</td>
                <td colspan="3"><el-input v-model="form.cSaftes" /></td>
              </tr>
              <tr>
                <td style="text-align: right">品种代号</td>
                <td><el-input v-model="form.cVty" style="width: 130px" /></td>
                <td style="text-align: right">生产厂名</td>
                <td><el-input v-model="form.cProde" style="width: 130px" /></td>
                <td style="text-align: right">生产日期</td>
                <td colspan="3"><el-input v-model="form.cProddate" /></td>
              </tr>
              <tr>
                <td style="text-align: right">抗折强度(3d/7d)</td>
                <td><el-input v-model="form.cCzpt" style="width: 130px" /></td>
                <td style="text-align: right">抗折强度(28d)</td>
                <td><el-input v-model="form.cCzpte" style="width: 130px" /></td>
                <td style="text-align: right">抗压轻度(3d/7d)</td>
                <td><el-input v-model="form.cCmpt" style="width: 130px" /></td>
                <td style="text-align: right">抗压强度(28d)</td>
                <td><el-input v-model="form.cCmpte" /></td>
              </tr>
              <tr>
                <td rowspan="3">骨料(1)</td>
                <td style="text-align: right">样品编号</td>
                <td><el-input v-model="form.szNum" style="width: 130px" /></td>
                <td style="text-align: right">品种</td>
                <td><el-input v-model="form.szSva" style="width: 130px" /></td>
                <td style="text-align: right">规格</td>
                <td colspan="3"><el-input v-model="form.szSpec" /></td>
              </tr>
              <tr>
                <td style="text-align: right">产地</td>
                <td><el-input v-model="form.szProde" style="width: 130px" /></td>
                <td style="text-align: right">级配区</td>
                <td><el-input v-model="form.szRid" style="width: 130px" /></td>
                <td style="text-align: right">细度模数</td>
                <td><el-input v-model="form.szMod" style="width: 130px" /></td>
                <td style="text-align: right">空隙率(%)</td>
                <td><el-input v-model="form.szScgmass" /></td>
              </tr>
              <tr>
                <td style="text-align: right">含泥量(%)</td>
                <td><el-input v-model="form.szNsd" style="width: 130px" /></td>
                <td style="text-align: right">表观密度(kg/m³)</td>
                <td><el-input v-model="form.szSty" style="width: 130px" /></td>
                <td style="text-align: right">堆积密度(kg/m³)</td>
                <td colspan="3"><el-input v-model="form.szSdi" /></td>
              </tr>
              <tr>
                <td rowspan="3">骨料(2)</td>
                <td style="text-align: right">样品编号</td>
                <td><el-input v-model="form.szNum2" style="width: 130px" /></td>
                <td style="text-align: right">品种</td>
                <td><el-input v-model="form.szSva2" style="width: 130px" /></td>
                <td style="text-align: right">规格</td>
                <td colspan="3"><el-input v-model="form.szSpec2" /></td>
              </tr>
              <tr>
                <td style="text-align: right">产地</td>
                <td><el-input v-model="form.szProde2" style="width: 130px" /></td>
                <td style="text-align: right">级配区</td>
                <td><el-input v-model="form.szRid2" style="width: 130px" /></td>
                <td style="text-align: right">细度模数</td>
                <td><el-input v-model="form.szMod2" style="width: 130px" /></td>
                <td style="text-align: right">空隙率(%)</td>
                <td><el-input v-model="form.szScgmass2" /></td>
              </tr>
              <tr>
                <td style="text-align: right">含泥量(%)</td>
                <td><el-input v-model="form.szNsd2" style="width: 130px" /></td>
                <td style="text-align: right">表观密度(kg/m³)</td>
                <td><el-input v-model="form.szSty2" style="width: 130px" /></td>
                <td style="text-align: right">堆积密度(kg/m³)</td>
                <td colspan="3"><el-input v-model="form.szSdi2" /></td>
              </tr>
              <tr>
                <td rowspan="2">石灰膏</td>
                <td style="text-align: right">品名</td>
                <td><el-input v-model="form.mtPz" style="width: 130px" /></td>
                <td style="text-align: right">掺量</td>
                <td><el-input v-model="form.mtQdp" style="width: 130px" /></td>
                <td style="text-align: right">用量</td>
                <td colspan="3"><el-input v-model="form.chYl" /></td>
              </tr>
              <tr>
                <td style="text-align: right">稠度</td>
                <td><el-input v-model="form.chCd" style="width: 130px" /></td>
                <td style="text-align: right">产地</td>
                <td colspan="5"><el-input v-model="form.mtProde" /></td>
              </tr>
              <tr>
                <td rowspan="2">掺加料</td>
                <td style="text-align: right">品种</td>
                <td><el-input v-model="form.chPinz" style="width: 130px" /></td>
                <td style="text-align: right">等级</td>
                <td><el-input v-model="form.mtDj" style="width: 130px" /></td>
                <td style="text-align: right">接入方式</td>
                <td colspan="3"><el-input v-model="form.mtSyfh" style="width: 130px" /></td>
              </tr>
              <tr>
                <td style="text-align: right">取代率(%)</td>
                <td><el-input v-model="form.chCdb" style="width: 130px" /></td>
                <td style="text-align: right">掺量</td>
                <td><el-input v-model="form.chCl" style="width: 130px" /></td>
                <td style="text-align: right">生产厂家</td>
                <td colspan="3"><el-input v-model="form.chProde" /></td>
              </tr>
              <tr>
                <td rowspan="2">外加剂</td>
                <td style="text-align: right">样品编号</td>
                <td><el-input v-model="form.wjNo" style="width: 130px" /></td>
                <td style="text-align: right">品种</td>
                <td><el-input v-model="form.wjPz" style="width: 130px" /></td>
                <td style="text-align: right">品名</td>
                <td><el-input v-model="form.wjPm" style="width: 130px" /></td>
                <td style="text-align: right">掺量(%)</td>
                <td><el-input v-model="form.wjCl" /></td>
              </tr>
              <tr>
                <td style="text-align: right">用量</td>
                <td><el-input v-model="form.wjYl" style="width: 130px" /></td>
                <td style="text-align: right">容量</td>
                <td><el-input v-model="form.wjJsl" style="width: 130px" /></td>
                <td style="text-align: right">生产厂家</td>
                <td colspan="3"><el-input v-model="form.wjProde" /></td>
              </tr>
              <tr>
                <td style="text-align: right">水源</td>
                <td colspan="8"><el-input v-model="form.mtWater" /></td>
              </tr>
              <tr>
                <td>原材料结论状态</td>
                <td>水泥</td>
                <td><el-input v-model="form.name" style="width: 130px" /></td>
                <td>细骨料(1)</td>
                <td><el-input v-model="form.name" style="width: 130px" /></td>
                <td>细骨料(2)</td>
                <td colspan="3"><el-input v-model="form.name" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <table>
              <tr id="r0" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" colspan="16" height="19" style="height: 14.25pt" width="1135">砂浆配合比：调整</td>
              </tr>
              <tr id="r1" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" height="38" rowspan="2" style="height: 28.5pt">序号</td>
                <td class="x23" colspan="7">适配材料用量(kg)</td>
                <td class="x23" colspan="8">配合比</td>
              </tr>
              <tr id="r2" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21">水泥</td>
                <td class="x24">砂(1)</td>
                <td class="x21">砂(2)</td>
                <td class="x21">石灰膏</td>
                <td class="x21">掺加料</td>
                <td class="x21">水</td>
                <td class="x21">外加剂</td>
                <td class="x21"></td>
                <td class="x21">(水泥：</td>
                <td class="x24">砂(1)：</td>
                <td class="x21">砂(2)：</td>
                <td class="x21">石灰膏：</td>
                <td class="x21">掺加料：</td>
                <td class="x21">水：</td>
                <td class="x21">外加剂)</td>
              </tr>
              <tr id="r3" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="19" style="height: 14.25pt">1</td>
                <td class="x21"><el-input v-model="form.snCemt1" /></td>
                <td class="x21"><el-input v-model="form.snSzi1" /></td>
                <td class="x21"><el-input v-model="form.name" /></td>
                <td class="x21"><el-input v-model="form.snMt1" /></td>
                <td class="x21"><el-input v-model="form.snChzl1" /></td>
                <td class="x21"><el-input v-model="form.snWater1" /></td>
                <td class="x21"><el-input v-model="form.snWj1" /></td>
                <td class="x21">1:</td>
                <td class="x21">
                  <el-input v-model="form.snpCemt1" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpSzi1" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.name" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpMt1" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpChzl1" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpWater1" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpWj1" />
                  :
                </td>
              </tr>
              <tr id="r4" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="19" style="height: 14.25pt">2</td>
                <td class="x21"><el-input v-model="form.snCemt2" /></td>
                <td class="x21"><el-input v-model="form.snSzi2" /></td>
                <td class="x21"><el-input v-model="form.name" /></td>
                <td class="x21"><el-input v-model="form.snMt2" /></td>
                <td class="x21"><el-input v-model="form.snChzl2" /></td>
                <td class="x21"><el-input v-model="form.snWater2" /></td>
                <td class="x21"><el-input v-model="form.snWj2" /></td>
                <td class="x21">1:</td>
                <td class="x21">
                  <el-input v-model="form.snpCemt2" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpSzi2" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.name" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpMt2" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpChzl2" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpWater2" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpWj2" />
                  :
                </td>
              </tr>
              <tr id="r5" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="19" style="height: 14.25pt">3</td>
                <td class="x21"><el-input v-model="form.snCemt3" /></td>
                <td class="x21"><el-input v-model="form.snSzi3" /></td>
                <td class="x21"><el-input v-model="form.name" /></td>
                <td class="x21"><el-input v-model="form.snMt3" /></td>
                <td class="x21"><el-input v-model="form.snChzl3" /></td>
                <td class="x21"><el-input v-model="form.snWater3" /></td>
                <td class="x21"><el-input v-model="form.snWj3" /></td>
                <td class="x21">1:</td>
                <td class="x21">
                  <el-input v-model="form.snpCemt3" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpSzi3" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.name" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpMt3" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpChzl3" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpWater3" />
                  :
                </td>
                <td class="x21">
                  <el-input v-model="form.snpWj3" />
                  :
                </td>
              </tr>
              <tr id="r6" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" height="38" rowspan="2" style="height: 28.5pt">序号</td>
                <td class="x23" colspan="3">稠度(mm)</td>
                <td class="x23" colspan="3">保水率(%)</td>
                <td class="x25" height="38" rowspan="2" style="height: 28.5pt; overflow: hidden">
                  质量
                  <br />
                  密度
                </td>
                <td class="x22" height="38" rowspan="2" style="height: 28.5pt">序号</td>
                <td class="x22" colspan="6">抗压强度(MPa)及抗压强度比(%)</td>
                <td class="x21"></td>
              </tr>
              <tr id="r7" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21">稠度1</td>
                <td class="x21">稠度2</td>
                <td class="x21">平均值</td>
                <td class="x21">保水率1</td>
                <td class="x21">保水率2</td>
                <td class="x21">平均值</td>
                <td class="x21">7d</td>
                <td class="x21">7d掺加剂</td>
                <td class="x21">7d强度比</td>
                <td class="x21">28d</td>
                <td class="x21">28d掺加剂</td>
                <td class="x21" colspan="2" style="mso-ignore: colspan">28d强度比</td>
              </tr>
              <tr id="r8" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="19" style="height: 14.25pt">1</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snCd1" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snFcd1" /></td>
                <td class="x21"><el-input v-model="form.snZlmid1" /></td>
                <td class="x21">1</td>
                <td class="x21"><el-input v-model="form.snMpat1" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snMpate1" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r9" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="19" style="height: 14.25pt">2</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snCd2" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snFcd2" /></td>
                <td class="x21"><el-input v-model="form.snZlmid2" /></td>
                <td class="x21">1</td>
                <td class="x21"><el-input v-model="form.snMpat2" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snMpate2" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r10" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="19" style="height: 14.25pt">3</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snCd3" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snFcd3" /></td>
                <td class="x21"><el-input v-model="form.snZlmid3" /></td>
                <td class="x21">1</td>
                <td class="x21"><el-input v-model="form.snMpat3" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"><el-input v-model="form.snMpate3" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r11" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x26" height="95" rowspan="5" style="height: 71.25pt">
                  检
                  <br />
                  测
                  <br />
                  项
                  <br />
                  目
                </td>
                <td class="x22" colspan="2">粘结强度(MPa)</td>
                <td class="x21">1</td>
                <td class="x21">X</td>
                <td class="x21">2</td>
                <td class="x21">X</td>
                <td class="x21">3</td>
                <td class="x21">X</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r12" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" colspan="2">抗渗性能</td>
                <td class="x21">1</td>
                <td class="x21">X</td>
                <td class="x21">2</td>
                <td class="x21"></td>
                <td class="x21">3</td>
                <td class="x21">X</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r13" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" colspan="2">序号</td>
                <td class="x21">1</td>
                <td class="x21">2</td>
                <td class="x21">平均值</td>
                <td class="x21">1</td>
                <td class="x21">2</td>
                <td class="x21">平均值</td>
                <td class="x21">1</td>
                <td class="x21">2</td>
                <td class="x21">平均值</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r14" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" colspan="2">含水率(%)</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r15" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" colspan="2">干密度(kg/m³)</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21">X</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <table>
              <tr id="r0" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" colspan="11" height="17" width="871">砂浆配合比：抗压强度</td>
              </tr>
              <tr id="r1" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x22" colspan="2" height="17">
                  <span style="float: right">试件尺寸</span>
                </td>
                <td class="x21" colspan="2">
                  <el-input v-model="form.size" />
                </td>
                <td class="x23">成型日期</td>
                <td class="x23">
                  <el-date-picker v-model="form.chxDate" :editable="false" placeholder="成型日期" style="width: 100px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td class="x23">破型日期</td>
                <td class="x24"><span style="float: right">7d</span></td>
                <td class="x23">
                  <el-date-picker v-model="form.pxsDate" :editable="false" placeholder="破型日期" style="width: 100px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td class="x23">28d</td>
                <td class="x23">
                  <el-date-picker v-model="form.pxeDate" :editable="false" placeholder="破型日期" style="width: 100px" type="date" value-format="yyyy-MM-dd" />
                </td>
              </tr>
              <tr id="r2" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x25" height="36" rowspan="2">龄期</td>
                <td class="x25" height="36" rowspan="2">序号</td>
                <td class="x25" colspan="3">1</td>
                <td class="x25" colspan="3">2</td>
                <td class="x25" colspan="3">3</td>
              </tr>
              <tr id="r3" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23">荷载(kN)</td>
                <td class="x23">测值(Mpa)</td>
                <td class="x23">代表值(MPa)</td>
                <td class="x23">荷载(kN)</td>
                <td class="x23">测值(Mpa)</td>
                <td class="x23">代表值(MPa)</td>
                <td class="x23">荷载(kN)</td>
                <td class="x23">测值(Mpa)</td>
                <td class="x23">代表值(MPa)</td>
              </tr>
              <tr id="r4" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x25" height="112" rowspan="6">7d</td>
                <td class="x23" style="text-align: right">1</td>
                <td class="x23"><el-input v-model="form.kyYls11" /></td>
                <td class="x23"><el-input v-model="form.kyQds11" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls21" /></td>
                <td class="x23"><el-input v-model="form.kyQds21" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls31" /></td>
                <td class="x23"><el-input v-model="form.kyQds31" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r5" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">2</td>
                <td class="x23"><el-input v-model="form.kyYls12" /></td>
                <td class="x23"><el-input v-model="form.kyQds12" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls22" /></td>
                <td class="x23"><el-input v-model="form.kyQds22" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls32" /></td>
                <td class="x23"><el-input v-model="form.kyQds32" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r6" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">3</td>
                <td class="x23"><el-input v-model="form.kyYls13" /></td>
                <td class="x23"><el-input v-model="form.kyQds13" /></td>
                <td class="x23"><el-input v-model="form.kyQdsz1" /></td>
                <td class="x23"><el-input v-model="form.kyYls23" /></td>
                <td class="x23"><el-input v-model="form.kyQds23" /></td>
                <td class="x23"><el-input v-model="form.kyQdsz2" /></td>
                <td class="x23"><el-input v-model="form.kyYls33" /></td>
                <td class="x23"><el-input v-model="form.kyQds33" /></td>
                <td class="x23"><el-input v-model="form.kyQdsz3" /></td>
              </tr>
              <tr id="r7" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">4</td>
                <td class="x23"><el-input v-model="form.kyYls14" /></td>
                <td class="x23"><el-input v-model="form.kyQds14" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls24" /></td>
                <td class="x23"><el-input v-model="form.kyQds24" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls34" /></td>
                <td class="x23"><el-input v-model="form.kyQds34" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r8" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">5</td>
                <td class="x23"><el-input v-model="form.kyYls15" /></td>
                <td class="x23"><el-input v-model="form.kyQds15" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls25" /></td>
                <td class="x23"><el-input v-model="form.kyQds25" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls35" /></td>
                <td class="x23"><el-input v-model="form.kyQds35" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r9" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">6</td>
                <td class="x23"><el-input v-model="form.kyYls16" /></td>
                <td class="x23"><el-input v-model="form.kyQds16" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls26" /></td>
                <td class="x23"><el-input v-model="form.kyQds26" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYls36" /></td>
                <td class="x23"><el-input v-model="form.kyQds36" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r10" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x25" height="112" rowspan="6">28d</td>
                <td class="x23" style="text-align: right">1</td>
                <td class="x23"><el-input v-model="form.kyYle11" /></td>
                <td class="x23"><el-input v-model="form.kyQde11" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle21" /></td>
                <td class="x23"><el-input v-model="form.kyQde21" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle31" /></td>
                <td class="x23"><el-input v-model="form.kyQde31" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r11" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">2</td>
                <td class="x23"><el-input v-model="form.kyYle12" /></td>
                <td class="x23"><el-input v-model="form.kyQde12" /></td>
                <td class="x23"><el-input v-model="form.kyQdez1" /></td>
                <td class="x23"><el-input v-model="form.kyYle22" /></td>
                <td class="x23"><el-input v-model="form.kyQde22" /></td>
                <td class="x23"><el-input v-model="form.kyQdez2" /></td>
                <td class="x23"><el-input v-model="form.kyYle32" /></td>
                <td class="x23"><el-input v-model="form.kyQde32" /></td>
                <td class="x23"><el-input v-model="form.kyQdez3" /></td>
              </tr>
              <tr id="r12" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">3</td>
                <td class="x23"><el-input v-model="form.kyYle13" /></td>
                <td class="x23"><el-input v-model="form.kyQde13" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle23" /></td>
                <td class="x23"><el-input v-model="form.kyQde23" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle33" /></td>
                <td class="x23"><el-input v-model="form.kyQde33" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r13" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">4</td>
                <td class="x23"><el-input v-model="form.kyYle14" /></td>
                <td class="x23"><el-input v-model="form.kyQde14" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle24" /></td>
                <td class="x23"><el-input v-model="form.kyQde24" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle34" /></td>
                <td class="x23"><el-input v-model="form.kyQde34" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r14" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">5</td>
                <td class="x23"><el-input v-model="form.kyYle15" /></td>
                <td class="x23"><el-input v-model="form.kyQde15" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle25" /></td>
                <td class="x23"><el-input v-model="form.kyQde25" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle35" /></td>
                <td class="x23"><el-input v-model="form.kyQde35" /></td>
                <td class="x23"></td>
              </tr>
              <tr id="r15" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" style="text-align: right">6</td>
                <td class="x23"><el-input v-model="form.kyYle16" /></td>
                <td class="x23"><el-input v-model="form.kyQde16" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle26" /></td>
                <td class="x23"><el-input v-model="form.kyQde26" /></td>
                <td class="x23"></td>
                <td class="x23"><el-input v-model="form.kyYle36" /></td>
                <td class="x23"><el-input v-model="form.kyQde36" /></td>
                <td class="x23"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <table>
              <tr id="r0" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt; width: 54pt" width="72">矫正系数</td>
                <td class="x21" style="width: 54pt" width="72">X</td>
                <td class="x22" colspan="14" width="1047">砂浆配合比：确定</td>
              </tr>
              <tr id="r1" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x23" height="36" rowspan="2">砂浆施工配合比</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r2" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21">水泥</td>
                <td class="x21">砂(1)</td>
                <td class="x21">砂(2)</td>
                <td class="x21">石灰膏</td>
                <td class="x21">掺加料</td>
                <td class="x21">水</td>
                <td class="x21">外加剂</td>
                <td class="x24"></td>
                <td class="x24">(水泥：</td>
                <td class="x25">砂(1)：</td>
                <td class="x24">砂(2)：</td>
                <td class="x24">石灰膏：</td>
                <td class="x24">掺加料：</td>
                <td class="x24">水：</td>
                <td class="x24">外加剂)</td>
              </tr>
              <tr id="r3" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x24" height="17" style="height: 12.75pt"><el-input v-model="form.pbIndex" /></td>
                <td class="x24"><el-input v-model="form.qdCemt" /></td>
                <td class="x24"><el-input v-model="form.qdSzi" /></td>
                <td class="x24"><el-input v-model="form.qdSzi" /></td>
                <td class="x24"><el-input v-model="form.qdMt" /></td>
                <td class="x24"><el-input v-model="form.qdChzl" /></td>
                <td class="x24"><el-input v-model="form.qdWater" /></td>
                <td class="x24"><el-input v-model="form.qdWj" /></td>
                <td class="x26" x:num="0.041666666666666664">1:00</td>
                <td class="x24">
                  <el-input v-model="form.qdpCemt" />
                </td>
                <td class="x24">
                  <el-input v-model="form.qdpSzi" />
                </td>
                <td class="x24">
                  <el-input v-model="form.qdpSzi" />
                </td>
                <td class="x24">
                  <el-input v-model="form.qdpMt" />
                </td>
                <td class="x24">
                  <el-input v-model="form.qdpChzl" />
                </td>
                <td class="x24">
                  <el-input v-model="form.qdpWater" />
                </td>
                <td class="x24">
                  <el-input v-model="form.qdpWj" />
                </td>
              </tr>
              <tr id="r4" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">稠度(mm)</td>
                <td class="x21">保水率(%)</td>
                <td class="x21">质量密度</td>
                <td class="x21">粘结强度(MPa)</td>
                <td class="x21">抗渗性能</td>
                <td class="x22" colspan="4">抗压强度(MPa)</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r5" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt"><el-input v-model="form.qdCd" /></td>
                <td class="x21"><el-input v-model="form.qdFcd" /></td>
                <td class="x21"><el-input v-model="form.qdZlmidu" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21">7d</td>
                <td class="x21"><el-input v-model="form.qdMpat" /></td>
                <td class="x21">28d</td>
                <td class="x21"><el-input v-model="form.qdMpate" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
                <td class="x21"><el-input v-model="form.qdpWater" /></td>
              </tr>
              <tr id="r6" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">干密度</td>
                <td class="x21">X</td>
                <td class="x21">凝结时间</td>
                <td class="x21">X</td>
                <td class="x21">收缩值</td>
                <td class="x21">X</td>
                <td class="x21">分层度</td>
                <td class="x21">X</td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r7" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">结论</td>
                <td class="x27" colspan="7"><el-input v-model="form.checkconclusion" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r8" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">结论状态</td>
                <td class="x22" colspan="3"><el-input v-model="form.name" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r9" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">备注</td>
                <td class="x22" colspan="7"><el-input v-model="form.expl" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r10" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">设备编号</td>
                <td class="x22" colspan="7"><el-input v-model="form.instrumentnum" /></td>
                <td class="x22" colspan="3">所用检测设备使用前状态</td>
                <td class="x22" colspan="5"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr id="r11" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">设备名称</td>
                <td class="x22" colspan="7"><el-input v-model="form.instrumentname" /></td>
                <td class="x22" colspan="3">所用检测设备使用后状态</td>
                <td class="x22" colspan="5"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr id="r12" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">试验环境</td>
                <td class="x22" colspan="7"><el-input v-model="form.checkenvironment" /></td>
                <td class="x21">温度℃</td>
                <td class="x22" colspan="2"><el-input v-model="form.temperature" /></td>
                <td class="x21">湿度%</td>
                <td class="x22" colspan="2"><el-input v-model="form.humidity" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r13" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">检测标准</td>
                <td class="x22" colspan="7"><el-input v-model="form.standname" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
              <tr id="r14" height="19" style="mso-height-source: userset; height: 14.25pt">
                <td class="x21" height="17" style="height: 12.75pt">评定标准</td>
                <td class="x22" colspan="7"><el-input v-model="form.pdstandardname" /></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
                <td class="x21"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table>
              <tr>
                <td class="td_right">复核人：</td>
                <td>{{ form.collateman }}</td>
                <td class="td_right">复核日期：</td>
                <td><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">主检：</td>
                <td>{{ form.firstcheckman }}</td>
                <td class="td_right">复检：</td>
                <td>{{ form.secondcheckman }}</td>
              </tr>
              <tr>
                <td class="td_right">实测日期：</td>
                <td><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">检测日期：</td>
                <td><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">校核员：</td>
                <td>{{ form.verifyman }}</td>
                <td class="td_right">校核日期：</td>
                <td><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
              </tr>
              <tr>
                <td class="td_right">审核人：</td>
                <td>{{ form.auditingman }}</td>
                <td class="td_right">审核日期：</td>
                <td><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">批准人：</td>
                <td>{{ form.approveman }}</td>
                <td class="td_right">批准日期：</td>
                <td><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
              </tr>
              <tr>
                <td class="td_right">打印员：</td>
                <td>{{ form.printman }}</td>
                <td class="td_right">打印日期：</td>
                <td><el-date-picker v-model="form.printdate" placeholder="选择打印日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">发放人：</td>
                <td>{{ form.extendman }}</td>
                <td class="td_right">发放日期：</td>
                <td><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
              </tr>
              <tr>
                <td class="td_right">收样人：</td>
                <td>{{ form.geid }}</td>
                <td class="td_right">收样时间：</td>
                <td><el-date-picker v-model="form.getdate" placeholder="选择收样时间" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">收样地点：</td>
                <td colspan="3"><el-input v-model="form.getadd" /></td>
              </tr>
              <tr>
                <td class="td_right">检测人：</td>
                <td>{{ form.chkid }}</td>
                <td class="td_right">检测时间：</td>
                <td><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
                <td class="td_right">检测地点：</td>
                <td colspan="3"><el-input v-model="form.chkadd" /></td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="8" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">取样地点：</td>
          <td><el-input v-model="form.recadd" /></td>
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
    name: 'Em308CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        sampleStatusOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '308',
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
        listDictItemByCode('HJHS').then((response) => {
          this.hjxsOptions = response.data
        })
        const libParas = { libnum: 'GHJC' }
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
