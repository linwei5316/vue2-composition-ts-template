import Vue from "vue/types/vue";

export interface Option {
  label: string;
  value: string | boolean | number;
}

export interface Tab {
  value: number;
  text: string;
}

export interface PageMainTableModalMeta {
  editable: boolean;
}

export type ValueOf<T> = T[keyof T];

export interface ValidatableRef extends Vue {
  validate: () => boolean;
}

export interface FormComponentRef extends ValidatableRef {
  validations: string[];
}

export interface UpdateFormContext<T> {
  key: keyof T;
  value: T[UpdateFormContext<T>["key"]];
}
