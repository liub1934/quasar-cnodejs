<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 头部 -->
    <q-layout-header>
      <q-toolbar>
        <q-btn flat
          dense
          round
          @click="$router.go(-1)">
          <q-icon class="iconfont"
            name="icon-arrow-left">
          </q-icon>
        </q-btn>
        <!-- 标题 -->
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <!-- 发布按钮 -->
        <q-btn flat
          dense
          round
          @click="newAdd">
          <q-icon class="iconfont"
            name="icon-submit"
            style="color: #FFFFFF">
          </q-icon>
        </q-btn>
        <!-- 显示菜单按钮 -->
        <q-btn v-if="showSideBar"
          flat
          dense
          round
          @click="drawerOpen = !drawerOpen">
          <q-icon class="iconfont"
            name="icon-menu">
          </q-icon>
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <!-- 左侧抽屉 -->
    <q-layout-drawer v-if="showSideBar"
      side="right"
      class="side-area"
      v-model="drawerOpen"
      :width="200">
      <q-list no-border>
        <!-- 未登陆显示登陆按钮 -->
        <q-item v-if="!userInfo">
          <q-item-main>
            <router-link to="/login">
              <q-btn color="primary"
                class="full-width">登陆</q-btn>
            </router-link>
          </q-item-main>
        </q-item>
        <!-- 已登陆显示用户信息 -->
        <q-item v-else
          :to="`/user/${userInfo.loginname}`">
          <q-item-side>
            <img class="avatar"
              v-lazy="userInfo.avatar_url">
          </q-item-side>
          <q-item-main :label="userInfo.loginname"></q-item-main>
          <q-item-side right>
            <q-icon class="iconfont"
              name="icon-arrow-right"
              size="12px">
            </q-icon>
          </q-item-side>
        </q-item>
        <q-item-separator></q-item-separator>
        <!-- 菜单 -->
        <side-bar></side-bar>
      </q-list>
    </q-layout-drawer>
    <!-- 整体内容 -->
    <q-page-container>
      <navigation>
        <router-view></router-view>
      </navigation>
    </q-page-container>

    <!-- 返回顶部 -->
    <q-btn v-back-to-top.animate="{offset: 200, duration: 200}"
      round
      color="primary"
      class="fixed-bottom-right animate-pop"
      style="margin: 0 15px 70px 0">
      <q-icon name="keyboard_arrow_up" />
    </q-btn>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import SideBar from 'src/components/side-menu/side-menu'
export default {
  components: {
    SideBar
  },
  data() {
    return {
      drawerOpen: false
    }
  },
  computed: {
    ...mapGetters(['title', 'showSideBar', 'userInfo'])
  },
  created() {
    console.log('Github -> https://github.com/liub1934/quasar-cnodejs')
  },
  methods: {
    newAdd(){
      console.log(this.$route);
      if(this.userInfo){
        this.$router.push({
          name: 'Add'
        })
      }else {
        this.$router.push({
          name: 'Login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    }
  }
}
</script>
