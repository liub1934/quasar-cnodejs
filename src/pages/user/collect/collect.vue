/*
 * FileName: collect.vue
 * Remark: 我的收藏
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Tuesday, 26th February 2019 2:49:49 pm
 * Last Modified: Tuesday, 26th February 2019 2:49:51 pm
 * Modified By: LiuBing
 */
<template>
  <div class="collect">
    <article-list :list="list"
      type="collectList">
    </article-list>

    <list-loading :loading="loading"
      :no-result="noResult">
    </list-loading>
  </div>
</template>

<script>
const ArticleList = () => import('components/article-list/article-list')
const ListLoading = () => import('src/components/list-loading/list-loading')
import { mapMutations } from 'vuex'
import { getCollect } from 'src/api/index.js'
export default {
  components: {
    ArticleList,
    ListLoading
  },
  data() {
    return {
      loading: true,
      noResult: false,
      list: []
    }
  },
  created() {
    this.setTitle()
    this._getCollect()
  },
  methods: {
    ...mapMutations(['SET_TITLE']),
    setTitle() {
      if (this.$route.name === 'UserCollect') {
        this.SET_TITLE('我的收藏')
      }
    },
    _getCollect() {
      if (this.$route.name === 'UserCollect') {
        let username = this.$route.params.username
        this.list = []
        this.loading = true
        this.noResult = false
        if (username) {
          getCollect(username)
            .then(res => {
              if (!res.data.length) {
                this.noResult = true
              }
              this.loading = false
              this.list = res.data
            })
            .catch(err => {
              if (err) throw err
              this.loading = false
              this.noResult = true
            })
        } else {
          this.$router.push({
            name: 'List'
          })
        }
      }
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.setTitle()
      if (newRoute.name === oldRoute.name) {
        this._getCollect()
      }
    }
  }
}
</script>
