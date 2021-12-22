export const state = () => ({
  breadcrumbs: [],
})

export const mutations = {
  SET_BREADCRUMBS(state, value) {
    state.breadcrumbs = value
  },
}
