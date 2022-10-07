<script setup>
import {useCurrencyStore} from '@/stores/index'
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
const storeCurrency = useCurrencyStore()
import CurrencyItem from "../components/CurrencyItem.vue";

onMounted(async() => {
  await storeCurrency.getCurrencyList()
})
const query = ref('')
const filteredList = computed(() => {
  return storeCurrency.currencyList.filter(item => {
    return item.CharCode.toLowerCase().includes(query.value.toLowerCase()) || item.Name.toLowerCase().includes(query.value.toLowerCase())
  })
})
console.log(filteredList)
</script>

<template>
  <h1>Actual currency rates at {{ dayjs(storeCurrency.fetchDate).format('DD/MM/YYYY HH:mm') }}</h1>
  <input type="text" class="search" v-model="query">
  <div v-if="storeCurrency.currencyList">
    <CurrencyItem v-for="(value, name, index) in filteredList" :key="value.ID" :item="value" :name="value.CharCode"/>
  </div>
</template>

<style lang="scss">
.search{
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
}
</style>