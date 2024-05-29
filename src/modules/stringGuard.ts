export default function stringGuard(stringOrNo: string | undefined): string {
  if (stringOrNo === undefined) {
    return "";
  } else {
    return stringOrNo;
  }
}
