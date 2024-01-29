<template>
  <div class="base-navigation">
    <div class="base-navigation__inner">
      <div class="base-navigation__list">
        <router-link 
          v-for="(item, idx) in navigation"
          :key="idx"
          :class="['base-navigation__list-item', {'base-navigation__list-item--active': isActive(item.name)}]"
          :to="item.link"
        >
          <svg class="base-navigation__list-item-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <g fill="none" stroke="#212121" class="base-navigation__list-item-icon-arrow" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10">
              <path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
            </g>
          </svg>

          <div class="base-navigation__list-item-text">
            {{item.text}}
          </div>
          
        </router-link >

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseNavigation",

    data() {
      return {
        navigation: [{
          text: 'Пользователи',
          name: 'User',
          link: '/user'
        },
        {
          text: 'Посты',
          name: 'Post',
          link: '/post'
        }
        ]
      }
    },

    methods: {
      isActive(name) {
        return this.$route.name.includes(name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-navigation {
    height: 100vh;
    box-shadow: rgba($color-main, 0.15) 1.95px 0 2.6px;

    &__inner {
      height: 100%;
    }

    &__list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 0 16px;
    }

    &__list-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;

      &:hover {
        &::v-deep {
          .base-navigation__list-item-text {
            color: $color-third;
          }

          .base-navigation__list-item-icon-arrow {
            stroke: $color-third;
          }
        }

      }
    }

    &__list-item--active {
      &::v-deep {
        .base-navigation__list-item-text {
          color: $color-third;
        }

        .base-navigation__list-item-icon-arrow {
          stroke: $color-third;
        }
      }
    }

    &__list-item-icon-arrow {
      transition: stroke $duration-1 ease-in;
    }

    &__list-item-text {
      transition: color $duration-1 ease-in;
    }
    
    &__list-item-icon {
      margin-right: 8px;
    }
  }
</style>