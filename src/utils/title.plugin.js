import LocalizeFiltert from './../filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function (titleKey) {
      Vue.prototype.$title = function (titleKey) {
        const appName = process.env.VUE_APP_TITLE
        return `${localize.filter(titleKey)} | ${appName}`
      }
    }
  }
}
