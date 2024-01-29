<template>
  <div class="page-content-fields">
    <div class="page-content-fields__inner">
      <BaseInput
        v-for="(field, idx) in fieldData"
        :key="idx"
        class="page-content-fields__item"
        :label="field.label"
        :type="field.type"
        v-model="modelData[field.model]"
      />

      <BaseButton
        :text="'Сохранить'"
        :loading="loading"
        @click="clickHendler"
      />
    </div>
  </div>
</template>

<script>
  import BaseInput from '@/components/ui/base/BaseInput.vue'
  import BaseButton from '@/components/ui/base/BaseButton.vue'

  export default {
    name: 'PageContentFields',

    props: {
      fieldData: {
        type: Array,
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
        modelData: {},
        test: 'asda'
      }
    },

    components: {
      BaseInput,
      BaseButton
    },

    methods: {
      clickHendler() {
        this.$emit('save',this.modelData)
      },


    },

    watch: {
      fieldData(val) {
        this.modelData = {}
        val.forEach(field => {
          this.modelData[`${field.model}`] = field.value
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .page-content-fields {
  }

</style>