import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import twilio from "twilio";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 🇮🇳 INDIA PHONE VALIDATION
const validateIndianPhone = (phone) => {
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/* ===================== REGISTER ===================== */
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, verificationMethod } = req.body;

  if (!name || !email || !phone || !password || !verificationMethod) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  if (!validateIndianPhone(phone)) {
    return next(new ErrorHandler("Invalid Indian phone number.", 400));
  }

  const existingUser = await User.findOne({
    $or: [
      { email, accountVerified: true },
      { phone, accountVerified: true },
    ],
  });

  if (existingUser) {
    return next(new ErrorHandler("Phone or Email already in use.", 400));
  }

  const attempts = await User.find({
    $or: [
      { phone, accountVerified: false },
      { email, accountVerified: false },
    ],
  });

  if (attempts.length > 3) {
    return next(
      new ErrorHandler(
        "Maximum attempts exceeded. Try again after some time.",
        400
      )
    );
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const verificationCode = await user.generateVerificationCode();
  await user.save();

  sendVerificationCode(
    verificationMethod,
    verificationCode,
    name,
    email,
    phone,
    res
  );
});

/* ===================== SEND OTP / EMAIL ===================== */
async function sendVerificationCode(
  verificationMethod,
  verificationCode,
  name,
  email,
  phone,
  res
) {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({
        email,
        subject: "Your Verification Code",
        message,
      });

      return res.status(200).json({
        success: true,
        message: `Verification email sent to ${email}`,
      });
    }

    if (verificationMethod === "phone") {
      const code = verificationCode.toString().split("").join(" ");
      await client.calls.create({
        twiml: `<Response><Say>Your verification code is ${code}. Repeat: ${code}.</Say></Response>`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid verification method.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send verification code.",
    });
  }
}

/* ===================== EMAIL TEMPLATE ===================== */
function generateEmailTemplate(code) {
  return `
  <div style="font-family: Arial; padding: 20px;">
    <h2>Email Verification</h2>
    <p>Your verification code is:</p>
    <h1>${code}</h1>
    <p>This code expires in 10 minutes.</p>
  </div>`;
}

/* ===================== VERIFY OTP ===================== */
export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, phone, otp } = req.body;

  if (!validateIndianPhone(phone)) {
    return next(new ErrorHandler("Invalid Indian phone number.", 400));
  }

  const users = await User.find({
    $or: [
      { email, accountVerified: false },
      { phone, accountVerified: false },
    ],
  }).sort({ createdAt: -1 });

  if (!users.length) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const user = users[0];

  if (user.verificationCode !== Number(otp)) {
    return next(new ErrorHandler("Invalid OTP.", 400));
  }

  if (Date.now() > user.verificationCodeExpire) {
    return next(new ErrorHandler("OTP expired.", 400));
  }

  user.accountVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpire = null;
  await user.save({ validateModifiedOnly: true });

  sendToken(user, 200, "Account verified successfully.", res);
});

/* ===================== LOGIN ===================== */
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password required.", 400));
  }

  const user = await User.findOne({
    email,
    accountVerified: true,
  }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }

  sendToken(user, 200, "Login successful.", res);
});

/* ===================== LOGOUT ===================== */
export const logout = catchAsyncError(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

/* ===================== GET USER ===================== */
export const getUser = catchAsyncError(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

/* ===================== FORGOT PASSWORD ===================== */
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "Reset Password",
    message: `Reset your password here: ${resetUrl}`,
  });

  res.status(200).json({
    success: true,
    message: "Password reset email sent.",
  });
});

/* ===================== RESET PASSWORD ===================== */
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired token.", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Password reset successful.", res);
});
