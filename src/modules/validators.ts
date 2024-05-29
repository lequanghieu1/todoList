export default function useValidators() {
  const isEmpty = (fieldName: string, fieldValue: string | null) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };
  const minLength = (
    fieldName: string,
    fieldValue: string | null,
    min: number
  ) => {
    return ("" + fieldValue).length < min
      ? `The ${fieldName} field must be atleast ${min} characters long`
      : "";
  };

  const isEmail = (fieldName: string, fieldValue: string | null) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test("" + fieldValue)
      ? "The input is not a valid " + fieldName + " address"
      : "";
  };
  const isNum = (fieldName: string, fieldValue: string | null) => {
    const isNum = /^\d+$/.test("" + fieldValue);
    return !isNum ? "The " + fieldName + " field only have numbers" : "";
  };
  const isSpecial = (fieldName: string, fieldValue: string | null) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/;

    return !re.test("" + fieldValue)
      ? "Спец символи не можно використовувати у полі " + fieldName
      : "";
  };
  const isNumber = (fieldName: string, fieldValue: string | null) => {
    const re = /^[^0-9]+$/;

    return !re.test("" + fieldValue)
      ? "Цифри не можно використовувати у полі " + fieldName
      : "";
  };
  return { isEmpty, minLength, isEmail, isNum, isNumber, isSpecial };
}
