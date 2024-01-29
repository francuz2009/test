<template>
  <button 
    class="base-button"
    :type="type"
    @click="eventClick()"
  >
    <transition name="fade">
      <span 
        v-if="loading"
        class="base-button__loader"
      ></span>
    </transition>
    <span class="base-button__text">
      {{text}}
    </span>
  </button>
</template>

<script>
  export default {
    name: "BaseButton",

    props: {
      text: {
        type: String,
        require: false,
        default: null
      },

      type: {
        type: String,
        require: false,
        default: 'submit'
      },

      loading: {
        type: Boolean,
        require: false,
        default: false
      }
    },

    methods: {
      eventClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .base-button {
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 1px;
    padding: 12px 18px;
    outline: 0;
    border: 1px solid $color-main;
    cursor: pointer;
    position: relative;
    background-color: transparent;
    user-select: none;
    -webkit-user-select: none;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:after {
      content: "";
      background-color: $color-secondary;
      width: 100%;
      z-index: -1;
      position: absolute;
      height: 100%;
      top: 7px;
      left: 7px;
      transition: 0.2s;
    }

    &:hover:after {
      top: 0px;
      left: 0px;
    }

  &__loader {
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    left: 12px;
    background: transparent;
    box-sizing: border-box;
    border-top: 2px solid $color-main;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-radius: 100%;
    animation-delay: 0.5s;
    animation: spin $duration-2 ease-out infinite;
    transition:all ease 0.5s;
  }

  &__text {
    margin: 0 26px;
  }
 
}
@keyframes spin {
  100% {transform: rotate(360deg)}
}

</style>