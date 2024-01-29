<template>
  <div class="main">
    <transition name="fade">
      <LoginForm
        v-if="!isUserAuth"
        :errors="authErrors"
        :loading="loading"
        @click="getAuthData"
      />
    </transition>
  </div>
</template>

<script>
  import LoginForm from '@/components/forms/LoginForm'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    // eslint-disable-next-line
    name: "MainPage",

    components: {
      LoginForm
    },

    data() {
      return {
        authErrors: null,
        loading: false
      }
    },

    computed:{
      ...mapGetters([
        'userData'
      ]),

      isUserAuth() {
        return this.userData?.token.length
      }
    },

    methods: {
      ...mapActions([
        'auth'
      ]),

      async getAuthData(userData) {
        this.authErrors = null
        this.loading = true
        let responce = await this.auth(userData)

        if (responce) {
          this.authErrors = responce
          this.loading = false
        }

        if (this.userData) {
          this.loading = false
          this.$router.push('/user')
        }        
      }
    }
  }
</script>

