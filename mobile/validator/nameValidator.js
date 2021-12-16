export function nameValidator(name) {
  if (!name) return "Vui lòng nhập họ tên."
  if(name.length <4) return "Tên của bạn quá ngắn"
  return ''
}
