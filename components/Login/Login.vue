<template>
  <b-card class="shadow rounded-lg my-auto p-4">
    <b-card-title class="font-weight-bolder text-danger">Masuk</b-card-title>

    <ValidationObserver ref="observer" v-slot="{ handleSubmit }" slim>
      <b-form
        ref="loginForm"
        class="mt-5"
        @submit.stop.prevent="handleSubmit(userLogin)"
      >
        <!-- Email field -->
        <ValidationProvider
          v-slot="validationContext"
          name="Email"
          rules="required|email"
          slim
        >
          <b-form-group id="email" label-for="email-field">
            <b-form-input
              id="email-field"
              v-model="login.email"
              :state="getValidationState(validationContext)"
              type="email"
              placeholder="Email"
              size="lg"
              aria-describedby="email-feedback"
            />

            <b-form-invalid-feedback id="email-feedback">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <!-- Password field -->
        <ValidationProvider
          v-slot="validationContext"
          name="Password"
          rules="required|minmax:8,16"
          slim
        >
          <b-form-group id="password" label-for="password-field">
            <b-input-group size="lg">
              <b-form-input
                id="password-field"
                v-model="login.password"
                :state="getValidationState(validationContext)"
                :type="isShowPassword ? 'text' : 'password'"
                placeholder="Password"
                aria-describedby="password-feedback"
              />

              <b-input-group-append>
                <b-button variant="light" size="sm" @click="showPassword">
                  Show
                </b-button>
              </b-input-group-append>
            </b-input-group>

            <span class="text-danger" style="font-size: 80%">
              {{ validationContext.errors[0] }}
            </span>
          </b-form-group>
        </ValidationProvider>

        <!-- Reset password -->
        <nuxt-link to="#" class="text-danger float-right mb-4">
          Lupa Password ?
        </nuxt-link>

        <b-button type="submit" variant="danger" size="lg" class="mt-5" block>
          Masuk
        </b-button>
      </b-form>
    </ValidationObserver>

    <hr class="w-75 my-4" />

    <p class="text-center m-0">
      Belum punya Akun ?
      <nuxt-link to="/register" class="text-danger font-weight-bold">
        Daftar Sekarang
      </nuxt-link>
    </p>
  </b-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'BaseLogin',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      isShowPassword: false,
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    showPassword() {
      this.isShowPassword = !this.isShowPassword
    },
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })

        if (!response) return

        const user = response?.data?.data

        this.$auth.setUser(user)
        // Redirect to home page
        this.$router.push('/')
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
