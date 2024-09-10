export function isValidString(data: any): boolean {
  return typeof data === "string" && data.trim().length > 0 ? true : false;
}

export function isValidNumber(data: any): boolean {
  return typeof data === "number" && Number.isFinite(data) ? true : false;
}
