<template>
  <div class="base-pagination">
    <div class="base-pagination__inner">
      <div
        v-for="page in totalPages"
        :key="page"
        :class="['base-pagination__item', {'base-pagination__item--active':isActiveItem(page)}]"
        @click="clickHandler(page)"
      >
        {{page}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BasePagination',

    props: {
      limit: {
        type: Number,
        require: false,
        default: 20
      },

      total: {
        type: Number,
        require: false,
        default: null
      },

      activePage: {
        type: Number,
        require: false,
        default: 1
      }
    },

    computed: {
      totalPages() {
        return Math.ceil(this.total / this.limit)
      }
    },

    methods: {
      clickHandler(page) {
        if (page !== this.activePage) {
          this.$emit('click', page)
        }
      },

      isActiveItem(page) {
        return page === this.activePage
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-pagination {
    &__inner {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &__item {
      padding: 0 12px;
      cursor: pointer;
      transition: color $duration-1 ease-in;

      &:hover {
        color: $color-third;
      }
    }

    &__item--active {
      color: $color-third;
    }
  }
</style>