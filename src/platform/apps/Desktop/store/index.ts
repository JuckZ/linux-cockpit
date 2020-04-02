import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  moduleName: 'Desktop',
  store: {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  },
}
