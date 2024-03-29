import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid =  await dispatch('getUid')
        const updateDate = {...getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateDate)
        commit('setInfo', updateDate)
      } catch (e) {
        commit('setError', e)
        throw r
      }
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid =  await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw r
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
