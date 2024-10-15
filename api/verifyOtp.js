const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  const { mobileNumber, code } = req.body;

  try {
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: mobileNumber, code: code });

    if (verificationCheck && verificationCheck.status === 'approved') {
      res.status(200).json({ valid: true });
    } else {
      res.status(400).json({ valid: false });
    }
  } catch (error) {
    console.error('Twilio verification error:', error.message);
    res.status(500).json({ error: 'Failed to verify OTP', details: error.message });
  }
}
