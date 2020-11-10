<template>
  <v-textarea
    v-model="valueHandler"
    outlined
    hideDetails="auto"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-textarea>
</template>

<script lang="ts">
import {defineComponent, SetupContext} from "@vue/composition-api";
import {useVModelDeliver} from "@/tool/componentTool";

interface Props {
  value: any;
}

export default defineComponent({
  name: "AppTextArea",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props: Props, context: SetupContext) {
    const valueHandler = useVModelDeliver(props, context);

    return {
      valueHandler,
    }
  }
});
</script>

<style scoped>

</style>
