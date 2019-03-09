/*
 * FileName: topic.vue
 * Remark: 主题详情
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Tuesday, 19th February 2019 3:42:35 pm
 * Last Modified: Tuesday, 26th February 2019 11:10:40 am
 * Modified By: LiuBing
 */

<template>
  <scroll ref="scroll">
    <div class="topic">
      <div v-if="loading"
        class="row justify-center">
        <q-spinner-dots slot="message"
          :size="40">
        </q-spinner-dots>
      </div>
      <template v-if="topicDetail.id">
        <div class="topic-title"
          v-html="topicDetail.title"></div>
        <div class="author-top">
          <router-link :to="`/user/${topicDetail.author.loginname}`">
            <img class="avatar"
              v-lazy="topicDetail.author.avatar_url">
          </router-link>
          <div class="left">
            <div class="author-name">
              <router-link :to="`/user/${topicDetail.author.loginname}`">
                {{ topicDetail.author.loginname }}
              </router-link>
            </div>
            <div class="date-time">{{ formatDate(topicDetail.create_at) }}</div>
          </div>
          <div class="right">
            <div style="display: flex">
              <div class="tag"
                :style="{ 'background-color': getArticleTag(topicDetail.tab, topicDetail.good, topicDetail.top, 'color') }">
                {{ getArticleTag(topicDetail.tab, topicDetail.good, topicDetail.top, 'text') }}
              </div>
              <q-icon name="icon-collect"
                size="20px"
                :class="['iconfont', 'collect', {'active': topicDetail.is_collect}]"
                @click.native="_collect">
              </q-icon>
            </div>
            <div class="visit-count">{{ topicDetail.visit_count }}次浏览</div>
          </div>
        </div>
        <div class="markdown-body content"
          v-html="topicDetail.content">
        </div>

        <!-- 评论列表 -->
        <comment-list v-if="topicDetail.replies"
          :topic="topicDetail"
          :list="topicDetail.replies">
        </comment-list>

        <!-- 回复主题box -->
        <q-item-separator></q-item-separator>
        <q-item inset-separator>
          <q-item-main>
            <q-item-tile label>
              回复
            </q-item-tile>
            <q-item-tile sublabel>
              <reply-box :topic="topicDetail"
                :autofocus="false">
              </reply-box>
            </q-item-tile>
          </q-item-main>
        </q-item>

      </template>

    </div>
  </scroll>
</template>

<script>
import './topic.styl'
import { getTopicDetail, collect } from 'src/api/index.js'
import { getArticleTag } from 'src/utils/article.js'
import { formatDate } from 'src/utils/date.js'
import { mapMutations, mapGetters } from 'vuex'
import Scroll from 'src/components/scroll/scroll'
import CommentList from 'src/components/comment-list/comment-list'
import ReplyBox from 'src/components/reply-box/reply-box'
export default {
  components: {
    Scroll,
    CommentList,
    ReplyBox
  },
  data() {
    return {
      topicDetail: {},
      loading: true
    }
  },
  created() {
    this.SET_TITLE('主题')
    this._getTopicDetail()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapMutations(['SET_TITLE']),
    getArticleTag(tab, good, top, type) {
      return getArticleTag(tab, good, top, type)
    },
    formatDate(date) {
      return formatDate(date)
    },
    _getTopicDetail() {
      let id = this.$route.params.id
      let token = this.userInfo ? this.userInfo.token : null
      getTopicDetail(id, token)
        .then(res => {
          this.topicDetail = res.data
          this.loading = false
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        })
        .catch(err => {
          if (err) throw err
          this.loading = false
        })
    },
    _collect() {
      collect(this.$route.params.id).then(res => {
        this.topicDetail.is_collect = !this.topicDetail.is_collect
      })
    }
  },
  watch: {
    // $route(newRoute) {
    //   if (newRoute.name === 'Topic') {
    //     this.SET_TITLE('主题')
    //     this.topicDetail = {}
    //     this._getTopicDetail()
    //   }
    // }
  }
}
</script>
