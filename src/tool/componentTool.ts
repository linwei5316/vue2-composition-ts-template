import {SetupContext, UnwrapRef, ref, computed, reactive, Ref} from "@vue/composition-api";
import {ValidatableRef, PageMainTableModalMeta, Tab} from "@/interface/common";

export const useVModelDeliver = <P extends { value: any }>(props: P, context: SetupContext) => {
  return computed({
    get() {
      return props.value;
    },
    set(newValue) {
      context.emit("input", newValue);
    }
  });
}

export const useRef = <V = any>(value: V) => {
  const valueRef = ref<V>(value);

  return [
    valueRef,
    (newValue: UnwrapRef<V>) => { valueRef.value = newValue },
  ]
}

type UseModalHandlerType = "flag" | "ID";
type ModalValue<V extends UseModalHandlerType> = V extends "flag"
  ? boolean
  : V extends "ID"
    ? number | null
    : never;
interface ModalData<V extends UseModalHandlerType> {
  value: V extends "flag"
    ? boolean
    : V extends "ID"
      ? number | null
      : never;
  meta?: PageMainTableModalMeta;
}
type SetModalHandler<T extends UseModalHandlerType> = T extends "flag"
  ? (value: boolean, meta?: (PageMainTableModalMeta | undefined)) => void
  : T extends "ID"
    ? (activeId: (number | null), meta?: (PageMainTableModalMeta | undefined)) => void
    : never;

export const useFlagModalHandler = (meta?: PageMainTableModalMeta): [{value: ModalValue<"flag">, meta?: { editable: boolean } | undefined}, SetModalHandler<"flag">] => {
  const valueReactive = reactive<ModalData<"flag">>({
    value: false,
    meta,
  });

  const setModalHandler = (value: boolean, meta?: PageMainTableModalMeta) => {
    valueReactive.value = value;
    if (meta) {
      valueReactive.meta = meta;
    }
  }

  return [
    valueReactive,
    setModalHandler
  ]
}

export const useIdModalHandler = (meta?: PageMainTableModalMeta): [{value: ModalValue<"ID">, meta?: { editable: boolean } | undefined}, SetModalHandler<"ID">] => {
  const valueReactive = reactive<ModalData<"ID">>({
    value: null,
    meta,
  });

  const setModalHandler = (activeId: number | null, meta?: PageMainTableModalMeta) => {
    valueReactive.value = activeId;
    if (meta) {
      valueReactive.meta = meta;
    }
  }

  return [
    valueReactive,
    setModalHandler
  ]
}

export const useForm = <F, P extends { value: any, formData: F }>(props: P, context: SetupContext) => {
  const formRef = ref<ValidatableRef | null>(null);

  const validate = () => {
    return (formRef.value as ValidatableRef).validate();
  };

  const setFormDataFactory = (key: keyof F) => {
    return computed({
      get() {
        return props.formData[key];
      },
      set(newValue) {
        context.emit("update:form", {
          key,
          value: newValue,
        });
      }
    });
  }

  return {
    formRef,
    setFormDataFactory,
    validate,
  };
}

export const useTab = (tabList: Tab[]) => {
  const activeTabIndex = ref(0);

  const activeTabValue = computed(() => {
    return tabList[activeTabIndex.value].value;
  });

  return {
    activeTabIndex,
    activeTabValue,
  }
}
