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
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import stringGuard from "@/modules/stringGuard";
import useFormValidation from '../../modules/useFormValidation';
import { StatesTodo } from '../../types/Todo';

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
    computed:{
        getStates:function(){
           return StatesTodo;
        },
    },
    setup(props, { emit }) {

        const { validateNameField } = useFormValidation();
        let inputValue = ref(stringGuard(props.input));
        validateNameField('state', inputValue.value);
        const updateValue = (e: Event) => {
            validateNameField('state', inputValue.value);
            inputValue.value = (e.target as HTMLInputElement).value;
            emit("setSelect", inputValue.value);
        };
        return { inputValue, updateValue };
    },
});
</script>
  
<style scoped></style>
  