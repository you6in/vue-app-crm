<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.typeText}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency('RUB')}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('date')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с id={{$route.params.id}} не найдена</p>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data: () => ({
      loading: true,
      record: null
    }),
    async mounted() {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
        categoryName: category.title,
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
        typeClass: record.type === 'income' ? 'green' : 'red',
      }

      this.loading = false
    }
  }
</script>
