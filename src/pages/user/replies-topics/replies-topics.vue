/*
 * FileName: replies-topics.vue
 * Remark: 最近回复、最新发布
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Friday, 22nd February 2019 10:04:56 am
 * Last Modified: Tuesday, 26th February 2019 11:11:59 am
 * Modified By: LiuBing
 */

<template>
  <div class="replies-topics">
    <article-list v-if="user"
       type="repliesTopics"
      :list="list"
      :loading="false"
      :no-result="list.length ? false : true">
    </article-list>
  </div>
</template>

<script>
const ArticleList = () => import('components/article-list/article-list')
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    ArticleList
  },
  data() {
    return {
      list: [],
      names: ['UserReplies', 'UserTopics']
    }
  },
  created() {
    this.setData()
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapMutations(['SET_TITLE']),
    setData() {
      let name = this.$route.name
      if (name === 'UserReplies' || name === 'UserTopics') {
        this.list = []
        switch (name) {
          case 'UserReplies':
            this.SET_TITLE('最近回复')
            this.list = this.user.recent_replies
            break
          case 'UserTopics':
            this.SET_TITLE('最新发布')
            this.list = this.user.recent_topics
            break
        }
      }
    }
  },
  watch: {
    $route(newRoute) {
      this.setData()
    }
  }
}
</script>
