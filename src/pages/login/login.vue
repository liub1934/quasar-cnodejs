/*
 * FileName: login.vue
 * Remark: 登陆
 * Project: quasar-cnodejs
 * Author: LiuBing
 * File Created: Wednesday, 20th February 2019 6:15:38 pm
 * Last Modified: Tuesday, 26th February 2019 11:10:53 am
 * Modified By: LiuBing
 */

<template>
  <div class="login">
    <q-input v-model="token"
      float-label="Access Token"></q-input>
    <q-btn class="login-btn"
      color="primary"
      :loading="loading"
      :disabled="loading"
      @click="handleLogin">登陆</q-btn>
  </div>
</template>

<script>
import './login.styl'
import { mapMutations } from 'vuex'
import { accessToken } from 'src/api/index.js'
export default {
  data() {
    return {
      token: '',
      loading: false
    }
  },
  created() {
    this.SET_TITLE('登陆')
  },
  methods: {
    ...mapMutations(['SET_TITLE', 'SET_USERINFO']),
    handleLogin() {
      if (!this.token) {
        this.$q.notify({
          message: '请输入Access Token',
          type: 'negative',
          position: 'top',
          timeout: 1000
        })
        return
      }
      this.loading = true
      let redirect = this.$route.query.redirect
      accessToken(this.token)
        .then(res => {
          let userInfo = {
            avatar_url: res.avatar_url,
            id: res.id,
            loginname: res.loginname,
            token: this.token
          }
          this.SET_USERINFO(userInfo)
          this.loading = false
          if (redirect) {
            this.$router.push({
              path: redirect
            })
          } else {
            this.$router.push({
              name: 'List'
            })
          }
        })
        .catch(err => {
          if (err) throw err
          this.loading = false
        })
    }
  },
  watch: {
    $route() {
      this.SET_TITLE('登陆')
    }
  }
}
</script>
