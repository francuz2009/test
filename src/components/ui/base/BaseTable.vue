<template>
  <table class="base-table">
    <thead class="base-table__thead">
      <tr class="base-table__tr">
        <th         
          v-for="(item, idx) in header"
          :key="idx"
          class="base-table__th"
        >
          <div class="base-table__title">{{item}}</div>
        </th>
      </tr>
    </thead>
    <tbody class="base-table__body">
      <tr 
        v-for="(row, i) in rows"
        :key="i"
        class="base-table__tr"
        @click="clickHandler(row)"
      >
        <td         
          v-for="(el, elIdx) in rowsItem(row)"
          :key="elIdx"
          class="base-table__td"
        >
          <div class="base-table__text">{{el}}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>


  export default {
    name: "BaseTable",

    props: {
      header: {
        type: Array,
        require: false,
        default: null
      },
      rows: {
        type: Array,
        require: false,
        default: null
      }
    },

    methods: {
      rowsItem(row) {
        let currentRowData = row
        delete currentRowData.link
        return Object.values(currentRowData)
      }, 

      clickHandler(row) {
        this.$emit('click',row)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-table {
    border-collapse: collapse;
    width:100%;

    &__thead {
      .base-table__tr {
        background-color: $color-main;
        border: 1px solid $color-main;
      }
    }

    &__tr {
      background-color: #f9fafb;
      cursor: pointer;
    }

    &__th {
      padding: 5px;
    }

    &__title {
      color: $default-color;
      font-weight: bold;
      font-size: 14px;
    }

    &__body {
      .base-table__tr {
        &:nth-child(odd) {
          background-color: #ffffff;
        }

        &:hover {
          background-color: #f9fafb;
        }
      }
    }

    &__td {
      padding: 5px;
      border: 1px solid #dddfe1;
    }

    &__text {
      color: #636363;
      font-size: 12px;
    }
  }

</style>