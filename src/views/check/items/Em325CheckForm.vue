<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 100%">
        <tr>
          <td colspan="13" style="background-color: #2b508a; color: #fff">委托项目-土壤击实</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checked1" disabled>土壤击实</el-checkbox></td>
          <td colspan="12" style="text-align: right"><el-checkbox v-model="checked9">系统自动检下结论</el-checkbox></td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #9db4c3; color: #fff">委托信息</td>
        </tr>
        <tr>
          <td class="td_right">样品编号：</td>
          <td colspan="3">{{ form.sampnum }}</td>
          <td class="td_right">委托编号：</td>
          <td colspan="3">{{ form.entnum }}</td>
          <td class="td_right">报告编号：</td>
          <td colspan="4">{{ form.repnum }}</td>
        </tr>
        <tr>
          <td class="td_right">工程编码：</td>
          <td colspan="3"><el-input v-model="form.pronum" placeholder="请输入工程编码" style="width: 200px" /></td>
          <td class="td_right">委托日期：</td>
          <td colspan="3"><el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">报告承诺天数：</td>
          <td colspan="4"><el-input-number v-model="form.repcondays" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">检验类别：</td>
          <td colspan="3"><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 200px" /></td>
          <td class="td_right">土壤类型：</td>
          <td colspan="3">
            <el-select v-model="form.sampname" placeholder="请选择土壤类别" style="width: 200px">
              <el-option v-for="item in cTrlbOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
          <td class="td_right">承诺到期日期：</td>
          <td colspan="4"><el-date-picker v-model="form.repcondate" placeholder="选择承诺到期日期" style="width: 200px" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">工程地址：</td>
          <td colspan="7"><el-input v-model="form.cTfdz" placeholder="请输入程地址" style="width: 790px" /></td>
          <td class="td_right">击实类型：</td>
          <td colspan="4">
            <el-select v-model="form.cJslx" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in cJslxOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">取样位置：</td>
          <td colspan="3"><el-input v-model="form.cWz" placeholder="请输入取样位置" style="width: 200px" /></td>
          <td class="td_right">样品数量：</td>
          <td colspan="3"><el-input-number v-model="form.sampmout" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">样品状态：</td>
          <td colspan="4">
            <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 200px">
              <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="td_right">范围：</td>
          <td colspan="3"><el-input v-model="form.bound" placeholder="请输入范围" style="width: 200px" /></td>
          <td class="td_right">筒容积(cm³)：</td>
          <td colspan="3"><el-input-number v-model="form.cTjb" controls-position="right" :min="1" style="width: 200px" /></td>
          <td class="td_right">压实系数：</td>
          <td colspan="4"><el-input-number v-model="form.cYsxs" placeholder="请输入压实系数" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">落距：</td>
          <td colspan="3"><el-input v-model="form.lzhu" placeholder="请输入落距" style="width: 200px" /></td>
          <td class="td_right">击锤质量：</td>
          <td colspan="3"><el-input-number v-model="form.jcmate" placeholder="请输入击锤质量" style="width: 200px" /></td>
          <td class="td_right">击实层次：</td>
          <td colspan="4"><el-input-number v-model="form.cJscs" placeholder="请输入击实层数" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">最大粒径(mm)：</td>
          <td colspan="3"><el-input v-model="form.cBlj" placeholder="请输入最大粒径" style="width: 200px" /></td>
          <td class="td_right">击实方法：</td>
          <td colspan="3"><el-input v-model="form.jsmethod" placeholder="击实方法" style="width: 200px" /></td>
          <td class="td_right">代表批量：</td>
          <td colspan="4"><el-input-number v-model="form.sampbat" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td class="td_right">每层击数：</td>
          <td colspan="3"><el-input-number v-model="form.mccount" controls-position="right" :min="1" style="width: 200px" /></td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>

        <tr>
          <td colspan="13">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th class="th_center">试样次数</th>
                  <th class="th_center" colspan="2">1</th>
                  <th class="th_center" colspan="2">2</th>
                  <th class="th_center" colspan="2">3</th>
                  <th class="th_center" colspan="2">4</th>
                  <th class="th_center" colspan="2">5</th>
                  <th class="th_center" colspan="2">6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td_center"><el-link disabled>筒+土质量(g)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.csm1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.csm2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.csm3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.csm4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.csm5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.csm6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>筒质量(g)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cm1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cm2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cm3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cm4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cm5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cm6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>湿土质量(g)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wsm1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wsm2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wsm3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wsm4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wsm5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wsm6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>湿密度(g/cm³)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wd1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wd2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wd3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wd4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wd5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.wd6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>盒号</el-link></td>
                  <td class="td_center"><el-input v-model="form.symbol11" /></td>
                  <td class="td_center"><el-input v-model="form.symbol12" /></td>
                  <td class="td_center"><el-input v-model="form.symbol21" /></td>
                  <td class="td_center"><el-input v-model="form.symbol22" /></td>
                  <td class="td_center"><el-input v-model="form.symbol31" /></td>
                  <td class="td_center"><el-input v-model="form.symbol32" /></td>
                  <td class="td_center"><el-input v-model="form.symbol41" /></td>
                  <td class="td_center"><el-input v-model="form.symbol42" /></td>
                  <td class="td_center"><el-input v-model="form.symbol51" /></td>
                  <td class="td_center"><el-input v-model="form.symbol52" /></td>
                  <td class="td_center"><el-input v-model="form.symbol61" /></td>
                  <td class="td_center"><el-input v-model="form.symbol62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>盒质量(g)</el-link></td>
                  <td class="td_center"><el-input v-model="form.boxm11" /></td>
                  <td class="td_center"><el-input v-model="form.boxm12" /></td>
                  <td class="td_center"><el-input v-model="form.boxm21" /></td>
                  <td class="td_center"><el-input v-model="form.boxm22" /></td>
                  <td class="td_center"><el-input v-model="form.boxm31" /></td>
                  <td class="td_center"><el-input v-model="form.boxm32" /></td>
                  <td class="td_center"><el-input v-model="form.boxm41" /></td>
                  <td class="td_center"><el-input v-model="form.boxm42" /></td>
                  <td class="td_center"><el-input v-model="form.boxm51" /></td>
                  <td class="td_center"><el-input v-model="form.boxm52" /></td>
                  <td class="td_center"><el-input v-model="form.boxm61" /></td>
                  <td class="td_center"><el-input v-model="form.boxm62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>盒+湿土质量(g)</el-link></td>
                  <td class="td_center"><el-input v-model="form.boxwm11" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm12" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm21" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm22" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm31" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm32" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm41" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm42" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm51" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm52" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm61" /></td>
                  <td class="td_center"><el-input v-model="form.boxwm62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>盒+干土质量(g)</el-link></td>
                  <td class="td_center"><el-input v-model="form.boxdm11" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm12" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm21" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm22" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm31" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm32" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm41" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm42" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm51" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm52" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm61" /></td>
                  <td class="td_center"><el-input v-model="form.boxdm62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>水质量(g)</el-link></td>
                  <td class="td_center"><el-input v-model="form.waterm11" /></td>
                  <td class="td_center"><el-input v-model="form.waterm12" /></td>
                  <td class="td_center"><el-input v-model="form.waterm21" /></td>
                  <td class="td_center"><el-input v-model="form.waterm22" /></td>
                  <td class="td_center"><el-input v-model="form.waterm31" /></td>
                  <td class="td_center"><el-input v-model="form.waterm32" /></td>
                  <td class="td_center"><el-input v-model="form.waterm41" /></td>
                  <td class="td_center"><el-input v-model="form.waterm42" /></td>
                  <td class="td_center"><el-input v-model="form.waterm51" /></td>
                  <td class="td_center"><el-input v-model="form.waterm51" /></td>
                  <td class="td_center"><el-input v-model="form.waterm61" /></td>
                  <td class="td_center"><el-input v-model="form.waterm62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>干土质量(g)</el-link></td>
                  <td class="td_center"><el-input v-model="form.dwm11" /></td>
                  <td class="td_center"><el-input v-model="form.dwm12" /></td>
                  <td class="td_center"><el-input v-model="form.dwm21" /></td>
                  <td class="td_center"><el-input v-model="form.dwm22" /></td>
                  <td class="td_center"><el-input v-model="form.dwm31" /></td>
                  <td class="td_center"><el-input v-model="form.dwm32" /></td>
                  <td class="td_center"><el-input v-model="form.dwm41" /></td>
                  <td class="td_center"><el-input v-model="form.dwm41" /></td>
                  <td class="td_center"><el-input v-model="form.dwm51" /></td>
                  <td class="td_center"><el-input v-model="form.dwm52" /></td>
                  <td class="td_center"><el-input v-model="form.dwm61" /></td>
                  <td class="td_center"><el-input v-model="form.dwm62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>含水率(%)</el-link></td>
                  <td class="td_center"><el-input v-model="form.waterp11" /></td>
                  <td class="td_center"><el-input v-model="form.waterp12" /></td>
                  <td class="td_center"><el-input v-model="form.waterp21" /></td>
                  <td class="td_center"><el-input v-model="form.waterp22" /></td>
                  <td class="td_center"><el-input v-model="form.waterp31" /></td>
                  <td class="td_center"><el-input v-model="form.waterp32" /></td>
                  <td class="td_center"><el-input v-model="form.waterp41" /></td>
                  <td class="td_center"><el-input v-model="form.waterp42" /></td>
                  <td class="td_center"><el-input v-model="form.waterp51" /></td>
                  <td class="td_center"><el-input v-model="form.waterp52" /></td>
                  <td class="td_center"><el-input v-model="form.waterp61" /></td>
                  <td class="td_center"><el-input v-model="form.waterp62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均含水率(%)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.waterpa1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.waterpa2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.waterpa3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.waterpa4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.waterpa5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.waterpa6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>干密度(g/cm³)</el-link></td>
                  <td class="td_center"><el-input v-model="form.dda11" /></td>
                  <td class="td_center"><el-input v-model="form.dda12" /></td>
                  <td class="td_center"><el-input v-model="form.dda21" /></td>
                  <td class="td_center"><el-input v-model="form.dda22" /></td>
                  <td class="td_center"><el-input v-model="form.dda31" /></td>
                  <td class="td_center"><el-input v-model="form.dda32" /></td>
                  <td class="td_center"><el-input v-model="form.dda41" /></td>
                  <td class="td_center"><el-input v-model="form.dda42" /></td>
                  <td class="td_center"><el-input v-model="form.dda51" /></td>
                  <td class="td_center"><el-input v-model="form.dda52" /></td>
                  <td class="td_center"><el-input v-model="form.dda61" /></td>
                  <td class="td_center"><el-input v-model="form.dda62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>平均干密度(g/cm³)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.dd1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.dd2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.dd3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.dd4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.dd5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.dd6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>超高(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.cg11" /></td>
                  <td class="td_center"><el-input v-model="form.cg12" /></td>
                  <td class="td_center"><el-input v-model="form.cg21" /></td>
                  <td class="td_center"><el-input v-model="form.cg22" /></td>
                  <td class="td_center"><el-input v-model="form.cg31" /></td>
                  <td class="td_center"><el-input v-model="form.cg32" /></td>
                  <td class="td_center"><el-input v-model="form.cg41" /></td>
                  <td class="td_center"><el-input v-model="form.cg42" /></td>
                  <td class="td_center"><el-input v-model="form.cg51" /></td>
                  <td class="td_center"><el-input v-model="form.cg52" /></td>
                  <td class="td_center"><el-input v-model="form.cg61" /></td>
                  <td class="td_center"><el-input v-model="form.cg62" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>超高(mm)</el-link></td>
                  <td class="td_center"><el-input v-model="form.cg13" /></td>
                  <td class="td_center"><el-input v-model="form.cg14" /></td>
                  <td class="td_center"><el-input v-model="form.cg23" /></td>
                  <td class="td_center"><el-input v-model="form.cg24" /></td>
                  <td class="td_center"><el-input v-model="form.cg33" /></td>
                  <td class="td_center"><el-input v-model="form.cg34" /></td>
                  <td class="td_center"><el-input v-model="form.cg43" /></td>
                  <td class="td_center"><el-input v-model="form.cg44" /></td>
                  <td class="td_center"><el-input v-model="form.cg53" /></td>
                  <td class="td_center"><el-input v-model="form.cg54" /></td>
                  <td class="td_center"><el-input v-model="form.cg63" /></td>
                  <td class="td_center"><el-input v-model="form.cg64" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>超高平均值(mm)</el-link></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cgavg1" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cgavg2" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cgavg3" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cgavg4" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cgavg5" /></td>
                  <td class="td_center" colspan="2"><el-input v-model="form.cgavg6" /></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>最佳含水量</el-link></td>
                  <td class="td_center" colspan="3"><el-input v-model="form.finewp" /></td>
                  <td class="td_center"><el-link disabled>校正后最佳含水率</el-link></td>
                  <td class="td_center" colspan="3"><el-input v-model="form.rfinewp" /></td>
                  <td class="td_center"><el-link disabled>控制最小干密度</el-link></td>
                  <td class="td_center" colspan="4"><el-link disabled>显示干密度与含水量的关系曲线</el-link></td>
                </tr>
                <tr>
                  <td class="td_center"><el-link disabled>最大干密度</el-link></td>
                  <td class="td_center" colspan="3"><el-input v-model="form.maxdd" /></td>
                  <td class="td_center"><el-link disabled>校正后最大干密度</el-link></td>
                  <td class="td_center" colspan="3"><el-input v-model="form.rmaxdd" /></td>
                  <td class="td_center"><el-input v-model="form.minmd" /></td>
                  <td class="td_center" colspan="4"><el-link disabled>显示干密度与含水量的关系曲线</el-link></td>
                </tr>
              </tbody>
              <tr>
                <td class="td_right">结论：</td>
                <td colspan="13"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td class="td_right">结论状态：</td>
                <td colspan="13">
                  <el-select v-model="form.conclusioncode" placeholder="请选择结论状态" style="width: 200px">
                    <el-option v-for="item in lspdOptions" :key="item.value" :label="item.name" :value="item.value" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">备注：</td>
                <td colspan="13"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td class="td_right">设备编号：</td>
                <td colspan="3"><el-input v-model="form.instrumentnum" /></td>
                <td class="td_right">所用检测设备使用前状态：</td>
                <td colspan="9"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td class="td_right">设备名称：</td>
                <td colspan="3"><el-input v-model="form.instrumentname" /></td>
                <td class="td_right">所用检测设备使用后状态：</td>
                <td colspan="9"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td class="td_right">试验环境：</td>
                <td colspan="3"><el-input v-model="form.checkenvironment" /></td>
                <td class="td_right">温度℃：</td>
                <td colspan="3"><el-input v-model="form.temperature" /></td>
                <td class="td_right">湿度%：</td>
                <td colspan="4"><el-input v-model="form.humidity" /></td>
              </tr>
              <tr>
                <td class="td_right">检测标准：</td>
                <td colspan="13"><el-input v-model="form.standname" /></td>
              </tr>
              <tr>
                <td class="td_right">评定标准：</td>
                <td colspan="13"><el-input v-model="form.pdstandardname" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td class="td_right">复核人：</td>
          <td colspan="2">{{ form.collateman }}</td>
          <td class="td_right">复核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.collatedate" placeholder="选择复核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">主检：</td>
          <td colspan="2">{{ form.firstcheckman }}</td>
          <td class="td_right">复检：</td>
          <td colspan="3">{{ form.secondcheckman }}</td>
        </tr>
        <tr>
          <td class="td_right">实测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.factcheckdate" placeholder="选择实测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测日期：</td>
          <td colspan="2"><el-date-picker v-model="form.checkdate" placeholder="选择检测日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">校核员：</td>
          <td colspan="2">{{ form.verifyman }}</td>
          <td class="td_right">校核日期：</td>
          <td colspan="3"><el-date-picker v-model="form.verifydate" placeholder="选择校核日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">审核人：</td>
          <td colspan="2">{{ form.auditingman }}</td>
          <td class="td_right">审核日期：</td>
          <td colspan="2"><el-date-picker v-model="form.auditingdate" placeholder="选择审核日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">批准人：</td>
          <td colspan="2">{{ form.approveman }}</td>
          <td class="td_right">批准日期：</td>
          <td colspan="3"><el-date-picker v-model="form.approvedate" placeholder="选择批准日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">打印员：</td>
          <td colspan="2">{{ form.printman }}</td>
          <td class="td_right">打印日期：</td>
          <td colspan="2"><el-date-picker v-model="form.printdate" placeholder="选择打印日期" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">发放人：</td>
          <td colspan="2">{{ form.extendman }}</td>
          <td class="td_right">发放日期：</td>
          <td colspan="3"><el-date-picker v-model="form.extenddate" placeholder="选择发放日期" type="date" value-format="yyyy-MM-dd" /></td>
        </tr>
        <tr>
          <td class="td_right">收样人：</td>
          <td colspan="3">{{ form.geid }}</td>
          <td class="td_right">收样时间：</td>
          <td colspan="3"><el-date-picker v-model="form.getdate" placeholder="选择收样时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">收样地点：</td>
          <td colspan="4"><el-input v-model="form.getadd" /></td>
        </tr>
        <tr>
          <td class="td_right">检测人：</td>
          <td colspan="3">{{ form.chkid }}</td>
          <td class="td_right">检测时间：</td>
          <td colspan="3"><el-date-picker v-model="form.chkdate" placeholder="选择检测时间" type="date" value-format="yyyy-MM-dd" /></td>
          <td class="td_right">检测地点：</td>
          <td colspan="4"><el-input v-model="form.chkadd" /></td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #d9b7c6; color: #fff">附加信息</td>
        </tr>
        <tr>
          <td class="td_right">体积比：</td>
          <td colspan="3"><el-input v-model="form.recadd" /></td>
          <td class="td_right">取样地点：</td>
          <td colspan="3"><el-input v-model="form.recadd" /></td>
          <td class="td_right">供土单位：</td>
          <td colspan="4"><el-input v-model="form.bcFuc" /></td>
        </tr>
        <tr>
          <td colspan="13" style="text-align: right">
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
    name: 'Em325CheckForm',
    data() {
      return {
        hjxsOptions: [],
        gcIdOptions: [],
        cTrlbOptions: [],
        sampleStatusOptions: [],
        cJslxOptions: [],
        form: { sampnum: '' },
        checked1: true,
        checked2: true,
        checked3: true,
        entkey: '',
        checkinfo: {},
        pathType: '325',
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
        listDictItemByCode('C_TRLB').then((response) => {
          this.cTrlbOptions = response.data
        })
        listDictItemByCode('C_JSF').then((response) => {
          this.cJslxOptions = response.data
        })
        listDictItemByCode('CONCLUSIONCODE').then((response) => {
          this.lspdOptions = response.data
        })
        const libParas = { libnum: 'SOIL' }
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
