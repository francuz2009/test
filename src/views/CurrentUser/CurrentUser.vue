<template>
  <div class="current-user">
    <div class="current-user__container">
      <h1 class="current-user__title">
        {{pageTitle}}
      </h1>
      <PageContentFields
        :field-data="formatfieldData"
        :loading="isLoading"
        @save="saveData"
      />

      <transition name="fade">
        <div 
          v-if="resultText" 
          class="current-user__result"
        >
          {{resultText}}
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
  import PageContentFields from '@/components/PageContentFields.vue'
  import { mapActions,mapGetters } from 'vuex'

  export default {
    name: "CurrentUser",
  
    components: {
      PageContentFields
    },

    data() {
      return {
        resultText: null,
        isLoading: false
      }
    },

    async mounted() {
      await this.defaultData()
    },

    computed: {
      ...mapGetters([
        'currentUserData'
      ]),
  
      pageTitle() {
        let text = `Страница пользователя`
      
        if (this.currentUserData) {
          let userName = ` ${this.currentUserData.lastName} ${this.currentUserData.firstName} ${this.currentUserData.maidenName}`
          text += userName
        }

        return text
      },

      formatfieldData() {
        let data = null
        if (this.currentUserData) {
          data = [{
              model: 'lastName',
              label: 'Фамилия',
              type: 'text',
              value: this.currentUserData.lastName
            },
            {
              model: 'firstName',
              label: 'Имя',
              type: 'text',
              value: this.currentUserData.firstName
            },
            {
              model: 'maidenName',
              label: 'Отчество',
              type: 'text',
              value: this.currentUserData.maidenName
            },
            {
              model: 'birthDate',
              label: 'День рождения',
              type: 'date',
              value: this.currentUserData.birthDate
            },
            {
              model: 'companyName',
              label: 'Название компании',
              type: 'text',
              value: this.currentUserData.company.name
            },
            {
              model: 'address.city',
              label: 'Город проживания',
              type: 'text',
              value: this.currentUserData.address.city
            },
            {
              model: 'address.address',
              label: 'Адресс',
              type: 'text',
              value: this.currentUserData.address.address
            }

          ]
        }
        return data
      }
    },

    methods: {
      ...mapActions([
        'getCurrentUser',
        'updateUser'
      ]),

      async defaultData() {
        let userId = this.$route.params.id
        await this.getCurrentUser(userId)
      },

      async saveData(data){
        this.resultText = null
        this.isLoading = true
        let sendObj = {
          id: this.currentUserData.id,
          body: {
            ...this.currentUserData,
          }
        }

        Object.keys(data).forEach(key => {
          if (key.includes('.')) {
            const keys = key.split('.');
            let nestedObj = sendObj.body;

            for (let i = 0; i < keys.length - 1; i++) {
              nestedObj = nestedObj[keys[i]];
            }

            nestedObj[keys[keys.length - 1]] = data[key];
          } else {
            sendObj.body[key] = data[key];
          }
        })

        let result = await this.updateUser(sendObj)
        if (result === 200) {
          this.resultText = 'Ура! Данные обновились'
        } else {
          this.resultText = 'Упс, что-то не то'
        }

        this.isLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .current-user {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    
    
  }

</style>