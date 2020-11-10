<template>
  <div class="dashboardContainer">
    <router-view />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";

export default defineComponent({
  name: "Dashboard",
})
</script>

<style lang="scss" scoped>

</style>
