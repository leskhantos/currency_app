<script setup>
import {ref} from "vue";
import IconUp from "./icons/IconUp.vue";
import IconDown from "./icons/IconDown.vue";
import IconSwap from "./icons/IconSwap.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
let isSwap = ref(false)
const toggle = () => { isSwap.value = !isSwap.value}

</script>

<template>
  <div class="container">
    <div class="currency">
      <div class="currency__position">
        <h3 class="">{{name}} - {{item.Name}}</h3>
        <icon-up v-if="item.Previous<item.Value"/>
        <icon-down v-else/>
        <h4 :style="{'color': item.Previous<item.Value ? 'green':'red'}" >{{item.Value-item.Previous}}</h4>
      </div>
        <h3 class="currency__position" v-if="!isSwap">{{item.Nominal +' '+ name }} - {{item.Value}} RUB</h3>
      <h3 class="currency__position" v-else>{{item.Nominal + ' RUB - ' +((item.Nominal/item.Value)* item.Nominal)+' '+ name}}</h3>
      <icon-swap @click="toggle()"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 80rem;
  margin-top: 1rem;
}

.currency {
  padding: 2rem 3rem;
  background-color: rgb(255 255 255 / 10%);
  border-radius: 1rem;
  &__position {
    margin-top: 0;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: start;
  }
}
</style>