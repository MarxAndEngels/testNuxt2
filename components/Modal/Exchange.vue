<template>
  <div class="modal__form">
    <div class="modal__personal">
      <div class="modal__personal-title">
        Ваш автомобиль
      </div>
      <div class="form__control">
        <Input :value="form.client_mark"
               @update:modelValue="newValue => form.client_mark = newValue" placeholder="марка" :error="false"/>
      </div>
      <div class="form__control">
        <Input :value="form.client_folder"
               @update:modelValue="newValue => form.client_folder = newValue" placeholder="модель" :error="false"/>
      </div>
      <div class="form__control">
        <Input mask="number" :value="form.client_year"
               @update:modelValue="newValue => form.client_year = newValue" placeholder="год" :error="false"/>
      </div>
    </div>
    <div class="modal__line">
      <div class="modal__line-block">
        <div class="modal__offer-title">
          {{ modalOffer.title }}
        </div>
        <img class="modal__offer-image" :src="modalOffer.image"
             :alt="modalOffer.title">
      </div>
      <div class="modal__line-block">
        <div class="modal__offer-tech">
          <div v-show="item.value !== 'null л.'" class="modal__offer-tech-item" v-for="item in modalOffer.tech">
            <div class="modal__offer-tech-name">{{ item.name }}</div>
            <div class="modal__offer-tech-value">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal__offer-prices">
      <div class="modal__offer-price">
        {{ numberFormat(modalOffer.price) }} ₽
      </div>
      <div class="modal__offer-price-credit">
        {{ total }} ₽/мес.
      </div>
    </div>
    <div class="modal__calculator">
      <CalculatorIndex @change-payment="changePayment"
                       @change-period="changePeriod"
                       :payment="payment"
                       :period="period"/>
    </div>
    <div class="modal__form-personal">
      <div class="form__control" :class="{'error':error === 'name'}">
        <Input :value="form.name"
               @update:modelValue="newValue => form.name = newValue" placeholder="ФИО" :error="false"/>
      </div>
      <div class="form__control" :class="{'error':error === 'phone'}">
        <Input :value="form.phone"
               @update:modelValue="newValue => form.phone = newValue" placeholder="телефон" type="tel" mask="phone"
               :error="false"/>
      </div>
      <div class="form__control">
        <div class="form__control-error" v-if="error==='client_mark'">
          Укажите марку Вашего автомобиля
        </div>
        <div class="form__control-error" v-if="error==='client_folder'">
          Укажите модель Вашего автомобиля
        </div>
        <div class="form__control-error" v-if="error==='client_year'">
          Укажите год Вашего автомобиля
        </div>
        <div class="form__control-error" v-if="error==='name'">
          Заполните поле ФИО
        </div>
        <div class="form__control-error" v-if="error==='phone'">
          Заполните поле Телефон
        </div>
        <div class="form__control-error" v-if="error==='agree1'">
          Подтвердите наличие гражданства РФ
        </div>
        <div class="form__control-error" v-if="error==='agree2'">
          Необходимо согласие на обработку личных данных
        </div>
        <button :class="{'button--error':error==='mark' || error==='folder'}"
                @click="submit"
                class="button button--primary"> оставить заявку
        </button>
        <div class="checkboxes">
          <Checkbox v-model="form.agree1" title="Подтверждаю наличие гражданства РФ" :error="error === 'agree1'"/>
          <Checkbox v-model="form.agree2" title="Согласен на обработку личных данных" :error="error === 'agree2'"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CalculatorIndex from '~/components/Form/Calculator/index.vue'
import Input from "~/components/Controls/Input.vue";
import Checkbox from "~/components/Controls/Checkbox.vue";
import {ModalOfferType, useModals} from "~/store/modals";
import {numberFormat} from "~/helpers/filters";
import {ref} from "#imports";
import {calculate} from "~/helpers/calculate";
import {sendNewFeedback} from '~/helpers/request'

const modalOffer = computed(() => <ModalOfferType>useModals().modalOffer)

let payment = ref(10)
let period = ref(96)
const router = useRouter()
let total = ref()
total.value = calculate(modalOffer.value?.price, payment.value, period.value)
const changePayment = async (value: any) => {
  payment.value = value
  total.value = calculate(modalOffer.value?.price, payment.value, period.value)
}
const changePeriod = async (value: any) => {
  period.value = value
  total.value = calculate(modalOffer.value?.price, payment.value, period.value)
}

// ФОРМА-------------------------------ФОРМА-------------------------------ФОРМА
import {SendNewFeedback} from "~/apollo/mutations/newFeedback";
import {vkAdsReachGoal, yandexCommercialNew} from "~/helpers/metrika";

let form = ref({
  client_mark: '',
  client_folder: '',
  client_year: '',
  name: '',
  phone: '',
  agree1: true,
  agree2: true,
})

let error = ref<string>('')

watch(form.value, () => {
  error.value = ''
})
const setModalThanks = (payload: boolean) => useModals().setModalThanks(payload)
const submit = async () => {
  if (form.value.client_mark.length < 1) {
    error.value = 'client_mark'
    return false
  }
  if (form.value.client_folder.length < 1) {
    error.value = 'client_folder'
    return false
  }
  if (form.value.client_year.length < 2) {
    error.value = 'client_year'
    return false
  }
  if (form.value.name.length < 1) {
    error.value = 'name'
    return false
  }
  if (form.value.phone.length < 1 || form.value.phone.split('_').length > 1) {
    error.value = 'phone'
    return false
  }
  if (!form.value.agree1) {
    error.value = 'agree1'
    return false
  }
  if (!form.value.agree2) {
    error.value = 'agree2'
    return false
  }
  let variables = ref<SendNewFeedback>({
    type_enum: 'TRADE-IN',
    client_vehicle_mark: form.value.client_mark,
    client_vehicle_model: form.value.client_folder,
    client_vehicle_year: form.value.client_year,
    client_name: form.value.name,
    client_phone: form.value.phone,
    credit_initial_fee: payment.value + ' %',
    credit_period: period.value + ' мес.',
  })
  if (modalOffer.value.type === 'offer'){
    variables.value.offer_id = modalOffer.value.id
  }
  if(modalOffer.value.type === 'folder'){
    variables.value.folder_id = modalOffer.value.folderId
    variables.value.color_id =  modalOffer.value.colorId
    variables.value.modification_id =  modalOffer.value.modificationId
    variables.value.complectation_id =  modalOffer.value.complectationId
  }
  //UTM метки
  if (localStorage.utm_source) {
    variables.value.utm_source = localStorage.utm_source
  }
  if (localStorage.utm_medium) {
    variables.value.utm_medium = localStorage.utm_medium
  }
  if (localStorage.utm_campaign) {
    variables.value.utm_campaign = localStorage.utm_campaign
  }
  if (localStorage.utm_term) {
    variables.value.utm_term = localStorage.utm_term
  }
  if (localStorage.utm_content) {
    variables.value.utm_content = localStorage.utm_content
  }
  //
  const {mutate: feedback} = await sendNewFeedback(variables.value);
  await yandexCommercialNew({
    id: modalOffer.value.id,
    mark: modalOffer.value.mark,
    folder: modalOffer.value.folder,
    modification: modalOffer.value.modification,
    price: modalOffer.value.price
  }, true)
  await vkAdsReachGoal(modalOffer.value?.price, modalOffer.value?.id, true)
  try {
    await feedback(variables.value)
    await router.push('/thanks-n')
  } catch (e) {
    console.log(e)
  }
}


</script>
