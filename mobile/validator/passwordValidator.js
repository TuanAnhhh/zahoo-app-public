export function passwordValidator(password) {
  if (!password) return "Vui lòng nhập mật khẩu."
  if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.'
  return ''
}
