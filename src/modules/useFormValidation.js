import { reactive } from "@vue/reactivity";
import useValidators from "@/modules/validators";

const { isEmpty } = useValidators();
const errors = reactive({});

export default function useFormValidation() {
  const validateNameField = (fieldName, fieldValue) => {
    if (!fieldValue) {
      errors[fieldName] = "";
    } else {
      errors[fieldName] = isEmpty(fieldName, fieldValue);
    }
  };

  return { errors, validateNameField };
}
