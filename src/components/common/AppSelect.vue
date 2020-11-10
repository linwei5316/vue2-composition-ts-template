<template>
  <v-select
	  v-model="valueHandler"
    :items="options"
    itemText="label"
	  :placeholder="placeholder"
    outlined
	  dense
    hideDetails="auto"
  />
</template>

<script lang="ts">
import { Option } from "@/interface/common";
import {defineComponent, SetupContext} from "@vue/composition-api";
import { useVModelDeliver } from "@/tool/componentTool";

interface Props {
	value: string | number | boolean;
	options: Option[];
	placeholder: string;
}

export default defineComponent({
  name: "AppSelect",
  props: {
  	value: {
  		type: [String, Number, Boolean],
  		required: true,
	  },
    options: {
      type: Array,
      required: true,
    },
	  placeholder: {
		  type: String,
		  default: "",
	  },
  },
	setup(props: Props, context: SetupContext) {
		const valueHandler = useVModelDeliver(props, context);

		return {
			valueHandler,
		}
	}
})
</script>

<style scoped>

</style>
