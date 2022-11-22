<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" label-width="100px" :model="form" size="small">
      <table style="width: 90%">
        <tr>
          <td colspan="8" style="background-color: #2b508a; color: #fff">委托项目-混凝土抗水渗透性能</td>
        </tr>
        <tr>
          <td><el-checkbox v-model="checkitem1" disabled>混凝土抗水渗透强度</el-checkbox></td>
          <td colspan="7" style="text-align: right">
            <!-- <el-checkbox v-model="checked3" disabled>系统自动检下结论</el-checkbox> -->
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
                <td class="td_right">委托日期：</td>
                <td>
                  <el-date-picker v-model="form.entdate" placeholder="选择委托日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td class="td_right">样品状态：</td>
                <td colspan="3">
                  <el-select v-model="form.sampstatus" placeholder="请选择样品状态" style="width: 150px">
                    <el-option v-for="item in sampleStatusOptions" :key="item.name" :label="item.name" :value="item.name" />
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="td_right">报告承诺天数：</td>
                <td><el-input v-model="form.repcondays" placeholder="请输入报告承诺天数" style="width: 150px" /></td>
                <td class="td_right">承诺到期日期：</td>
                <td>
                  <el-date-picker v-model="form.repcondate" placeholder="选择承诺到期日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td class="td_right">强度等级C：</td>
                <td colspan="3">
                  <el-input v-model="form.qddjc" placeholder="请输入强度等级C" style="width: 150px" />
                </td>
              </tr>
              <tr>
                <td class="td_right">检验类别：</td>
                <td><el-input v-model="form.checktype" placeholder="请输入检验类别" style="width: 150px" /></td>
                <td class="td_right">抗渗等级：</td>
                <td>
                  <el-input v-model="form.ksdj" placeholder="P:请输入抗渗等级" style="width: 150px" />
                </td>
                <td class="td_right">成型日期：</td>
                <td colspan="3"><el-date-picker v-model="form.modeldate" placeholder="选择成型日期" style="width: 150px" type="date" value-format="yyyy-MM-dd" /></td>
              </tr>
              <tr>
                <td class="td_right">结构部位：</td>
                <td colspan="3"><el-input v-model="form.structpart" placeholder="请输入结构部位" style="width: 350px" /></td>
                <td class="td_right">检验批号：</td>
                <td colspan="3"><el-input v-model="form.jyph" placeholder="请输入检验批号" style="width: 150px" /></td>
              </tr>
              <tr>
                <td class="td_right">配合比编号：</td>
                <td><el-input v-model="form.phbbh" placeholder="请输入配合比编号" style="width: 150px" /></td>
                <td class="td_right">样品数量：</td>
                <td><el-input v-model="form.sampmout" placeholder="请输入样品数量" style="width: 150px" /></td>
                <td class="td_right">养护条件：</td>
                <td colspan="3"><el-input-number v-model="form.yhtj" controls-position="right" :min="0" style="width: 150px" /></td>
              </tr>
              <tr>
                <td class="td_right">配合比：</td>
                <td><el-input v-model="form.phb" placeholder="请输入配合比" style="width: 150px" /></td>
                <td class="td_right">样品尺寸：</td>
                <td><el-input v-model="form.ypcc" placeholder="请输入样品尺寸" style="width: 150px" /></td>
                <td class="td_right">水灰比：</td>
                <td colspan="3"><el-input v-model="form.shb" placeholder="请输入水灰比" style="width: 150px" /></td>
              </tr>
              <tr>
                <td class="td_right">生产厂家：</td>
                <td colspan="3"><el-input v-model="form.unitnum" placeholder="请输入生产厂家" style="width: 350px" /></td>
                <td class="td_right">代表批量：</td>
                <td colspan="3"><el-input v-model="form.deputybat" placeholder="请输入代表批量" style="width: 150px" /></td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="8" style="background-color: #d8c14d; color: #fff">检测信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
              <tr>
                <td></td>
                <td colspan="2">开始加压时间</td>
                <td colspan="4">X</td>
                <td width="72"></td>
                <td width="72">终止加压</td>
                <td colspan="3">X</td>
              </tr>
              <tr>
                <td class="td_center" rowspan="2">序号</td>
                <td class="td_center" rowspan="2">日期</td>
                <td class="td_center" rowspan="2">时间(hh:mm)</td>
                <td class="td_center" rowspan="2">压力(Mpa)</td>
                <td class="td_center" colspan="6">涉水编号及渗水情况</td>
                <td class="td_center" rowspan="2">观察人</td>
              </tr>
              <tr>
                <td class="td_center">试件1</td>
                <td class="td_center">试件2</td>
                <td class="td_center">试件3</td>
                <td class="td_center">试件4</td>
                <td class="td_center">试件5</td>
                <td class="td_center">试件6</td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <el-date-picker v-model="form.date1" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time1"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 90px"
                  />
                </td>
                <td><el-input v-model="form.mpa1" style="width: 50px" /></td>
                <td><el-input v-model="form.s111" style="width: 50px" /></td>
                <td><el-input v-model="form.s211" style="width: 50px" /></td>
                <td><el-input v-model="form.s311" style="width: 50px" /></td>
                <td><el-input v-model="form.s411" style="width: 50px" /></td>
                <td><el-input v-model="form.s511" style="width: 50px" /></td>
                <td><el-input v-model="form.s611" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman1" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <el-date-picker v-model="form.date2" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time2"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 90px"
                  />
                </td>
                <td><el-input v-model="form.mpa2" style="width: 50px" /></td>
                <td><el-input v-model="form.s112" style="width: 50px" /></td>
                <td><el-input v-model="form.s212" style="width: 50px" /></td>
                <td><el-input v-model="form.s312" style="width: 50px" /></td>
                <td><el-input v-model="form.s412" style="width: 50px" /></td>
                <td><el-input v-model="form.s512" style="width: 50px" /></td>
                <td><el-input v-model="form.s612" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman2" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <el-date-picker v-model="form.date3" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time3"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 90px"
                  />
                </td>
                <td><el-input v-model="form.mpa3" style="width: 50px" /></td>
                <td><el-input v-model="form.s113" style="width: 50px" /></td>
                <td><el-input v-model="form.s213" style="width: 50px" /></td>
                <td><el-input v-model="form.s313" style="width: 50px" /></td>
                <td><el-input v-model="form.s413" style="width: 50px" /></td>
                <td><el-input v-model="form.s513" style="width: 50px" /></td>
                <td><el-input v-model="form.s613" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman3" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <el-date-picker v-model="form.date4" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time4"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 90px"
                  />
                </td>
                <td><el-input v-model="form.mpa4" style="width: 50px" /></td>
                <td><el-input v-model="form.s114" style="width: 50px" /></td>
                <td><el-input v-model="form.s214" style="width: 50px" /></td>
                <td><el-input v-model="form.s314" style="width: 50px" /></td>
                <td><el-input v-model="form.s414" style="width: 50px" /></td>
                <td><el-input v-model="form.s514" style="width: 50px" /></td>
                <td><el-input v-model="form.s614" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman4" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <el-date-picker v-model="form.date5" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time5"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 90px"
                  />
                </td>
                <td><el-input v-model="form.mpa5" style="width: 50px" /></td>
                <td><el-input v-model="form.s115" style="width: 50px" /></td>
                <td><el-input v-model="form.s215" style="width: 50px" /></td>
                <td><el-input v-model="form.s315" style="width: 50px" /></td>
                <td><el-input v-model="form.s415" style="width: 50px" /></td>
                <td><el-input v-model="form.s515" style="width: 50px" /></td>
                <td><el-input v-model="form.s615" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman5" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  <el-date-picker v-model="form.date6" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time6"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa6" style="width: 50px" /></td>
                <td><el-input v-model="form.s116" style="width: 50px" /></td>
                <td><el-input v-model="form.s216" style="width: 50px" /></td>
                <td><el-input v-model="form.s316" style="width: 50px" /></td>
                <td><el-input v-model="form.s416" style="width: 50px" /></td>
                <td><el-input v-model="form.s516" style="width: 50px" /></td>
                <td><el-input v-model="form.s616" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman6" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>7</td>
                <td>
                  <el-date-picker v-model="form.date7" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time7"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa7" style="width: 50px" /></td>
                <td><el-input v-model="form.s117" style="width: 50px" /></td>
                <td><el-input v-model="form.s217" style="width: 50px" /></td>
                <td><el-input v-model="form.s317" style="width: 50px" /></td>
                <td><el-input v-model="form.s417" style="width: 50px" /></td>
                <td><el-input v-model="form.s517" style="width: 50px" /></td>
                <td><el-input v-model="form.s617" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman7" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>8</td>
                <td>
                  <el-date-picker v-model="form.date8" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time8"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa8" style="width: 50px" /></td>
                <td><el-input v-model="form.s118" style="width: 50px" /></td>
                <td><el-input v-model="form.s218" style="width: 50px" /></td>
                <td><el-input v-model="form.s318" style="width: 50px" /></td>
                <td><el-input v-model="form.s418" style="width: 50px" /></td>
                <td><el-input v-model="form.s518" style="width: 50px" /></td>
                <td><el-input v-model="form.s618" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman8" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>9</td>
                <td>
                  <el-date-picker v-model="form.date9" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time9"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa9" style="width: 50px" /></td>
                <td><el-input v-model="form.s119" style="width: 50px" /></td>
                <td><el-input v-model="form.s219" style="width: 50px" /></td>
                <td><el-input v-model="form.s319" style="width: 50px" /></td>
                <td><el-input v-model="form.s419" style="width: 50px" /></td>
                <td><el-input v-model="form.s519" style="width: 50px" /></td>
                <td><el-input v-model="form.s619" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman9" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>10</td>
                <td>
                  <el-date-picker v-model="form.date10" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time10"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa10" style="width: 50px" /></td>
                <td><el-input v-model="form.s120" style="width: 50px" /></td>
                <td><el-input v-model="form.s220" style="width: 50px" /></td>
                <td><el-input v-model="form.s320" style="width: 50px" /></td>
                <td><el-input v-model="form.s420" style="width: 50px" /></td>
                <td><el-input v-model="form.s520" style="width: 50px" /></td>
                <td><el-input v-model="form.s620" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman10" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  <el-date-picker v-model="form.date11" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time11"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa11" style="width: 50px" /></td>
                <td><el-input v-model="form.s121" style="width: 50px" /></td>
                <td><el-input v-model="form.s221" style="width: 50px" /></td>
                <td><el-input v-model="form.s321" style="width: 50px" /></td>
                <td><el-input v-model="form.s421" style="width: 50px" /></td>
                <td><el-input v-model="form.s521" style="width: 50px" /></td>
                <td><el-input v-model="form.s621" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman11" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>12</td>
                <td>
                  <el-date-picker v-model="form.date12" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time12"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa12" style="width: 50px" /></td>
                <td><el-input v-model="form.s122" style="width: 50px" /></td>
                <td><el-input v-model="form.s222" style="width: 50px" /></td>
                <td><el-input v-model="form.s322" style="width: 50px" /></td>
                <td><el-input v-model="form.s422" style="width: 50px" /></td>
                <td><el-input v-model="form.s522" style="width: 50px" /></td>
                <td><el-input v-model="form.s622" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman12" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>13</td>
                <td>
                  <el-date-picker v-model="form.date13" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time13"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa13" style="width: 50px" /></td>
                <td><el-input v-model="form.s123" style="width: 50px" /></td>
                <td><el-input v-model="form.s223" style="width: 50px" /></td>
                <td><el-input v-model="form.s323" style="width: 50px" /></td>
                <td><el-input v-model="form.s423" style="width: 50px" /></td>
                <td><el-input v-model="form.s523" style="width: 50px" /></td>
                <td><el-input v-model="form.s623" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman13" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>14</td>
                <td>
                  <el-date-picker v-model="form.date14" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time14"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa14" style="width: 50px" /></td>
                <td><el-input v-model="form.s124" style="width: 50px" /></td>
                <td><el-input v-model="form.s224" style="width: 50px" /></td>
                <td><el-input v-model="form.s324" style="width: 50px" /></td>
                <td><el-input v-model="form.s424" style="width: 50px" /></td>
                <td><el-input v-model="form.s524" style="width: 50px" /></td>
                <td><el-input v-model="form.s624" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman14" style="width: 80px" /></td>
              </tr>
              <tr>
                <td>15</td>
                <td>
                  <el-date-picker v-model="form.date15" placeholder="选择日期" style="width: 113px" type="date" value-format="yyyy-MM-dd" />
                </td>
                <td>
                  <el-time-select
                    v-model="form.time15"
                    :picker-options="{
                      start: '08:30',
                      end: '20:30',
                    }"
                    placeholder="时间"
                    style="margin-right: 10px; width: 100px"
                  />
                </td>
                <td><el-input v-model="form.mpa15" style="width: 50px" /></td>
                <td><el-input v-model="form.s125" style="width: 50px" /></td>
                <td><el-input v-model="form.s225" style="width: 50px" /></td>
                <td><el-input v-model="form.s325" style="width: 50px" /></td>
                <td><el-input v-model="form.s425" style="width: 50px" /></td>
                <td><el-input v-model="form.s525" style="width: 50px" /></td>
                <td><el-input v-model="form.s625" style="width: 50px" /></td>
                <td style="text-align: center"><el-input v-model="form.viewman15" style="width: 80px" /></td>
              </tr>
              <tr>
                <td colspan="4">
                  <span style="float: right">渗水结果</span>
                </td>
                <td><el-input v-model="form.ssjg1" style="width: 50px" /></td>
                <td><el-input v-model="form.ssjg2" style="width: 50px" /></td>
                <td><el-input v-model="form.ssjg3" style="width: 50px" /></td>
                <td><el-input v-model="form.ssjg4" style="width: 50px" /></td>
                <td><el-input v-model="form.ssjg5" style="width: 50px" /></td>
                <td><el-input v-model="form.ssjg6" style="width: 50px" /></td>
                <td>平均值</td>
              </tr>
              <tr>
                <td colspan="4">
                  <span style="float: right">渗水高度(mm)</span>
                </td>
                <td><el-input v-model="form.gao1" style="width: 50px" /></td>
                <td><el-input v-model="form.gao2" style="width: 50px" /></td>
                <td><el-input v-model="form.gao3" style="width: 50px" /></td>
                <td><el-input v-model="form.gao4" style="width: 50px" /></td>
                <td><el-input v-model="form.gao5" style="width: 50px" /></td>
                <td><el-input v-model="form.gao6" style="width: 50px" /></td>
                <td>无</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: center">
                  <span style="float: right">最终水压(Mpa)</span>
                </td>
                <td><el-input v-model="form.sssy1" style="width: 50px" /></td>
                <td><el-input v-model="form.sssy2" style="width: 50px" /></td>
                <td><el-input v-model="form.sssy3" style="width: 50px" /></td>
                <td><el-input v-model="form.sssy4" style="width: 50px" /></td>
                <td><el-input v-model="form.sssy5" style="width: 50px" /></td>
                <td><el-input v-model="form.sssy6" style="width: 50px" /></td>
                <td>无</td>
              </tr>
              <tr>
                <td colspan="2">
                  <span style="float: right">渗水个数</span>
                </td>
                <td>X</td>
                <td>最终水压(Mpa)</td>
                <td>X</td>
                <td colspan="2"><span style="float: right">实测抗渗等级</span></td>
                <td colspan="2">X</td>
                <td><span style="float: right">龄期</span></td>
                <td><el-input v-model="form.lingqi" style="width: 50px" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">结论</span></td>
                <td colspan="9"><el-input v-model="form.checkconclusion" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">结论状态</span></td>
                <td colspan="9"><el-input v-model="form.name" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">备注</span></td>
                <td colspan="9"><el-input v-model="form.expl" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">设备编号</span></td>
                <td colspan="4"><el-input v-model="form.instrumentnum" /></td>
                <td colspan="3">
                  <span style="float: right">所用检测设备使用前状态</span>
                </td>
                <td colspan="2"><el-input v-model="form.beforestatus" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">设备名称</span></td>
                <td colspan="4"><el-input v-model="form.instrumentname" /></td>
                <td colspan="3">
                  <span style="float: right">所用检测设备使用后状态</span>
                </td>
                <td colspan="2"><el-input v-model="form.afterstatus" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">实验环境</span></td>
                <td colspan="4"><el-input v-model="form.checkenvironment" /></td>
                <td></td>
                <td><span style="float: right">温度</span></td>
                <td><el-input v-model="form.temperature" /></td>
                <td><span style="float: right">湿度</span></td>
                <td><el-input v-model="form.humidity" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">检测标准</span></td>
                <td colspan="9"><el-input v-model="form.standname" /></td>
              </tr>
              <tr>
                <td colspan="2"><span style="float: right">评定标准</span></td>
                <td colspan="9"><el-input v-model="form.pdstandardname" /></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #8763d4; color: #fff">人员及日期信息</td>
        </tr>
        <tr>
          <td colspan="8">
            <table style="width: 100%">
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
          <td colspan="8">
            <table width="100%">
              <tr>
                <td style="width: 100px">取样地点：</td>
                <td><el-input v-model="form.recadd" /></td>
              </tr>
            </table>
          </td>
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
    name: 'Em306CheckForm',
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
        pathType: '306',
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
    // width: 140px;
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
