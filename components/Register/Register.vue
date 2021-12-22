<template>
  <b-card class="shadow rounded-lg my-auto p-4">
    <template>
      <b-card-title v-if="step === 1" class="font-weight-bolder text-danger">
        Daftar Sekarang
      </b-card-title>

      <b-button
        v-else
        variant="link"
        class="text-danger"
        @click="step = step - 1"
      >
        <BIconArrowLeft class="align-middle mr-50" />
        Kembali
      </b-button>
    </template>

    <ValidationObserver ref="observer" v-slot="{ handleSubmit }" slim>
      <b-form
        ref="registerForm"
        :class="step === 1 ? 'mt-5' : 'mt-3'"
        @submit.stop.prevent="handleSubmit(userRegister)"
      >
        <template v-if="step === 1">
          <!-- First name field -->
          <ValidationProvider
            v-slot="validationContext"
            name="Nama Depan"
            rules="required"
            slim
          >
            <b-form-group id="firstName" label-for="firstName-field">
              <b-form-input
                id="firstName-field"
                v-model="register.firstName"
                :state="getValidationState(validationContext)"
                type="text"
                placeholder="Nama Depan"
                size="lg"
                aria-describedby="firstName-feedback"
              />

              <b-form-invalid-feedback id="firstName-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <!-- Last name field -->
          <ValidationProvider
            v-slot="validationContext"
            name="Nama Belakang"
            rules="required"
            slim
          >
            <b-form-group id="lastName" label-for="lastName-field">
              <b-form-input
                id="lastName-field"
                v-model="register.lastName"
                :state="getValidationState(validationContext)"
                type="text"
                placeholder="Nama Belakang"
                size="lg"
                aria-describedby="lastName-feedback"
              />

              <b-form-invalid-feedback id="lastName-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

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
                v-model="register.email"
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
        </template>

        <template v-else>
          <!-- Phone field -->
          <ValidationProvider
            v-slot="validationContext"
            name="Nomor Telepon"
            rules="required"
            slim
          >
            <b-form-group id="phone" label-for="phone-field">
              <b-form-input
                id="phone-field"
                v-model="register.phone"
                :state="getValidationState(validationContext)"
                type="tel"
                placeholder="Nomor Telepon"
                size="lg"
                aria-describedby="phone-feedback"
              />

              <b-form-invalid-feedback id="phone-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <!-- Password field -->
          <ValidationProvider
            v-slot="validationContext"
            name="Password"
            rules="required|minmax:8,16|confirmed:confirmedPassword"
            slim
          >
            <b-form-group id="password" label-for="password-field">
              <b-input-group size="lg">
                <b-form-input
                  id="password-field"
                  v-model="register.password"
                  :state="getValidationState(validationContext)"
                  :type="isShow.password ? 'text' : 'password'"
                  placeholder="Password"
                  aria-describedby="password-feedback"
                />

                <b-input-group-append>
                  <b-button
                    variant="light"
                    size="sm"
                    @click="doShowPassword('password')"
                  >
                    Show
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <span class="text-danger" style="font-size: 80%">
                {{ validationContext.errors[0] }}
              </span>
            </b-form-group>
          </ValidationProvider>

          <!-- Password confirmation field -->
          <ValidationProvider
            v-slot="validationContext"
            vid="confirmedPassword"
            name="Konfirmasi Password"
            rules="required|minmax:8,16"
            slim
          >
            <b-form-group
              id="confirmedPassword"
              label-for="confirmedPassword-field"
            >
              <b-input-group size="lg">
                <b-form-input
                  id="confirmedPassword-field"
                  v-model="confirmedPassword"
                  data-vv-as="password"
                  :state="getValidationState(validationContext)"
                  :type="isShow.confirmedPassword ? 'text' : 'password'"
                  placeholder="Konfirmasi Password"
                  aria-describedby="confirmedPassword-feedback"
                />

                <b-input-group-append>
                  <b-button
                    variant="light"
                    size="sm"
                    @click="doShowPassword('confirmedPassword')"
                  >
                    Show
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <span class="text-danger" style="font-size: 80%">
                {{ validationContext.errors[0] }}
              </span>
            </b-form-group>
          </ValidationProvider>
        </template>

        <b-button
          v-if="step === 1"
          variant="danger"
          size="lg"
          class="mt-5"
          block
          @click="userRegister"
        >
          Selanjutnya
        </b-button>

        <b-button
          v-else
          variant="danger"
          size="lg"
          class="mt-5"
          block
          @click="userRegister"
        >
          Daftar
        </b-button>
      </b-form>
    </ValidationObserver>

    <hr class="w-75 my-4" />

    <p class="text-center m-0">
      Sudah punya Akun ?
      <nuxt-link to="/login" class="text-danger font-weight-bold">
        Masuk
      </nuxt-link>
    </p>
  </b-card>
</template>

<script>
import { BIconArrowLeft } from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'BaseRegister',
  components: {
    BIconArrowLeft,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      register: {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
      },
      confirmedPassword: '',
      step: 1,
      isShow: {
        password: false,
        confirmedPassword: false,
      },
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    doShowPassword(field) {
      this.isShow[field] = !this.isShow[field]
    },
    async userRegister() {
      try {
        const isValidate = await this.$refs.observer.validate()

        if (!isValidate) return

        if (this.step === 1) return (this.step = this.step + 1)

        await this.$axios.$post('/register', {
          ...this.register,
          name: `${this.register.firstName} ${this.register.lastName}`,
        })
        // After register do login
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.register.email,
            password: this.register.password,
          },
        })
        const user = response?.data?.data
        this.$auth.setUser(user)
        // Redirect to home page
        this.$router.push('/')
      } catch (error) {
        console.error(error.message)
      }
    },
  },
}
</script>
