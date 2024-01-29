<template>
  <DefaultLayout class="pages">
    <template #aside>
      <BaseNavigation />
    </template>
    <transition name="fade">
      <PageContentTable
        :title="title"
        :total="totalCountPosts"
        :limit-for-pagination="itemsPerPage"
        :table-data="formatDataForTable"
        :active-page="activePage"
        @choose-item="checkAdditionalInfo"
        @change-pagination="changePagination"
        @search="search"
      />
    </transition>
  </DefaultLayout>
</template>

<script>
  import DefaultLayout from '@/components/layouts/DefaultLayout'
  import BaseNavigation from '@/components/ui/base/BaseNavigation'
  import PageContentTable from '@/components/PageContentTable'
  import { mapActions, mapGetters } from 'vuex'


  export default {
    name: "PagesExample",

    components: {
      DefaultLayout,
      BaseNavigation,
      PageContentTable
    },

    data() {
      return {
        itemsPerPage: 16,
        activePage: Number(this.$route.query?.page) || 1
      }
    },   

    async mounted() {
      await this.setDefaultData()
    },

    computed:{
      ...mapGetters([
        'totalCountPosts',
        'allPosts'
      ]),

      formatDataForTable() {
        return {
          header: this.headerForTable,
          rows: this.rowsForTable
        }
      },

      title() {
        return `Всего пользователей ${this.totalCountPosts}`
      },

      headerForTable() {
        return ['id', 'Название', 'Текст', 'Теги', 'Реакции']
      },

      rowsForTable() {
        let currentPosts = this.allPosts
        let dataForTable = currentPosts.map(el => {
          return {
            id: el.id,
            title: el.title,
            body: el.body,
            tags: el.tags.join(', '),
            reactions: el.reactions
          }
        })

        return dataForTable
      }
    },

    methods: {
      ...mapActions([
        'getPosts',
        'searchPost'
      ]),

      async getPostsData() {
        let queryData = {
          limit: this.itemsPerPage,
          skip: this.itemsPerPage * (this.activePage - 1)
        }
        await this.getPosts(queryData)
      },

      changePagination(data = null) { 
        if (data) {
          this.activePage = data
        }

        let routeObject = {
          name: this.$route.name,
          params: this.$route.params,
          query: {
            page: this.activePage
          }
        }
        this.$router.push(routeObject)

      },

      async setDefaultData() {        
        if (!this.allUsers) {
          await this.getPostsData()
        }
      },

      checkAdditionalInfo(data) {
        this.$router.push({
          name: 'Post',
          params: {
            id: data.id
          }
        })
      },

      async search(data) {
        if (data) {
          await this.searchPost(data)
        } else {
          await this.getPostsData()
        }
      }
    },

    watch: {
      async $route() {
        await this.getPostsData()
      },
    }
  }
</script>