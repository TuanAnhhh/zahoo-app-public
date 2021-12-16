export function capchaValidator(capcha) {
  if (!capcha)
    return "Vui lòng nhập mã xác nhận"
  if(capcha.length <6 )
    return "Mã xác nhận không hợp lệ"
  return ''
}
