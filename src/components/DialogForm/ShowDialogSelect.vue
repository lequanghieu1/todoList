<template>
  <div class="my-3 ">
    <label class="form-label">{{ label }}</label>
    <select
      :value="inputValue"
      @input="updateValue($event)"
      class="form-select w-full py-2 border rounded"
    >
      <option
        v-for="optionState in getStates"
        :key="optionState"
        :value="optionState"
      >
        {{ optionState }}
      </option>
    </select>
  </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";
import stringGuard from "@/modules/stringGuard";
import useFormValidation from '../../modules/useFormValidation';

export default defineComponent({
    name: "ShowDialogSelect",
    emits: ["setSelect"],
    props: {
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
        const { validateNameField } = useFormValidation();
        let inputValue = ref(stringGuard(props.input));
        const StatesTodo = ["New","In progress", "Done", "Paused", "Canceled"]
        validateNameField('state', inputValue.value);
        const updateValue = (e) => {
            validateNameField('state', inputValue.value);
            inputValue.value = e.target.value;
            emit("setSelect", inputValue.value);
        };
        return { inputValue, updateValue, getStates: StatesTodo };
    },
});
</script>
  
<style scoped></style>
