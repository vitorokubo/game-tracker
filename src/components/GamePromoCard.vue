<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  promo: Object
})
</script>

<template>
  <div>
    <img :src="promo.thumb" />
    <div>
      <h2>
        {{ promo.title }}
      </h2>
      <div>
        <RouterLink :to="{ name: 'DealAbout', params: { dealID: promo.dealID } }"
          >Detalhes</RouterLink
        >
        <div>
          <div>
            <p>{{ promo.normalPrice }}</p>
            <p>{{ promo.salePrice }}</p>
          </div>
          <div>
            <p>{{ promo.savings }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
