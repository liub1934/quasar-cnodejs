/*
 * FileName: add.vue
 * Remark: 发布主题
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Thursday, 21st February 2019 4:19:02 pm
 * Last Modified: Tuesday, 26th February 2019 11:11:21 am
 * Modified By: LiuBing
 */

<template>
  <div class="add-topic">
    <q-list no-border>
      <q-page-sticky position="top"
        style="background: #FFFFFF;z-index: 9">
        <q-item>
          <q-item-side>
            <span class="topic-title">选择主题</span>
          </q-item-side>
          <q-item-main>
            <q-select v-model="postData.tab"
              :options="options">
            </q-select>
          </q-item-main>
          <q-item-side right>
            <q-btn color="primary"
              @click="submit">发布</q-btn>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-side>
            <span class="topic-title">主题名称</span>
          </q-item-side>
          <q-item-main>
            <q-input v-model="postData.title"
              placeholder="主题名称">
            </q-input>
          </q-item-main>
        </q-item>
      </q-page-sticky>
      <q-item style="margin-top: 100px">
        <q-item-main>
          <q-field helper="回复支持Markdown语法,请注意标记代码">
            <q-input v-model="postData.content"
              type="textarea"
              rows="7"
              placeholder="主题内容">
            </q-input>
          </q-field>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { menus } from 'src/assets/js/static.js'
import { mapMutations, mapGetters } from 'vuex'
import { addTopic } from 'src/api/index.js'
export default {
  data() {
    return {
      options: [],
      postData: {
        tab: 'dev',
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.SET_TITLE('发布主题')
    this.isLogin()
    this.filterMenus()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapMutations(['SET_TITLE']),
    filterMenus() {
      let options = menus
        .filter(menu => menu.value !== 'all' && menu.value !== 'good')
        .map(menu => (menu = { label: menu.label, value: menu.value }))
      this.options = options
    },
    isLogin() {
      if (!this.userInfo) {
        this.$router.push({
          name: 'Login',
          query: {
            redirect: this.$route.path
          }
        })
      }
    },
    submit() {
      let { valid, msg } = this.validate()
      if (valid) {
        this.postData.accesstoken = this.userInfo.token
        addTopic(this.postData).then(res => {
          this.$q
            .dialog({
              message: '主题发布成功',
              ok: '查看主题',
              cancel: '取消'
            })
            .then(() => {
              this.$router.push({
                name: 'Topic',
                params: {
                  id: res.topic_id
                }
              })
            })
        })
      } else {
        this.$q.notify({
          message: msg,
          type: 'negative',
          position: 'center',
          timeout: 1000
        })
      }
    },
    validate () {
      let valid = true
      let msg = ''
      if (!this.postData.tab) {
        return {
          valid: false,
          msg: '请选择主题类型'
        }
      } else if (!this.postData.title) {
        return {
          valid: false,
          msg: '请填写主题名称'
        }
      } else if (!this.postData.content) {
        return {
          valid: false,
          msg: '请填写主题内容'
        }
      }
      return {
        valid: valid,
        msg: msg
      }
    }
  },
  watch: {
    $route(newRoute) {
      if (newRoute.name === 'Add') {
        this.SET_TITLE('发布主题')
      }
    }
  }
}
</script>

<style lang="stylus">
.add-topic
  .q-page-sticky-shrink > span
    display: block
    width: 100%
</style>
