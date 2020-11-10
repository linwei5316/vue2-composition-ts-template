<template>
	<v-text-field
    v-model="valueMiddleware"
    @input="setValueMiddleware"
		outlined
		dense
    :hideDetails="hideDetails"
		v-bind="$attrs"
    v-on="eventListeners"
	></v-text-field>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch, SetupContext} from "@vue/composition-api";
import { numberFilter } from "@/tool/regExp";

type PropValue = string | number;
interface Props {
	value: PropValue;
  format: "unformatted" | "number";
  hideDetails: boolean | "auto";
}

export default defineComponent({
	name: "AppTextInput",
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
    format: {
      type: String,
      default: "unformatted",
    },
    hideDetails: {
      type: [String, Boolean],
      default: "auto",
    },
	},
	setup(props: Props, { emit, listeners, root }: SetupContext) {
    const valueMiddleware = ref<string>("");
    watch(() => props.value, () => {
      valueMiddleware.value = String(props.value);
    }, {immediate: true});

    const setValueMiddleware = (newValue: string) => {
      let handleString: string = newValue;
      switch (props.format) {
          case "number":
            handleString = numberFilter(newValue);
            emit("input", Number(handleString));
            break;

          case "unformatted":
            emit("input", handleString);
            break;

          default:
            break;
      }

      root.$nextTick(() => {
        valueMiddleware.value = handleString;
      })
    };

    const eventListeners = computed(() => {
      const result = { ...listeners };

      Reflect.deleteProperty(result, "input");

      return result;
    })

		return {
      valueMiddleware,
      setValueMiddleware,
      eventListeners,
		}
	}
});
</script>

<style scoped>

</style>
