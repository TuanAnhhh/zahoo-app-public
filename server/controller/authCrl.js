const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const sendsms = require("../util/sendsms")

const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });
const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.TOKEN_REFRESH_SECRET_KEY, { expiresIn: "30d" });

const authCtrl = {
  register: async (req, res) => {
    try {
      const { username, phoneNumber, password } = req.body;

      const user_phoneNumber = await User.findOne({ phoneNumber });
      if (user_phoneNumber)
        return res
          .status(400)
          .json({ msg: "Số điện thoại này đã được đăng ký." });

      if (password.length < 6)
        return res.status(400).json({ msg: "Mật khẩu phải lớn hơn 6 ký tự." });

      const passwordHash = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        username: username,
        phoneNumber,
        password: passwordHash,
      });

      const accessToken = generateAccessToken({ id: newUser._id });
      const refreshToken = generateRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.json({
        msg: "Đăng ký thành công!",
        accessToken,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ phoneNumber: req.body.phoneNumber })
        .select("-createdAt -updatedAt")
        .populate(
          "friends friendsQueue",
          "username profilePicture phoneNumber status"
        );

      if (!user)
        return res.status(404).json({ msg: "Không tìm thấy người dùng." });
      if(user.status ===false)
        return res.status(404).json({ msg: "Tài khoản đã bị khóa do vi phạm chính sách của chúng tôi." });
          
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) return res.status(400).json({ msg: "Mật khẩu sai." });

      const { password, ...other } = user._doc;

      //generate token
      const id = user._id;
      const accessToken = generateAccessToken({ id });
      const refreshToken = generateRefreshToken({ id });
      if (!user.isAdmin) {
        res.cookie("refreshtoken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refresh_token",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        });
      }
      res.status(200).json({
        msg: "Đăng nhập thành công!",
        accessToken,
        user: other,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/auth/refresh_token" });
      return res.json({ msg: "Đã đăng xuất!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Vui lòng đăng nhập ngay." });

      jwt.verify(
        rf_token,
        process.env.TOKEN_REFRESH_SECRET_KEY,
        async (err, result) => {
          if (err)
            return res.status(400).json({ msg: "Vui lòng đăng nhập ngay." });

          const user = await User.findById(result.id)
            .select("-createdAt -updatedAt")
            .populate(
              "friends friendsQueue",
              "username profilePicture phoneNumber"
            );
          const { password, updatedAt, ...other } = user._doc;

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const accessToken = generateAccessToken({ id: result.id });

          res.status(200).json({
            msg: "Chào mừng bạn quay trở lại!",
            accessToken,
            user: other,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      // them kiem tra dieu kien OPT
      // console.log("Thiếu Dk OTP", otp);

      const passwordHash = await bcrypt.hash(password, saltRounds)
      await User.findOneAndUpdate(
        { phoneNumber: phoneNumber },
        { password: passwordHash }
      )
      res.status(200).json({ msg: "Cập nhật thành công mật khẩu!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  sendSms: async (req, res) => {
    try {
      const phone =req.body.phoneNumber
      const oneTimePassword = Math.floor(Math.random() * 900000 + 100000)
      await sendsms.sendSMS(phone,`${oneTimePassword}`)
      res.status(200).json({ oneTimePassword });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  checkPhone: async (req, res) => {
    try {
      const { phoneNumber } = req.body;

      const user_phoneNumber = await User.findOne({ phoneNumber });
      if (user_phoneNumber)
        return res
          .status(200)
          .json({ msg: false});

      res.status(200).json({
        msg: true
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
 
};

module.exports = authCtrl;
