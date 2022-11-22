<template>
  <div class="scan-container">
    <el-row :gutter="20">
      <el-col :lg="{ span: 12, offset: 6 }" :md="{ span: 20, offset: 2 }" :sm="{ span: 20, offset: 2 }" :xl="{ span: 12, offset: 6 }" :xs="24">
        <el-alert :closable="false">
          <h3>记录取样样品</h3>
          <h3>样品取样</h3>
          <!-- <p>微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。</p> -->
        </el-alert>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="{ span: 12, offset: 6 }" :md="{ span: 20, offset: 2 }" :sm="{ span: 20, offset: 2 }" :xl="{ span: 12, offset: 6 }" :xs="24">
        <el-form ref="form" :model="form">
          <el-form-item prop="qrcode">
            <el-input
              ref="qrcode"
              v-model="form.qrcode"
              v-focus
              class="input-item"
              enable="enable"
              placeholder="请扫码"
              prefix-icon="el-icon-search"
              type="password"
              @blur="handleInputBlur"
              @keyup.enter.native="openTrustOrder"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { scanQrByOpr } from '@/api/entrust/entrust'
  export default {
    name: 'ScanGet',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      return { form: { qrcode: '' } }
    },
    methods: {
      openTrustOrder() {
        const Loading = this.$baseLoading(5)
        let qrcodevalue = this.form.qrcode
        this.form.qrcode = ''
        const qrArr = qrcodevalue.split('##')
        if (qrArr.length < 4) {
          this.$notify.error('参数无效')
          Loading.close()
          return
        }
        scanQrByOpr(qrcodevalue, 'get').then(
          (res) => {
            // console.log(JSON.stringify(res))
            this.$notify.success('取样扫码成功' + res.msg)
            Loading.close()
          },
          (err) => {
            this.$notify.error(err)
            Loading.close()
          }
        )
      },
      handleInputBlur() {
        this.$refs.qrcode.focus()
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep .input-item .el-input__inner {
    -web-kit-appearance: none;
    -moz-appearance: none;
    font-size: 1.4em;
    height: 2.9em;
    border-radius: 4px;
    border: 1px solid #b6d8f1;
    // color: #6a6f77;
    color: black;
    outline: 0;
  }
</style>
