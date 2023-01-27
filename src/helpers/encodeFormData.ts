export function encodeFormData(form: EventTarget & HTMLFormElement) {
  const formData = new FormData(form);
  const stringified = [...formData].map(([key, val]) => [key, String(val)]);
  return new URLSearchParams(stringified).toString();
}
