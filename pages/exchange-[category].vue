<template>
  <div class="container">
    <Crumbs v-if="seoTags" :crumbs="seoTags.crumbs"/>
    <h1 class="heading heading--h1">
      {{ seoTags.title }}
    </h1>
    <div class="grid">
      <div class="grid__form">
        <FormExchange/>
      </div>
      <div class="grid__text" v-if="isDesktop">
        <FormFsspp/>
        <FormSteps/>
        <div class="form__text">
          <p class="text__p">
            Благодаря нашим кредитным программам Вы сможете наслаждаться автомобилем уже сегодня без первоначального
            взноса.
          </p>
          <p class="text__p">
            Мы возьмем на себя подбор оптимальной кредитной программы и оформление сопутствующих документов. Вам
            остается лишь выбрать подходящий автомобиль и заполнить кредитную заявку для предварительного одобрения.
          </p>
          <p class="text__p">
            После звонка кредитного эксперта приезжайте в автоцентр, пробуйте понравившийся автомобиль в рамках
            бесплатного тест-драйва и оформляйте автокредит прямо в салоне без необходимости обращения в отделение
            банка-партнера.
          </p>
        </div>
      </div>
    </div>
    <SectionBanks/>
  </div>
</template>

<script setup lang="ts">
import FormExchange from '~/components/Form/Exchange.vue'
import FormFsspp from '~/components/Form/Fsspp.vue'
import FormSteps from '~/components/Form/Steps.vue'
import {scrollToElement} from "~/helpers/scroll";
import {onMounted} from "vue";
import {definePageMeta} from '#imports'
import {renderSeoTemplate} from "~/composables/seo";
import {useRoute} from "vue-router";
import Crumbs from "~/components/Crumbs/index.vue";

const {isMobile, isDesktop} = useDevice();
const route = useRoute()

definePageMeta({
  validate: async (route) => {
    // return route.params.category === 'u' || route.params.category === 'n';
    return route.params.category === 'n';
  }
})

onMounted(() => {
  if (route.query.category) {
    scrollToElement('#form', 0)
  }
})


const seoTags = renderSeoTemplate(`exchange-${route.params.category}`)
</script>