import IValuesWithKeys from "@/types/ValuesWithKeys";

export default function useSubmitButtonState(
  data: IValuesWithKeys,
  errors: IValuesWithKeys
) {
  const isButtonDisabled = () => {
    let disabled = true;
    for (const prop in data) {
       if (!data[prop] || errors[prop] ) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  };

  return { isButtonDisabled };
}
