<template>
  <v-dialog
    :value="value"
    :maxWidth="960"
    @click:outside="cancelHandler"
  >
    <v-card
      :disabled="loading"
      :loading="loading"
    >
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <slot name="content" />
      </v-card-text>

      <v-card-actions
        v-if="$slots.actions"
        class="justify-center pb-4"
      >
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "@vue/composition-api";

interface Props {
  value: any;
  title: string;
  loading: boolean;
}

export default defineComponent({
  name: "EditModal",
  props: {
    value: {
      type: undefined,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: Props, { emit }: SetupContext) {

    const confirmHandler = () => {

    }

    const cancelHandler = () => {
      emit("close");
    }

    return {
      confirmHandler,
      cancelHandler
    }
  },
})
</script>

<style scoped>

</style>
