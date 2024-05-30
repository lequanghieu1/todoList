export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };

  const minLength = (fieldName, fieldValue, min) => {
    return ("" + fieldValue).length < min
      ? `The ${fieldName} field must be at least ${min} characters long`
      : "";
  };

  const isEmail = (fieldName, fieldValue) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test("" + fieldValue)
      ? "The input is not a valid " + fieldName + " address"
      : "";
  };

  const isNum = (fieldName, fieldValue) => {
    const isNum = /^\d+$/.test("" + fieldValue);
    return !isNum ? "The " + fieldName + " field only has numbers" : "";
  };

  const isSpecial = (fieldName, fieldValue) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/;
    return !re.test("" + fieldValue)
      ? "Special symbols are not allowed in the " + fieldName + " field"
      : "";
  };

  const isNumber = (fieldName, fieldValue) => {
    const re = /^[^0-9]+$/;
    return !re.test("" + fieldValue)
      ? "Numbers are not allowed in the " + fieldName + " field"
      : "";
  };

  return { isEmpty, minLength, isEmail, isNum, isNumber, isSpecial };
}
