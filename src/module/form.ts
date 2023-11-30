import type { IErrors, IField, IForm, IValidators } from '@/types'
import { computed, reactive, ref, watch } from 'vue'

///////////////////////////////////////////////////////////
const initialErrorsData = {
  required: false,
  minLength: false,
  validateEmail: false
}

export function useField(field: IField) {
  const valid = ref(true)
  const value = ref(field.value)
  const touched = ref(false)
  const errors = reactive<IErrors>(initialErrorsData)

  function reassign(value: string) {
    valid.value = true
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name as keyof IValidators](value)
      errors[name as keyof IValidators] = !isValid

      if (!isValid) {
        valid.value = false
      }
    })
  }

  reassign(value.value)

  watch(value, (newValue) => {
    reassign(newValue)
  })

  return { valid, value, errors, touched, blur: () => (touched.value = true) }
}

export function useForm(initForm: IForm) {
  const form = reactive<IForm | any>({})

  for (const [key, value] of Object.entries(initForm)) {
    form[key] = useField(value)
  }

  form.valid = computed(() => {
    return Object.keys(form)
      .filter((el) => el !== 'valid')
      .reduce((acc, el) => {
        acc = form[el].valid
        return acc
      }, true)
  })

  return form
}

export function resetForm(form: IForm) {
  Object.keys(form).forEach((key) => {
    const field = form[key as keyof IForm]

    if (typeof field !== 'boolean') {
      field.value = ''
      field.valid = false
      field.touched = false
    }
  })
}
