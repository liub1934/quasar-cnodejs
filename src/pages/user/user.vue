/*
 * FileName: user.vue
 * Remark: 用户中心
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Thursday, 21st February 2019 10:50:02 am
 * Last Modified: Tuesday, 26th February 2019 11:11:39 am
 * Modified By: LiuBing
 */

<template>
  <div v-if="user"
    class="user">
    <q-list v-show="$route.name === 'User'">
      <q-item>
        <q-item-side>
          <img class="avatar"
            v-lazy="user.avatar_url">
        </q-item-side>
        <q-item-main>
          <q-item-tile label>{{ user.loginname }}</q-item-tile>
          <q-item-tile sublabel>积分：{{ user.score }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item-separator></q-item-separator>
      <template v-for="(item, index) in list">
        <q-item :key="index"
          :to="`/user/${user.loginname}/${item.value}`">
          <q-item-main>
            <q-item-tile>{{ item.label }}</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-icon class="iconfont"
              name="icon-arrow-right">
            </q-icon>
          </q-item-side>
        </q-item>
        <q-item-separator :key="`separator-${index}`"></q-item-separator>
      </template>
    </q-list>
    <template v-show="$route.name !== 'User'">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </template>
  </div>
</template>

<script>
import './user.styl'
const ArticleList = () => import('components/article-list/article-list')
import { getUserInfo } from 'src/api/index.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    ArticleList
  },
  data() {
    return {
      list: [
        {
          label: '最近回复',
          value: 'replies'
        },
        {
          label: '最新发布',
          value: 'topics'
        },
        {
          label: '我的收藏',
          value: 'collect'
        },
        // {
        //   label: '我的消息',
        //   value: 'message'
        // }
      ]
    }
  },
  created() {
    this.SET_TITLE('用户中心')
  },
  activated() {
    if (!this.$route.meta.cache) {
      this._getUserInfo()
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapMutations(['SET_TITLE', 'SET_USER']),
    _getUserInfo() {
      let username = this.$route.params.username
      if (username) {
        getUserInfo(username).then(res => {
          // this.user = res.data
          this.SET_USER(res.data)
          this.$route.meta.cache = true
        })
      } else {
        this.$router.push({
          name: 'List'
        })
      }
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (newRoute.name === 'User') {
        this.SET_TITLE('用户中心')
        if (newRoute.name === oldRoute.name) {
          this.SET_USER(null)
          this._getUserInfo()
        }
      }
    }
  }
}
</script>
