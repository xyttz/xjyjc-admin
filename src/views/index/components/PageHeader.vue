<template>
  <el-col v-loading="loading" :span="24">
    <el-card class="page-header" shadow="never">
      <el-avatar class="page-header-avatar" :src="avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ tips }}
        </p>
        <p class="page-header-tip-description" v-html="description"></p>
      </div>
      <!-- <div class="page-header-avatar-list">
        <time-clock />
      </div> -->
    </el-card>
  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getUpgradeInfos, getPhraseWord } from '@/api/common/index'
  // import VabAvatarList from '@/extra/VabAvatarList'
  // import TimeClock from './TimeClock'
  export default {
    // components: { TimeClock },
    data() {
      return {
        loading: true,
        tips: '',
        description: '',
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    created() {
      this.fetchData()
      this.handleTips()
    },
    methods: {
      async handleTips() {
        getPhraseWord().then((response) => {
          const phraseStr = response.data
          const hour = new Date().getHours()
          this.tips =
            hour >= 6 && hour < 9
              ? `早上好 ${this.username}，` + phraseStr + ``
              : hour >= 9 && hour < 12
              ? `上午好 ${this.username}，` + phraseStr + ``
              : hour >= 12 && hour < 14
              ? `中午好 ${this.username}，` + phraseStr + ``
              : hour >= 14 && hour < 19
              ? `下午好 ${this.username}，` + phraseStr + ``
              : hour >= 19 && hour < 24
              ? `晚上好 ${this.username}，` + phraseStr + ``
              : `深夜好 ${this.username}，` + phraseStr + ``
          this.loading = false
        })
      },
      async fetchData() {
        getUpgradeInfos().then((response) => {
          const description = response.data
          this.description = description
        })
        // const {
        //   data: { description },
        // } = await getUpgradeInfos()
        // this.description = description
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page-header {
    min-height: 125px;
    transition: none;

    ::v-deep {
      * {
        transition: none;
      }

      .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    &-avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
    }

    &-tip {
      flex: auto;
      width: calc(100% - 200px);
      min-width: 200px;

      &-title {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }

      &-description {
        min-height: 20px;
        font-size: $base-font-size-default;
        color: #808695;
      }
    }

    &-avatar-list {
      flex: 1;
      min-width: 100px;
      margin-left: 20px;
      text-align: right;

      p {
        margin-right: 9px;
        line-height: 0;
      }
    }
  }
</style>
