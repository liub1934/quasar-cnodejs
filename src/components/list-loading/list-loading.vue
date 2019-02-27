/*
 * FileName: list-loading.vue
 * Remark: 列表loading加载
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Tuesday, 26th February 2019 2:59:40 pm
 * Last Modified: Tuesday, 26th February 2019 3:00:07 pm
 * Modified By: LiuBing
 */

<template>
  <div class="list-loading">
    <div class="row justify-center">
      <q-spinner-dots v-if="loading"
        slot="message"
        :size="40">
      </q-spinner-dots>
      <div v-if="end"
        class="end">
        到底啦
      </div>
    </div>
    <no-result v-if="noResult"></no-result>
  </div>
</template>

<script>
import NoResult from 'src/components/no-result/no-result'
export default {
  components: {
    NoResult
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    end: {
      type: Boolean,
      default: false
    },
    noResult: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus">
.list-loading
  .end
    color: #CCCCCC
    font-size: 14px
    padding: 10px 0
</style>
