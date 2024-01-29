<template>
  <div class="current-post">
    <div class="current-post__container">
      <h1 class="current-post__title">
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
          class="current-post__result"
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
    name: "CurrentPost",
  
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
        'currentPostData'
      ]),
  
      pageTitle() {
        let text = `Страница редактирования поста № `
        if (this.currentPostData) {
          text += this.currentPostData.id
        }

        return text
      },

      formatfieldData() {
        let data = null
        if (this.currentPostData) {
          console.log(this.currentPostData)
          data = [{
              model: 'title',
              label: 'Заголовок',
              type: 'text',
              value: this.currentPostData.title
            },
            {
              model: 'body',
              label: 'Текст',
              type: 'text',
              value: this.currentPostData.body
            },
            {
              model: 'userId',
              label: 'ID пользователя',
              type: 'text',
              value: String(this.currentPostData.userId)
            },
          ]
        }
        return data
      }
    },

    methods: {
      ...mapActions([
        'getCurrentPost',
        'updatePost'
      ]),

      async defaultData() {
        let userId = this.$route.params.id
        await this.getCurrentPost(userId)
      },

      async saveData(data){
        this.resultText = null
        this.isLoading = true
        let sendObj = {
          id: this.currentPostData.id,
          body: {
            ...this.currentPostData,
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

        let result = await this.updatePost(sendObj)
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
  .current-post {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    
    
  }

</style>