<template>
  <div :class="[
      'uploadImageContainer',
      { disabled: disabled },
    ]"
  >
    <div>
      <div
        v-if="value && value !== ''"
        class="d-flex align-center"
      >
        <span class="pa-2">{{ value }}</span>

        <v-icon
          v-if="!disabled"
          class="pa-2 ml-2"
          @click="clearHandler"
        >mdi-close-circle-outline</v-icon>
      </div>
      <div v-else class="d-flex align-center">
        <AppButton
          :disabled="disabled"
          type="primary"
          @click="toggleFileInput"
          :loading="loading"
        >Upload</AppButton>

        <span
          v-if="validationErrorStatus"
          class="ml-2 error--text text-caption"
        >
          {{ errorMessage }}
        </span>
      </div>

      <!--  處理外層表單驗證監聽錯誤  -->
      <v-text-field
        ref="formValidatorRef"
        v-if="isRequired"
        class="d-none"
        :value="value"
        :rules="[validateRules.string.required()]"
        disabled
      />
      <input
        ref="fileInputRef"
        v-show="false"
        type="file"
        @change="uploadHandler"
        :accept="fileInputAcceptAttribute"
      />
    </div>

    <div v-if="value" class="mt-2">
      <img
        class="previewImage"
        :src="previewImageSrc"
        alt="previewImage"
      />
    </div>

    <v-dialog
      v-model="limitationError.value"
      :maxWidth="400"
    >
      <v-card class="errorDialog pa-2 text--white text-center">
        {{ limitationError.message }}
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, reactive, watch, onMounted} from "@vue/composition-api";
import validateRules from "@/tool/validateRules";
import { parseImage, KB, MB } from "@/tool/functionalTool";
import { FormComponentRef } from "@/interface/common";

interface Limitation {
  maxWidth?: number;
  maxHeight?: number;
  kb?: number;
  mb?: number;
}

interface Props {
  value: string;
  allowExtension: string[];
  isRequired: boolean;
  errorMessage: string;
  disabled: boolean;
  limitation?: Limitation;
}

export default defineComponent({
  name: "AppImageUploader",
  props: {
    value: {
      type: String,
      required: true,
    },
    allowExtension: {
      type: Array,
      default: () => (["png", "jpg", "jpeg"]),
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "Please upload image",
    },
    limitation: {
      type: Object,
      default: undefined,
    },
  },
  setup(props: Props, { emit }) {
    const loading = ref(false);
    const validationErrorStatus = ref(false);
    const fileInputRef = ref<HTMLInputElement | null>(null);
    const uploadedImageInfo = reactive({
      width: 0,
      height: 0,
      bytes: 0,
    });
    const limitationError = reactive({
      value: false,
      message: "",
    })
    const setLimitationError = (message: string) => {
      limitationError.value = true;
      limitationError.message = message;
    }

    watch(() => limitationError.value, (newValue) => {
      if (!newValue) {
        limitationError.message = "";
      }
    })

    const fileInputAcceptAttribute = computed(() => {
      return props.allowExtension
        .map((extension) => "." + extension)
        .join(",")
    });
    const previewImageSrc = computed(() => {
      return props.value === ""
        ? ""
        : process.env.IMAGE_URL_ORIGIN + props.value;
    });


    const toggleFileInput = () => {
      (fileInputRef.value as HTMLInputElement).click();
    }

    const checkLimitationHandler = {
      max: (limitationKey: keyof Limitation, imageInfoValue: number) => {
        if (props.limitation && props.limitation[limitationKey]) {

          const limitationValue = ((props.limitation as Limitation)[limitationKey] as number);

          if (imageInfoValue > limitationValue) {
            setLimitationError("Error file format!");
            clearHandler();
          }
        }
      },
    }


    const uploadHandler = (event: Event) => {
      loading.value = true;

      const files = (event.target as HTMLInputElement)?.files;

      if (files?.length && (files as FileList).length > 0) {
        // 保留多檔案拓展性
        const targetFile = files[0];

        if (targetFile.name.lastIndexOf(".") <= 0) {
          return;
        }

        const extension = targetFile.name.split(".")[1];
        if(!props.allowExtension.includes(extension)) {
          return;
        }


        parseImage(targetFile).then((result) => {
          uploadedImageInfo.width = result.width;
          uploadedImageInfo.height = result.height;
          uploadedImageInfo.bytes = targetFile.size;

          checkLimitationHandler.max("kb", KB(uploadedImageInfo.bytes));
          checkLimitationHandler.max("mb", MB(uploadedImageInfo.bytes));
          checkLimitationHandler.max("maxWidth", uploadedImageInfo.width);
          checkLimitationHandler.max("maxHeight", uploadedImageInfo.height);

          loading.value = false;
          if (limitationError.value) {
            return;
          }
          // connect API
          emit("input", "");
        })

      }
    }

    const clearHandler = () => {
      (fileInputRef.value as HTMLInputElement).value = "";
      emit("input", "");
    }



    // watch vuetify validation rules
    const formValidatorRef = ref<FormComponentRef | null>(null);
    onMounted(() => {
      watch(() => ((formValidatorRef.value as FormComponentRef).validations.length), (newValue: number) => {
        validationErrorStatus.value = newValue > 0;
      })
    })

    return {
      formValidatorRef,
      loading,
      fileInputAcceptAttribute,
      validationErrorStatus,
      uploadHandler,
      clearHandler,
      toggleFileInput,
      fileInputRef,
      previewImageSrc,
      validateRules,
      limitationError
    }
  }
});
</script>

<style lang="scss" scoped>
.uploadImageContainer {
  .previewImage {
    max-width: 600px;
  }

  &.disabled {
    pointer-events: none;
  }
}

.errorDialog {
  background-color: var(--v-error-base);
  color: #fff;
  opacity: 0.8;
}
</style>
