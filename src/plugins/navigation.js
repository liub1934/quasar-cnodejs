import Navigation from 'vue-navigation'
export default ({ Vue, router }) => {
  Vue.use(Navigation, { router, keyName: 'v' })
}
