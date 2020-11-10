<template>
  <v-btn
    depressed
    :outlined="isOutlined"
    :color="colorType"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import {computed, defineComponent} from "@vue/composition-api";

interface Props {
  type: "normal" | "primary";
}

export default defineComponent({
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "normal"
    },
  },
  setup(props: Props) {
    const isOutlined = computed(() => {
      return props.type === "normal";
    });

    const colorType = computed(() => {
      switch (props.type) {
        case "normal":
          return ""
        case "primary":
          return "primary";
      }
    });

    return {
      isOutlined,
      colorType,
    }
  },
})
</script>

<style scoped>

</style>
