<script setup>
import {useCurrencyStore} from '@/stores/index'
import {onMounted, ref, computed} from 'vue'

import IconSwap from "../components/icons/IconSwap.vue";
const storeCurrency = useCurrencyStore()
const selectedCurrency = ref('')
onMounted(async() => {
  await storeCurrency.getCurrencyList()
})
const ruble = ref(0)
const otherCurrency = computed(()=>{
  return ruble.value*(selectedCurrency.value.Nominal / selectedCurrency.value.Value)
})
const onSelectChange = ()=>{
  ruble.value = selectedCurrency.value.Value
}
const onSwap = ()=>{
  ruble.value = otherCurrency.value
}
</script>
<template>
  <h1>Converter</h1>
  <div class="converter">
    <div class="left">
      RUB
      <input class="input" type="number" v-model="ruble">
    </div>
    <div class="swap">
      <icon-swap @click="onSwap"/>
    </div>
    <div class="right">
      <select class="select" v-model="selectedCurrency" @change="onSelectChange()">
        <option value="">Choose</option>
        <option :value="value" v-for="(value) in storeCurrency.currencyList" :key="value.ID">{{value.CharCode}}</option>
      </select>
      <input class="input" type="number" disabled v-model="otherCurrency">
    </div>
  </div>
</template>

<style scoped lang="scss">
.converter{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.input{
  padding: 10px;
}
.select{
  padding: 10px;
}
</style>
