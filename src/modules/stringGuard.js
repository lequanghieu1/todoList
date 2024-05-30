export default function stringGuard(stringOrNo) {
  if (stringOrNo === undefined) {
    return "";
  } else {
    return stringOrNo;
  }
}
