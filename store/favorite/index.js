export const state = () => ({
  favoriteProducts: [],
})

export const mutations = {
  ADD_FAVORITE_PRODUCTS(state, value) {
    state.favoriteProducts.push(value)
  },
  REMOVE_FAVORITE_PRODUCTS(state, value) {
    const filterProduct = state.favoriteProducts.filter(
      (product) => product.id !== value
    )

    state.favoriteProducts = filterProduct
  },
}

export const getters = {
  countFavorite: (state) => {
    return state.favoriteProducts.length
  },
}
