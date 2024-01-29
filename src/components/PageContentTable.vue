<template>
  <div class="page-content-table">
    <div
      v-if="total"
      class="page-content-table__inner"
    >
      <h2 class="page-content-table__title">
        {{title}}
      </h2>
      <BaseSearch
        class="page-content-table__search"
        @search="handlerSearch"
      />
      <BaseTable
        class="page-content-table__table"
        :header="tableData?.header"
        :rows="tableData?.rows"
        @click="chooseItem"
      />

      <BasePagination
        class="page-content-table__pagination"
        :limit="limitForPagination"
        :total="total"
        :active-page="activePage"
        @click="changePagination"
      />
    </div>
    <div 
      v-else
      class="page-content-table__inner"
    >
      <h2 class="page-content-table__title">
        Ошибка поиска
      </h2>

      <BaseButton
        :text="'Назад'"
        class="page-content-table__btn"
        @click="handlerSearch"
      />
    </div>
  </div>
</template>

<script>
  import BaseSearch from '@/components/ui/base/BaseSearch'
  import BaseTable from '@/components/ui/base/BaseTable'
  import BasePagination from '@/components/ui/base/BasePagination'
  import BaseButton from '@/components/ui/base/BaseButton.vue'

  export default {
    name:'PageContentTable',

    props: {
      title: {
        type: String,
        require: false,
        default: null
      },

      tableData: {
        type: Object,
        require: false,
        default: null
      },

      limitForPagination: {
        type: Number,
        require: false,
        default: null
      },

      total: {
        type: Number,
        require: false,
        default: null
      },
  
      activePage: {
        type: Number,
        require: false,
        default: null
      }
    },

    components: {
      BaseSearch,
      BaseTable,
      BasePagination,
      BaseButton
    },

    methods: {
      changePagination(data) {
        this.$emit('change-pagination', data)
      },

      chooseItem(data) {
        this.$emit('choose-item',data)
      },

      handlerSearch(data) {
        this.$emit('search', data)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .page-content-table {
    &__inner {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }

    &__btn {
      width: 200px;
    }
  }
</style>