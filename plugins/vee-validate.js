import { extend, validate } from 'vee-validate'
import { required, email, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} tidak boleh kosong!',
})

extend('confirmed', confirmed)
extend('email', email)

extend('min', {
  validate(value, { length }) {
    return value.length >= length
  },
  params: ['length'],
  message: '{_field_} harus mengandung minimal {length} karakter!',
})

extend('max', {
  validate(value, { length }) {
    return value.length <= length
  },
  params: ['length'],
  message: '{_field_} harus mengandung maksimal {length} karakter!',
})

extend('minmax', {
  async validate(value, { min, max }) {
    const res = await validate(value, `min:${min}|max:${max}`)

    return res.valid
  },
  params: ['min', 'max'],
  message:
    '{_field_} harus mengandung minimal {min} dan maksimum {max} karakter!',
})
