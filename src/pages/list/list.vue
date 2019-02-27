/*
 * FileName: list.vue
 * Remark: 主题列表
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Monday, 18th February 2019 2:55:13 pm
 * Last Modified: Tuesday, 26th February 2019 11:11:09 am
 * Modified By: LiuBing
 */

<template>
  <q-infinite-scroll ref="scroll"
    :handler="loadMore">
    <article-list :list="list"></article-list>
    <list-loading :loading="loading"
      :end="end"
      :no-result="noResult">
    </list-loading>
  </q-infinite-scroll>
</template>

<script>
const ArticleList = () => import('src/components/article-list/article-list')
const ListLoading = () => import('src/components/list-loading/list-loading')
import { getTopics } from 'src/api/index.js'
import { mapMutations } from 'vuex'
import { getArticleTag } from 'src/utils/article.js'
export default {
  components: {
    ArticleList,
    ListLoading
  },
  data() {
    return {
      loading: true,
      end: false,
      noResult: false,
      list: [],
      noList: false,
      params: {
        page: 1,
        limit: 20,
        tab: this.$route.query.tab || 'all'
      }
    }
  },
  created() {
    this.setTitle()
    this._getTopics()
  },
  computed: {
    tab() {
      return this.$route.query.tab || 'all'
    }
  },
  methods: {
    ...mapMutations(['SET_TITLE']),
    setTitle() {
      let tab = this.$route.query.tab
      let name = this.$route.name
      let tag = getArticleTag(tab, false, false, 'text')
      if (tab && tag && name === 'List') {
        this.SET_TITLE(tag)
      } else {
        this.SET_TITLE('全部')
      }
    },
    loadMore(index, done) {
      if (index === 1) {
        this.$refs.scroll.stop()
        return
      }
      this._getTopics(done)
    },
    _getTopics(done) {
      getTopics(this.params).then(res => {
        if (!res.data.length) {
          if (this.params.page > 1) {
            this.end = true
          } else {
            this.noResult = true
          }
          this.loading = false
          this.$refs.scroll.stop()
          return
        }
        this.list = this.list.concat(res.data)
        this.params.page++
        // this.$route.meta.cache = true
        setTimeout(() => {
          if (this.params.page - 1 === 1) {
            this.$refs.scroll.resume()
          }
        }, 20)
        if (done) {
          done()
        }
      })
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (newRoute.name === 'List') {
        this.setTitle()
      }
    }
  }
}
</script>
