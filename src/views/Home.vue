<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading"></loader>

    <div class="row" v-else>
      <home-bill
        :rates="currency.rates"
      >

      </home-bill>
      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      ></home-currency>
    </div>
  </div>
</template>

<script>
  import HomeBill from './../components/HomeBill'
  import HomeCurrency from './../components/HomeCurrency'
export default {
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeCurrency,
    HomeBill
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    console.log(this.currency)
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
