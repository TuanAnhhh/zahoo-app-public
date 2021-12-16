export function phoneValidator(phone) {
  const re = /(^(03)[2-9]\d{7})|(^(07)[06-9]\d{7})|(^(08)[1-5]\d{7})|(^(056)\d{7})|(^(058)\d{7})|(^(059)\d{7})|(^(09)[0-46-9]\d{7})/
  if (!phone) return "Vui lòng nhập số điện thoại."
  if (!re.test(phone)) return 'Số điện thoại không hợp lệ, vui lòng kiểm tra lại.'
  return ''
}
