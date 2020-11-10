<template>
  <v-switch
    class="d-inline-flex mt-0"
    inset
    hideDetails="auto"
    :inputValue="propsValueToBoolean"
    @change="changeHandler"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import {computed, defineComponent, SetupContext} from "@vue/composition-api";
import {DataStatus} from "@/interface/common/enum";


type SwitcherValue = boolean | DataStatus;
interface Props {
  value: SwitcherValue;
}

export default defineComponent({
  name: "AppSwitcher",
  props: {
    value: {
      type: [Boolean, Number],
      required: true,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const isBoolean = (value: SwitcherValue): boolean => {
      return typeof value === "boolean"
    }

    const propsValueToBoolean = computed(() => {
      return isBoolean(props.value) ? props.value : Boolean(props.value);
    })

    const changeHandler = (value: SwitcherValue) => {
      const result = isBoolean(props.value)
        ? value
        : value
          ? DataStatus.Open
          : DataStatus.Close

      emit("input", result)
      emit("change", result)
    }

    return {
      propsValueToBoolean,
      changeHandler,
    }
  }
})
</script>

<style scoped>

</style>
