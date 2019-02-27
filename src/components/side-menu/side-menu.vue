/*
 * FileName: side-menu.vue
 * Remark: 侧栏菜单
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Tuesday, 19th February 2019 3:27:12 pm
 * Last Modified: Tuesday, 26th February 2019 11:04:28 am
 * Modified By: LiuBing
 */

<template>
  <q-list class="side-menu"
    no-border
    link
    inset-delimiter
    :highlight="false">
    <q-item v-for="(menu, index) in menus"
      :key="index"
      @click.native="handleClick(menu)">
      <q-item-side>
        <q-icon class="iconfont"
          :name="menu.icon">
        </q-icon>
      </q-item-side>
      <q-item-main :label="menu.label"></q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import { menus } from 'src/assets/js/static.js'
export default {
  data() {
    return {
      menus: menus
    }
  },
  methods: {
    handleClick(menu) {
      this.$router.push(`/list?tab=${menu.value}`)
    }
  }
}
</script>
