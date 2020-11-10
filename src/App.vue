<template>
  <div class="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";

export default defineComponent({
  name: "App",
  setup() {

  }
})
</script>

<style lang="scss">
@import "src/assets/scss/global.scss";

.app {

}
</style>
