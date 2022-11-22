<template>
  <div class="detail-container">
    <el-descriptions border :column="3">
      <el-descriptions-item>
        <template slot="label">操作模块</template>
        {{ infoData.operModul }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">操作类型</template>
        {{ infoData.operType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">操作描述</template>
        {{ infoData.operDesc }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">操作员名称</template>
        {{ infoData.operName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">操作方法</template>
        {{ infoData.operMethod }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">请求URI</template>
        {{ infoData.operUri }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">请求IP</template>
        {{ infoData.operIp }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">操作时间</template>
        {{ infoData.operCrtTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">操作系统</template>
        {{ infoData.operSysOs }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">浏览器版本</template>
        {{ infoData.operExploOs }}
      </el-descriptions-item>
    </el-descriptions>

    <vab-json-viewer boxed copyable :expand-depth="5" sort :value="req" />
    <vab-json-viewer boxed copyable :expand-depth="5" sort :value="rsp" />
  </div>
</template>

<script>
  import VabJsonViewer from 'vue-json-viewer'

  export default {
    name: 'LogDetail',
    components: { VabJsonViewer },
    props: {
      infoData: {
        type: Object,
        default: () => {
          return {}
        },
      },
      rsp: {
        type: Object,
        default: () => {
          return {}
        },
      },
      req: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    data() {
      return {
        operRequParam: { query: { title: '加载中' } },
        operRespParam: { query: { title: '加载中' } },
      }
    },
    // watch: {
    //   infoData: {
    //     deep: true, // 深度监听
    //     handler(newVal, oldVal) {
    //       console.log(newVal, oldVal)
    //     },
    //   },
    // },
    created() {},
    methods: {},
  }
</script>
