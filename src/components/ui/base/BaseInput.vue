<template>
  <div class="base-input">
    <input 
      class="base-input__item" 
      :type="type"
      :value="value"
      required=""
      @input="inputHandler($event)"
    />
    <label class="base-input__label" >{{label}}</label>		
  </div>
</template>

<script>
  export default {
    name: "BaseInput",

    props: {
      label: {
        type: String,
        require: false,
        default: null
      },

      type: {
        type: String,
        require: false,
        default: 'text'
      },

      value: {
        type: String,
        require: false,
        default: null
      }
    },

    methods: {
      inputHandler(event) {
        this.$emit('input',event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .base-input {
    position: relative;
    margin-bottom: 20px;
    width: 100%;

    &__label {
      position: absolute;
      top: 0px;
      left: 0px;
      font-size: 16px;
      pointer-event: none;
      transition: top $duration-1 ease-in-out,
                  font-size $duration-1 ease-in-out;
    }

    &__item { 
      border:0;
      border-bottom:2px solid $color-main;  
      background:transparent;
      width:100%;
      padding:8px 0 5px 0;
      font-size:16px;
      transition: border-bottom $duration-1 ease-in-out;

      &:focus{ 
        border:none;	
        outline:none;
        border-bottom:2px solid $color-secondary;	
      }

      &:valid,
      &:focus {
        ~ .base-input__label{
          top:-12px;
          font-size:12px;
        }
      }
    }
  }
</style>