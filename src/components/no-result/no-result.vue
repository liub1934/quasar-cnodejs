<template>
  <div class="no-result">
    <div class="no-result row justify-center">
      <q-icon class="iconfont"
        name="icon-no-result"
        size="30px"></q-icon>
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
<style lang="stylus">
.no-result
  color: #CCCCCC
  line-height: 30px
  padding: 10px 0
</style>
