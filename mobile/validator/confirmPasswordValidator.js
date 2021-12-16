export function confirmPasswordValidator(password, passwordConfirm) {
    if (!(password === passwordConfirm)) return "Mật khẩu không trùng khớp."
    return ''
}