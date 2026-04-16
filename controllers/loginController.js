const jwt = require("jsonwebtoken");
const { getDb } = require("../db");

const createJwtToken = (payload, secretKey) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

const getUser = async (email) => {
  const db = getDb();
  const users = db.collection("users");
  const result = await users.findOneAndUpdate(
    { email },
    { $setOnInsert: { email, createdAt: new Date() } },
    {
      upsert: true,
      returnDocument: "after", // returns the document AFTER insertion/update
    },
  );

  return result;
};

const sendOtp = async (req, res) => {
  const db = getDb();
  const otpCollection = db.collection("otps");
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
  const db = getDb();
  const otpCollection = db.collection("otps");
  const { email: reqEmail, otp } = req.body;
  const email = reqEmail.toLowerCase();
  const record = await otpCollection.findOne({ email, otp });

  if (record) {
    await otpCollection.deleteOne({ email });

    const user = await getUser(email);

    const token = createJwtToken(
      { userId: user._id, email },
      process.env.ACCESS_TOKEN_SECRET,
    );
    res.json({ success: true, token }); // Generate a real JWT here
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
};

module.exports = { sendOtp, verifyOtp };
