/*
 * FileName: reply-box.vue
 * Remark: 回复
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Friday, 22nd February 2019 5:06:24 pm
 * Last Modified: Tuesday, 26th February 2019 11:04:16 am
 * Modified By: LiuBing
 */

<template>
  <div class="reply-box">
    <q-input v-model="value"
      placeholder="回复支持Markdown语法,请注意标记代码"
      :autofocus="autofocus"
      type="textarea"
      rows="7">
    </q-input>
    <q-btn color="primary"
      class="full-width reply-btn"
      :loading="loading"
      :disabled="loading"
      @click="toReply">确定</q-btn>
  </div>
</template>

<script>
const markdown = require('markdown').markdown
import { topicReplies } from 'src/api/index.js'
import { mapGetters } from 'vuex'
export default {
  props: {
    topic: {
      type: Object
    },
    reply: {
      type: Object
    },
    autofocus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    toReply() {
      if (!this.userInfo) {
        this.$router.push({
          name: 'Login',
          query: {
            redirect: this.$route.path
          }
        })
        return
      }
      if (this.value) {
        this.loading = true
        let time = new Date()
        let markdownHtml = markdown.toHTML(this.value)
        let htmlContent = `<div class="markdown-text">${markdownHtml}</div>`
        let postData = {
          accesstoken: this.userInfo.token,
          content: this.value
        }
        if (this.reply) {
          postData.reply_id = this.reply.id
        }
        topicReplies(this.topic.id, postData)
          .then(res => {
            this.topic.replies.push({
              author: {
                avatar_url: this.userInfo.avatar_url,
                loginname: this.userInfo.loginname
              },
              content: htmlContent,
              create_at: time,
              id: res.reply_id,
              ups: []
            })
            this.loading = false
            this.value = ''
            this.$emit('has-reply')
          })
          .catch(err => {
            if (err) throw err
            this.loading = false
          })
      }
    },
    setValue(val) {
      this.value = val
    }
  }
}
</script>

<style lang="stylus">
.reply-box
  width: 100%
  .reply-btn
    margin-top: 10px
</style>
