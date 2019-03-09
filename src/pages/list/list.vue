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
  <div class="list">
    <div class="list-content">
      <article-list pullup
        :data="list"
        :list="list"
        :loading="loading"
        :end="end"
        :no-result="noResult"
        @scrollToEnd="loadMore">
      </article-list>
    </div>
  </div>
</template>

<script>
import ArticleList from 'src/components/article-list/article-list'
import { getTopics } from 'src/api/index.js'
import { mapMutations } from 'vuex'
import { getArticleTag } from 'src/utils/article.js'
export default {
  components: {
    ArticleList
  },
  data() {
    return {
      loading: true,
      end: false,
      noResult: false,
      list: [],
      hasDone: false,
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
      if (!this.hasDone) {
        this.hasDone = true
        this._getTopics()
      }
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
          return
        }
        this.list = this.list.concat(res.data)
        this.hasDone = false
        this.params.page++
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
