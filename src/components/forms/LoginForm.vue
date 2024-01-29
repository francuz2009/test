<template>
  <div 
    class="login-form"
  >
		<h1 class="login-form__title">Введите логин и пароль</h1>

    <form 
      class="login-form__container"
      @submit.prevent="onSubmit"
    >
      <BaseInput
        class="login-form__input"
        :label="'Логин'"
        v-model="login"
      />

      <BaseInput
        class="login-form__input"
        :label="'Пароль'"
        :type="'password'"
        v-model="password"
      />

      <transition name="fade">
        <div 
          v-if="errors"
          class="login-form__error"
        >
          {{errors}}
        </div>
      </transition>
  
      <BaseButton
        class="login-form__btn"
        :text="'Войти'"
        :loading="loading"
      />
    </form>

  </div>	
</template>

<script>
  import BaseInput from '@/components/ui/base/BaseInput.vue'
  import BaseButton from '@/components/ui/base/BaseButton.vue'

  export default {
    name: 'LoginForm',

    components: {
      BaseInput,
      BaseButton
    },

    props: {
      errors: {
        type: String,
        require: false,
        default: null
      },

      loading: {
        type: Boolean,
        require: false,
        default: false
      }
    },

    data() {
      return {
        login: '',
        password: ''
      }
    },

    methods: {
      onSubmit() {
        this.$emit('click', {
          username: this.login,
          password:  this.password
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .login-form {
    width: 320px;
    padding: 16px;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    border-radius: 8px;
    border: 2px solid $color-main;
    box-shadow: 0.5rem 0.5rem 0 $color-main;

    &__title {
      margin-bottom: 20px;
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;

    }

    &__error {
      position: absolute;
      bottom: 70px;
      color: $color-error;
    }

    &__btn {
      margin-top: 20px;
    }
  }

</style>