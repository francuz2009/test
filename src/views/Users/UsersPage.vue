
<template>
  <DefaultLayout class="users">
    <template #aside>
      <BaseNavigation />
    </template>
    <transition name="fade">
      <PageContentTable
        :title="title"
        :total="totalCountUsers"
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
    name: "UsersPage",

    components: {
      BaseNavigation,
      DefaultLayout,
      PageContentTable
    },

    async mounted() {
      await this.setDefaultData()
    },

    data() {
      return {
        itemsPerPage: 16,
        activePage: Number(this.$route.query?.page) || 1
      }
    },   

    computed:{
      ...mapGetters([
        'totalCountUsers',
        'allUsers'
      ]),

      formatDataForTable() {
        return {
          header: this.headerForTable,
          rows: this.rowsForTable
        }
      },

      title() {
        return `Всего пользователей ${this.totalCountUsers}`
      },

      headerForTable() {
        return ['id', 'Фамилия', 'Имя', 'Отчество', 'День рождения', 'Адресс','Компания']
      },

      rowsForTable() {
        let curentUsers = this.allUsers
        let dataForTable = curentUsers.map(el => {
          let userAddress = []
          if (el.address.city) {
            userAddress.push(el.address.city)
          }

          if (el.address.address) {
            userAddress.push(el.address.address)
          }
          return {
            id: el.id,
            lastName: el.lastName,
            firstName: el.firstName,
            maidenName: el.maidenName,
            birthDate: el.birthDate,
            address: userAddress.join(', '),
            company: el.company.name,
          }
        })

        return dataForTable
      }
    },

    methods: {
      ...mapActions([
        'getUsers',
        'searchUser'
      ]),

      async getUsersData() {
        let queryData = {
          limit: this.itemsPerPage,
          skip: this.itemsPerPage * (this.activePage - 1)
        }
        await this.getUsers(queryData)
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
          await this.getUsersData()
        }
      },

      checkAdditionalInfo(data) {
        this.$router.push({
          name: 'User',
          params: {
            id: data.id
          }
        })
      },

      async search(data) {
        if (data) {
          await this.searchUser(data)
        } else {
          await this.getUsersData()
        }
      }
    },

    watch: {
      async $route() {
        await this.getUsersData()
      },
    }
  }
</script>