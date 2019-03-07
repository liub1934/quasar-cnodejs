
/*
 * FileName: comment-list.vue
 * Remark: 评论列表
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Monday, 25th February 2019 1:42:22 pm
 * Last Modified: Tuesday, 26th February 2019 11:03:15 am
 * Modified By: LiuBing
 */

<template>
  <div class="comment-list">
    <q-list separator
      no-border
      :highlight="false">
      <q-item>
        <q-item-tile>
          评论列表 - {{ list.length }}
        </q-item-tile>
      </q-item>
      <template v-for="(reply, index) in list">
        <q-item ref="replyItem"
          :key="index"
          multiline>
          <q-item-side>
            <router-link :to="`/user/${reply.author.loginname}`">
              <img class="avatar"
                v-lazy="reply.author.avatar_url">
            </router-link>
          </q-item-side>
          <q-item-main>
            <q-item-tile class="author-name"
              label>
              <router-link :to="`/user/${reply.author.loginname}`">
                {{ reply.author.loginname }}
              </router-link>
            </q-item-tile>
            <q-item-tile class="markdown-body"
              sublabel
              v-html="reply.content"></q-item-tile>
            <q-item-tile class="reply-bottom"
              label>
              <div class="time">{{ formatDate(reply.create_at) }}{{reply.create_at}}</div>
              <div class="zr">
                <span class="zan"
                  @click.stop="_zan(reply)">
                  <q-icon class="iconfont"
                    :class="{ 'active' : isZan(reply.ups) > -1 }"
                    name="icon-good">
                  </q-icon>
                  <span class="ups-num">{{ reply.ups.length }}</span>
                </span>
                <span class="reply"
                  :class="{ 'active' : index === replyIndex }"
                  @click.stop="showReply(reply, index)">
                  <q-icon class="iconfont"
                    name="icon-reply">
                  </q-icon>
                </span>
              </div>
            </q-item-tile>
          </q-item-main>
        </q-item>
        <q-item v-if="index === replyIndex"
          :key="`reply-box-${index}`">
          <reply-box ref="replyBox"
            :topic="topic"
            :reply="reply"
            @has-reply="replyIndex = -1">
          </reply-box>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
import { formatDate } from 'src/utils/date.js'
import { mapGetters } from 'vuex'
import { zan } from 'src/api/index.js'
import ReplyBox from 'src/components/reply-box/reply-box'
export default {
  components: {
    ReplyBox
  },
  props: {
    topic: {
      type: Object
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      replyIndex: -1
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    isZan(ups) {
      let id = this.userInfo ? this.userInfo.id : 0
      let i = ups.indexOf(id)
      return i
    },
    showReply(item, index) {
      if (index === this.replyIndex) {
        this.replyIndex = -1
      } else {
        this.replyIndex = index
        this.$nextTick(() => {
          let replyBox = this.$refs.replyBox[0]
          let val = `@${item.author.loginname} `
          replyBox.setValue(val)
        })
      }
    },
    formatDate(date) {
      return formatDate(date)
    },
    _zan(reply) {
      if (this.userInfo && this.userInfo.token) {
        zan(reply.id).then(res => {
          if (res.action === 'up') {
            reply.ups.push(this.userInfo.id)
          } else {
            let i = this.isZan(reply.ups)
            if (i > -1) {
              reply.ups.splice(i, 1)
            }
          }
        })
      } else {
        this.$router.push({
          name: 'Login',
          query: {
            redirect: this.$route.path
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.comment-list
  .q-item-label
    font-size: 12px
    color: #626262
  .reply-bottom
    display: flex
    align-items: center
    .time
      flex: 1
    .zr
      font-size: 16px
      display: flex
      align-items: center
      .zan
        display: flex
        align-items: center
        margin-right: 10px
        .ups-num
          font-size: 14px
      .active
        color: $primary
</style>
