export const actions = {
  async nuxtServerInit({ dispatch }, { $auth }) {
    await dispatch('products/getProducts', {
      token: $auth.strategy.token.get(),
    })
  },
}
