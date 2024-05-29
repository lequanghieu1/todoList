import { reactive } from "@vue/reactivity";
import useValidators from "@/modules/validators";
import IValuesWithKeys from "@/types/ValuesWithKeys";
const { isEmpty } = useValidators();

const errors = reactive({} as IValuesWithKeys);
export default function useFormValidation() {
  const validateNameField = (fieldName: string, fieldValue: string | null) => {
    if (!fieldValue) errors[fieldName] = "";
    else
      errors[fieldName] =
        isEmpty(fieldName, fieldValue);
  };
  return { errors, validateNameField };
}
