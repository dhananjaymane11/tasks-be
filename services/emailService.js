const { Resend } = require("resend");

const resend = new Resend("re_92i9Uhs5_FUENP51utRa7NaL58bitEgCj");

async function sendOtpEmail(userEmail, otpCode) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Admin <auth@priority-flow.co.in>", // Requires a verified domain
      to: [userEmail],
      subject: "Your Login Verification Code",
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #eee;">
          <h2>Log in to Your Account</h2>
          <p>Use the verification code below to complete your login. This code expires in 5 minutes.</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5; margin: 20px 0;">
            ${otpCode}
          </div>
          <p style="color: #666; font-size: 12px;">If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      return console.error("Failed to send OTP:", error);
    }

    console.log("OTP sent successfully. ID:", data.id);
  } catch (err) {
    console.error("System error:", err);
  }
}

module.exports = {
  sendOtpEmail,
};
