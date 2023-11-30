<template>
  <form
    @submit.prevent="submit"
    class="text-start px-5 py-20 flex flex-col gap-5 max-w-2xl mx-auto my-0 relative"
  >
    <pre>{{ form }}</pre>

    <h1 class="text-5xl">Authorization</h1>

    <div class="form__control">
      <label for="email" class="mb-10">Email</label>
      <input
        v-model="form.email.value"
        @blur="form.email.blur"
        type="text"
        id="email"
        class="w-full rounded border p-4 text-xl focus:outline-none focus:border-2 focus:border-green-400"
        :class="{
          'border-red-400 focus:border-red-400': !form.email.valid && form.email.touched
        }"
        placeholder="Email"
      />
      <small v-if="form.email.errors?.required && form.email.touched" class="text-red-500"
        >Email field is required
      </small>
      <small v-else-if="form.email.errors?.validateEmail && form.email.touched" class="text-red-500"
        >Invalid email address.
      </small>
    </div>

    <div class="form__control">
      <label for="password">Password</label>
      <div class="relative">
        <input
          v-model="form.password.value"
          @blur="form.password.blur"
          :type="show ? 'text' : 'password'"
          id="password"
          class="w-full rounded border p-4 text-xl focus:outline-none focus:border-2 focus:border-green-400"
          :class="{
            'border-red-400 focus:border-red-400': !form.password.valid && form.password.touched
          }"
          placeholder="Password"
        />
        <div class="eye-hide-show">
          <BaseIcon v-if="show" @click="switchEye" name="Eye" class="w-6 h-6" />
          <BaseIcon v-else @click="switchEye" name="EyeSlash" class="w-6 h-6" />
        </div>
      </div>

      <small v-if="form.password.errors?.required && form.password.touched" class="text-red-500"
        >Password field is required
      </small>
      <small
        v-else-if="form.password.errors?.minLength && form.password.touched"
        class="text-red-500"
        >Password length cannot be less than 8. Now it is
        {{ form.password.value.length }}
      </small>
    </div>

    <BaseButton
      ref="refButton"
      type="success"
      :disabled="!form.valid || !!errorMessage"
      class="flex justify-center"
    >
      <TheSpinner v-if="loading" />
      <template v-else>Submit</template>
    </BaseButton>

    <div
      v-if="errorMessage"
      class="error text-red-500 text-xl py-5 px-20 rounded max-w-max fixed bottom-14 right-0 bg-white shadow-lg shadow-[#888888] z-10 duration-1000 anim"
    >
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import TheSpinner from '@/components/spinner/TheSpinner.vue'

import { PAGE_TIMELINE } from '@/lib/constants'
import { resetForm, useForm } from '@/module/form'
import { formServices } from '@/api/services'
import type { IForm, IResponse } from '@/types'

const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const required = (val?: string) => !!val
const minLength = (num: number) => (val: string) => val.length >= num
const validateEmail = (val: string) => !!val.match(validRegex)

const form: IForm = useForm({
  email: {
    value: '',
    validators: {
      required,
      validateEmail
    }
  },
  password: {
    value: '',
    validators: {
      required,
      minLength: minLength(8)
    }
  },
  valid: false
})
const router = useRouter()
const loading = ref(false)
const show = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  const user = localStorage.getItem('user')
  if (user) router.push({ path: `/#${PAGE_TIMELINE}` })
})

async function submit() {
  loading.value = true
  try {
    const res: IResponse = await formServices.sendDataFormAuthorization({
      email: form.email.value,
      password: form.password.value
    })

    console.log(res.data)
    resetForm(form)
    localStorage.setItem('user', JSON.stringify(res.data))
    router.push({ path: `/#${PAGE_TIMELINE}` })
  } catch (e: any) {
    console.error(e)
    errorMessage.value = e.message
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    loading.value = false
  }
}

function switchEye() {
  show.value = !show.value
}
</script>

<style scoped>
.eye-hide-show {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(-50%, -50%);
}

.anim {
  animation: slidein 1s forwards;
}

@keyframes slidein {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@media screen and (max-width: 640px) {
  .error {
    padding: 1rem !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
