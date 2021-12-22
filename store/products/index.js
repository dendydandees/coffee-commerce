export const state = () => ({
  loading: false,
  products: [
    {
      id: 8,
      name: 'APEL MALANG ESPRESSO Finca Yudhistira Natural',
      price: 120000,
      description:
        'An awesome lot from a farm which belong to a family of our best friend, Yudistira. This is the family’s first move into specialty coffee industry but no one should never be underestimated their first move. A \\nlivestock farm turn into coffee farm, located at Gunung Arjuna (1100 MASL) Malang, yields enough proof that coffee grown and harvested there is indeed a great coffee. The whole family involvement in processing the coffee resulting a floral, sweet and very clean coffee beyond average coffee from Indonesia. The coffee inside is a natural process went through sundried for 5 weeks and rest for 1 month prior to delivery. Started in the year of 2017, this is more than a coffee with Love',
      short_description: 'APEL MALANG ESPRESSO',
      slug: 'apel-malang-246',
      min_order: 0,
      is_merchant_discount: 0,
      discount_amount: 0,
      seller_id: 3,
      product_type_id: 1,
      is_active: 1,
      is_deleted: 0,
      created_at: '2021-12-21T00:24:46.000000Z',
      updated_at: '2021-12-21T00:24:46.000000Z',
      product_type: {
        id: 1,
        name: 'Roasted Bean',
        slug: 'roasted-bean-2',
        created_at: '2021-12-21T00:00:07.000000Z',
        updated_at: '2021-12-21T00:00:07.000000Z',
      },
      images: [
        {
          id: 9,
          product_id: 8,
          image_url:
            'https://res.cloudinary.com/pt-folka-indonesia-teknologi/image/upload/v1640021111/2021-01-08T12_29_49.591Z_wr0uul.png',
          is_primary: 1,
          created_at: '2021-12-21T00:25:17.000000Z',
          updated_at: '2021-12-21T00:25:17.000000Z',
        },
        {
          id: 10,
          product_id: 8,
          image_url:
            'https://res.cloudinary.com/pt-folka-indonesia-teknologi/image/upload/v1640021111/2021-01-08T12_29_49.591Z_wr0uul.png',
          is_primary: 0,
          created_at: '2021-12-21T00:25:45.000000Z',
          updated_at: '2021-12-21T00:25:45.000000Z',
        },
      ],
    },
    {
      id: 9,
      name: 'APEL MALANG Finca Yudhistira Natural',
      price: 120000,
      description:
        'Microlot coffee renowned for clean with loud and clear flavour. Handled by respective family with amazing sortation! This coffee is a natural processed, a new  processed for this family! Highlighted with huge green apple flavor yet we call this coffee as Apel Malang, great for filter coffee',
      short_description: 'APEL MALANG',
      slug: 'apel-malang-245',
      min_order: 0,
      is_merchant_discount: 0,
      discount_amount: 0,
      seller_id: 3,
      product_type_id: 1,
      is_active: 1,
      is_deleted: 0,
      created_at: '2021-12-21T00:26:49.000000Z',
      updated_at: '2021-12-21T00:26:49.000000Z',
      product_type: {
        id: 1,
        name: 'Roasted Bean',
        slug: 'roasted-bean-2',
        created_at: '2021-12-21T00:00:07.000000Z',
        updated_at: '2021-12-21T00:00:07.000000Z',
      },
      images: [
        {
          id: 11,
          product_id: 9,
          image_url:
            'https://res.cloudinary.com/pt-folka-indonesia-teknologi/image/upload/v1640021242/2021-01-08T12_21_24.133Z_memuoh.png',
          is_primary: 1,
          created_at: '2021-12-21T00:27:52.000000Z',
          updated_at: '2021-12-21T00:27:52.000000Z',
        },
        {
          id: 12,
          product_id: 9,
          image_url:
            'https://res.cloudinary.com/pt-folka-indonesia-teknologi/image/upload/v1640021258/2021-01-08T12_21_26.405Z_seaf8r.png',
          is_primary: 0,
          created_at: '2021-12-21T00:27:52.000000Z',
          updated_at: '2021-12-21T00:27:52.000000Z',
        },
      ],
    },
  ],
  params: {
    search: '',
    limit: 10,
    order: 'product_name', // need ASC or DESC
    price: [10000, 500000],
  },
})

export const mutations = {
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_PRODUCTS(state, value) {
    state.products = value
  },
  SET_PARAMS_SEARCH(state, value) {
    state.params.search = value
  },
  SET_PARAMS_PRICE(state, value) {
    state.params.price = value
  },
  SET_PARAMS_LIMIT(state, value) {
    state.params.limit = value
  },
  SET_PARAMS_ORDER(state, value) {
    state.params.order = value
  },
}

export const actions = {
  async getProducts({ state, commit }, { token }) {
    const headers = {
      Authorization: `${token}`,
    }
    const params = `?keyword=${state.params?.search}&price=${state.params?.price[0]},${state.params?.price[1]}&page=1&limit=${state.params.limit}&order=${state.params.order},ASC`

    try {
      commit('SET_LOADING', true)

      const response = await this.$axios.$get(`/product${params}`, {
        headers,
      })

      if (response?.code !== 200) throw new Error('Failed to get Product!')

      const products = response?.data?.list

      commit('SET_PRODUCTS', products)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
