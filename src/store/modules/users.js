import { getData } from '@/api/fetch'

const endpointURL = 'users'

export default {
  state:{
    user: null,
    users: null,
    totalUser: null,
    currentUser: null,
  },

  actions: {
    async auth({commit}, data) {
      let authData = await getData('auth/login', data)

      if (authData.status === 200) {
        commit('UPDATE_USER', authData.data)
        sessionStorage.setItem('user', JSON.stringify(authData.data))
        return
      }
      if (authData.status === 400) {
        return 'Неверный логин или пароль'
      }
    },

    async getUsers({commit}, urlQuery = null) {
      let currentEndpointURL = endpointURL
      if (urlQuery) {
        let queryString = new URLSearchParams(urlQuery);
        currentEndpointURL += `?${queryString.toString()}`
      }

      let usersData = await getData(currentEndpointURL, null, 'GET')

      if (usersData.status === 200) {
        commit('UPDATE_USERS', usersData.data.users)
        commit('UPDATE_TOTAL_USERS', usersData.data.total)
        return
      }
    },

    async getCurrentUser({commit}, userId) {
      let usersData = await getData(`${endpointURL}/${userId}`, null, 'GET')
      commit('UPDATE_CURRENT_USER', usersData.data)
    },

    async updateUser({commit}, params) {
      let userId = params.id
      let usersData = await getData(`${endpointURL}/${userId}`, params.body, 'PUT')
      commit('UPDATE_CURRENT_USER', usersData.data)
      return usersData.status
    },

    async searchUser({commit}, searchQuery){
      let userData = await getData(`${endpointURL}/search?q=${searchQuery}`,null, 'GET')
      console.log(userData)
      commit('UPDATE_USERS', userData.data.users)
      commit('UPDATE_TOTAL_USERS', userData.data.total)
    }
  },

  mutations: {
    'UPDATE_USER'(state, newValue) {
      state.user = newValue
    },
    'UPDATE_USERS'(state, newValue) {
      state.users = newValue
    },
    'UPDATE_TOTAL_USERS'(state, newValue) {
      state.totalUser = newValue
    },
    'UPDATE_CURRENT_USER'(state, newValue) {
      state.currentUser = newValue
    },
  },

  getters: {
    userData(state) {
      return state.user
    },

    allUsers(state) {
      return state.users
    },

    totalCountUsers(state) {
      return state.totalUser
    },

    currentUserData(state) {
      return state.currentUser
    }
  }
}