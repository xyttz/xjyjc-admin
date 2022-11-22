<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" top="52px" :visible.sync="pdfDialog" width="1000px">
    <div v-show="fileType == 'pdf'" class="pdf">
      <p class="arrow">
        <!-- <el-button @click.stop="$refs.pdf.print()">预览打印报告</el-button> -->
        <el-button type="primary" @click="downloadpdf()">
          <vab-icon icon="printer-line" />
          报告下载
        </el-button>
        <el-button type="primary" @click="printpdf()">
          <vab-icon icon="printer-line" />
          报告打印
        </el-button>
        <span style="float: right; padding-top: 5px; padding-right: 40px; font-size: 20px; color: #8c8e92; cursor: pointer" @click="close"><i class="el-icon-close"></i></span>
      </p>
      <!-- loadPdfHandler：加载事件 src：需要展示的PDF地址；currentPage：当前展示的PDF页码；pageCount=$event：PDF文件总页码；currentPage=$event：一开始加载的页面-->
      <pdf ref="pdf" :src="pdfSrc" />
    </div>
  </el-dialog>
</template>

<script>
  import pdf from 'vue-pdf-signature'
  // import CMapReaderFactory from 'vue-pdf-signature/src/CMapReaderFactory'
  // import Pdfh5 from 'pdfh5'
  // import 'pdfh5/css/pdfh5.css'

  export default {
    name: 'VuePdfComponents',
    components: { pdf },
    props: {
      src: {
        type: String,
        default: () => {
          return ''
        },
      },
      entrustnum: {
        type: String,
        default: () => {
          return ''
        },
      },
      reportname: {
        type: String,
        default: () => {
          return ''
        },
      },
    },
    data() {
      return {
        filesProps: {
          label: 'originName',
        },
        pdfDialog: false,
        fileType: 'pdf', // 文件类型
        newsrc: '',
        pdfh5: null,
        fileUrl: '',
        editHeight: '800px',
        numPages: [],
      }
    },
    // mounted() {
    //   if (this.src) {
    //     this.newsrc = pdf.createLoadingTask(this.src)
    //   }
    // },
    computed: {
      pdfSrc() {
        //处理pdfUrl返回
        let src
        if (this.src) {
          console.log(this.src)
          src = pdf.createLoadingTask({
            url: this.src,
            //引入pdf.js字体，templ
            // cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.13.216/cmaps/',
            cMapUrl: '../../cnmaps/',
            // cMapUrl: 'http://121.36.58.127:9089/cmaps/',
            cMapPacked: true,
          })
        }
        return src
      },

      //省略其它
    },
    methods: {
      downloadpdf() {
        let current = new Date()
        let today =
          current.getFullYear() +
          '-' +
          (current.getMonth() + 1).toString().padStart(2, '0') +
          '-' +
          current.getDate().toString().padStart(2, '0') +
          ' ' +
          current.getHours().toString().padStart(2, '0') +
          '.' +
          current.getMinutes().toString().padStart(2, '0') +
          '.' +
          current.getSeconds().toString().padStart(2, '0')
        let fname = this.entrustnum + this.reportname + today + '.pdf' // 下载文件的名字
        // let link = document.createElement('a')
        // link.href = this.src
        // link.setAttribute('download', fname)
        // document.body.appendChild(link)
        // link.click()

        var x = new XMLHttpRequest()
        x.open('GET', this.src, true)
        x.responseType = 'blob'
        x.onload = function (e) {
          console.log(e)
          //会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
          var url = window.URL.createObjectURL(x.response)
          var a = document.createElement('a')
          a.href = url
          a.download = fname
          a.click()
        }
        x.send()
      },
      printpdf() {
        window.open(this.src)
      },
      handleOpen() {
        this.pdfDialog = true

        // this.newsrc = pdf.createLoadingTask(this.src)
        // this.newsrc = pdf.createLoadingTask({
        //   url: this.src,
        //   CMapReaderFactory,
        // })

        // axios
        //   .get(this.src, {
        //     responseType: 'arraybuffer',
        //   })
        //   .then((res) => {
        //     this.pdfh5 = new Pdfh5('#pdf', {
        //       data: res,
        //     })
        //   })
        // this.pdfh5 = new Pdfh5('#pdf', {
        //   // pdfurl: this.src,
        //   data: this.data,
        //   pageNum: false, //不显示页码
        //   backTop: false, //不显示回到顶部
        //   zoomEnable: false, //禁止缩放
        //   maxZoom: 1, //点击屏幕缩放1倍 也就是禁止缩放的
        // })
      },
      //关闭弹框
      close() {
        this.pdfDialog = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .currentPage {
    cursor: pointer;
    color: #8c8e92;
  }

  .currentPage:hover {
    color: #2761ff;
  }
  .arrow {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    width: 100%;
    background-color: #191919;
    padding: 12px 0;
    margin: 0;
    text-align: center;
  }
  >>> .el-dialog__body {
    color: #606266;
    font-size: 12px;
    padding: 0;
  }
</style>
