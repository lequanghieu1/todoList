<template>
  <div class="my-3">
    <label class="form-label">{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      autocomplete="off"
      v-model="inputValue"
      class="form-control"
      :class="{ 'is-invalid': errors[name] }"
      :title="errors[name]"
      @keyup="validateInput"
      @input="updateValue($event)"
      required
    >
    <div
      class="invalid-feedback"
      v-if="errors[name]"
    >
      {{ errors[name] }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
import stringGuard from "@/modules/stringGuard";

export default defineComponent({
  name: "ShowDialogInput",
  emits: ["setInput"],
  props: {
    name: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    input: {
      required: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    let inputValue = ref(stringGuard(props.input));
    const { validateNameField, errors } = useFormValidation();
    const validateInput = () => {
      validateNameField(props.name, inputValue.value);
    };
    const placeholder = "Enter " + props.label.toLowerCase();
    const updateValue = (e) => {
      emit("setInput", e.target.value);
    };

    return { placeholder, inputValue, errors, validateInput, updateValue };
  },
});
</script>

<style scoped></style>
