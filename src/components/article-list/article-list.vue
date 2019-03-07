/*
 * FileName: article-list.vue
 * Remark: 文章通用列表
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Monday, 18th February 2019 3:44:06 pm
 * Last Modified: Tuesday, 26th February 2019 11:03:45 am
 * Modified By: LiuBing
 */

<template>
  <div class="article-list">
    <div class="article"
      v-for="(article, index) in list"
      :key="index"
      @click="handleClick(article)">
      <div class="article-top">
        <div v-if="type === 'list'"
          class="article-tag"
          :style="{ 'background-color': getArticleTag(article.tab, article.good, article.top, 'color') }">
          {{ getArticleTag(article.tab, article.good, article.top, 'text') }}
        </div>
        <div class="article-title"
          v-html="article.title"></div>
      </div>
      <div class="article-content">
        <img class="avatar"
          v-lazy="article.author.avatar_url">
        <div class="article-info">
          <div class="info-top">
            <div class="author-name">{{ article.author.loginname }}</div>
            <div v-if="type === 'list'"
              class="article-status">
              <span class="replay-count">{{ article.reply_count }}</span>/
              <span class="visit-count">{{ article.visit_count }}</span>
            </div>
            <span v-else
              class="last-reply">{{ formatDate(article.last_reply_at) }}</span>
          </div>
          <div v-if="type === 'list'"
            class="info-bottom">
            <span class="time">{{ formatDate(article.create_at) }}</span>
            <span class="last-reply">{{ formatDate(article.last_reply_at) }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import './article-list.styl'
import { getArticleTag } from 'src/utils/article.js'
import { formatDate } from 'src/utils/date.js'
export default {
  props: {
    list: {
      type: Array
    },
    type: {
      type: String,
      default: 'list'
    }
  },
  methods: {
    handleClick(article) {
      this.$router.push({
        name: 'Topic',
        params: {
          id: article.id
        }
      })
    },
    getArticleTag(tab, good, top, type) {
      return getArticleTag(tab, good, top, type)
    },
    formatDate(date) {
      return formatDate(date)
    }
  }
}
</script>
