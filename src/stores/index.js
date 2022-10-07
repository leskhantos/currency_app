import { defineStore } from "pinia";

export const useCurrencyStore = defineStore({
  id: 'currency',
  state: ()=>({
    currencyList: [],
    fetchDate: ''
  }),
  actions: {
    getCurrencyList (){
      fetch('https://www.cbr-xml-daily.ru/daily_json.js')
          .then(response => response.json())
          .then(data => {
              let arr = []
              for(let item in data.Valute){
                  arr.push(data.Valute[item])
              }
            this.currencyList= arr.sort((a, b) => a.CharCode < b.CharCode ? -1 : 1)
            this.fetchDate= data.Date
          })
          .catch((err)=>{
            console.log('something went wrong'+err);
          })
    }
  }
});
