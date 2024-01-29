<template>
  <div class="default-layout">
    <aside class="default-layout__aside">
      <slot name="aside"></slot>
    </aside>
    
    <div class="default-layout__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout"
}
</script>

<style lang="scss" scoped>
  .default-layout {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 20px;

    &__aside {
      height: 100vh;
      width: 100%;
    }

    &__content {
      width: 100%;
      padding: 15px 0;
      box-sizing: border-box;
    }
  }
</style>