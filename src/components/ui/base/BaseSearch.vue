<template>
  <div class="base-search">
    <BaseInput
      class="base-search__input"
      :label="'Поиск'"
      v-model="searchData"
      @input="handlerInput"
    />

    <div
      v-if="searchData"
      class="base-search__clear"
      @click="resetSearch"
    ></div>
  </div>
</template>

<script>
  import BaseInput from '@/components/ui/base/BaseInput.vue'

  export default {
    name: 'BaseSearch',

    components: {
      BaseInput
    },

    data() {
      return {
        searchData: null
      }
    },

    methods: {
      handlerInput(data) {
        this.$emit('search', data)
      },

      resetSearch() {
        this.searchData = null
        this.handlerInput(null)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-search {
    width: 400px;
    position: relative;
  
    &__input {

    }

    &__clear {
      width: 14px;
      height: 14px;
      opacity: 0.2;
      cursor: pointer;
      transition: opacity $duration-1 ease;
      position: absolute;
      right: 4px;
      top: 8px;

      &:hover {
        opacity: 1;
      }
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 10px;
        display: block;
        width: 14px;
        height: 2px;
        background: $color-main;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
</style>