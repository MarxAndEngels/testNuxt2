<template>
  <Header/>
  <main class="wrapper" :class="{'wrapper--modal':modal.open}">
    <slot>
    </slot>
  </main>
  <Footer/>
  <Modal/>
</template>

<script setup lang="ts">
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Modal from '~/components/Modal'
import {useModals} from "~/store/modals";
import {sendUrlYandexMetrika, yandexMetrika, vkAds} from "~/helpers/metrika";
import {onMounted} from "vue";
import {useRoute} from 'vue-router';
import {watch} from 'vue';
import {useSiteConfig} from "~/store/siteConfig";

const modal = computed(() => useModals().modal)

const route = useRoute()
const getUrlParams = () => {
  if (route.query) {
    for (let param in route.query) {
      if (
          param === 'utm_source'
          || param === 'utm_medium'
          || param === 'utm_term'
          || param === 'utm_content'
          || param === 'utm_campaign') {
        if (route.query[param]) {
          localStorage.setItem(param, route.query[param])
        }
      }
    }
  }
}

function dateTimeFunc() {
  return new Date().getHours() <= 11
}

const onLucky = () => {
  if (dateTimeFunc()) {
    useModals().openModal({
      open: true,
      title: 'Счастливые часы до 12:00<br><span>Скидка 100 000 ₽ или КАСКО в подарок при покупке авто в кредит</span>',
      type: 'lucky-time'
    })
  }
  // useModals().setModalOffer(modalOffer.value);

}

onMounted(() => {
  window.dataLayer = window.dataLayer || [];
  window._tmr = window._tmr || [];
  yandexMetrika(route)
  vkAds()
  getUrlParams()


  setTimeout(() => {
    onLucky()
  }, 10000)
})
watch(route, (r) => sendUrlYandexMetrika(r))
</script>