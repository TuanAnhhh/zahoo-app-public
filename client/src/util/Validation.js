import * as Yup from "yup"
export const validationRegister = Yup.object().shape({
    username: Yup.string()
        .min(4, "Quá ngắn")
        .max(15, "Quá dài")
        .required("Không được để trống"),
    phoneNumber: Yup.string()
        .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Số điện thoại không hợp lệ')
        .required("Không được để trống"),
    password: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .required("Không được để trống"),
    cf_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
});
export const validateionCreateGroup = Yup.object().shape({
    label: Yup.string()
        .min(4, "Quá ngắn")
        .max(25, "Quá dài")
        .required("Không được để trống"),
   
});
export const validateionChangeGroupName = Yup.object().shape({
    label: Yup.string()
        .min(4, "Quá ngắn")
        .max(25, "Quá dài")
        .required("Không được để trống"),
   
});
export const validateionChangePassword = Yup.object().shape({
    password: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .required("Không được để trống"),
   
    newPassword: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .required("Không được để trống"),
   

        reNewPassword: Yup.string()
        .required("Không được để trống")
        .when("newPassword", {
            is: val => (val && val.length > 5 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newPassword")],
              "Mật khẩu không trùng khớp!"
            )
          })
   
});

export const validateionOTP = Yup.object().shape({
    otp: Yup.string()
        .min(6, "OTP không hợp lệ")
        .max(6, "OTP không hợp lệ")
        .required("Không được để trống"),
    
   
});
export const validationForgotPassword = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Số điện thoại không hợp lệ')
        .required("Không được để trống"),
    password: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .required("Không được để trống"),
    cf_password: Yup.string()
        .required("Không được để trống")
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
});