export const state = () => ({
  cart: [], // { product: {}, quantity: 0 }
})

export const mutations = {
  ADD_CART(state, value) {
    const isExistOnCart = state.cart?.some(
      (item) => item.product.id === value.product.id
    )

    if (state.cart.length === 0 || !isExistOnCart) return state.cart.push(value)

    const filterProduct = state.cart.filter(
      (item) => item.product.id !== value.product.id
    )

    return (state.cart = [...filterProduct, value])
  },
  REMOVE_CART(state, value) {
    const filterCart = state.cart.filter((item) => item.product.id !== value)

    state.cart = filterCart
  },
}

export const getters = {
  countCart: (state) => {
    if (state.cart.length === 0) return 0

    return state.cart
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current)
  },
}
