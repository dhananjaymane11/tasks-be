const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const sendOtp = async (req, res) => {
  const db = getDb();
  console.log("## connected to DB");
  otpCollection = db.collection("otps");
  // Auto-delete OTP after 5 minutes
  // await otpCollection.createIndex(
  //   { createdAt: 1 },
  //   { expireAfterSeconds: 300 },
  // );

  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log("## otp", otp);

  await otpCollection.updateOne(
    { email },
    { $set: { otp, createdAt: new Date() } },
    { upsert: true },
  );

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: { user: process.env.EMAIL, pass: process.env.APP_PASSWORD }
  // });

  // await transporter.sendMail({
  //   from: process.env.EMAIL,
  //   to: email,
  //   subject: 'Your Login OTP',
  //   text: `Your OTP is ${otp}. It expires in 5 minutes.`
  // });

  res.json({ success: true, message: "OTP sent!" });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await otpCollection.findOne({ email, otp });

  if (record) {
    await otpCollection.deleteOne({ email });
    res.json({ success: true, token: "YOUR_JWT_TOKEN" }); // Generate a real JWT here
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
};

module.exports = { sendOtp, verifyOtp };
