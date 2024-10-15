const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  const { mobileNumber } = req.body;

  try {
    const verification = await client.verify.services(serviceSid)
      .verifications
      .create({ to: mobileNumber, channel: 'sms' });

    console.log('Verification Response:', verification); // Log the full response from Twilio

    if (verification && verification.sid) {
      console.log(`OTP sent successfully: Verification SID ${verification.sid}`);
      res.status(200).json({ sid: verification.sid });
    } else {
      console.error('Verification object is missing the SID:', verification);
      res.status(500).json({ error: 'Failed to send OTP. No verification SID received.' });
    }
  } catch (error) {
    console.error('Twilio error:', error); // Log the full error for debugging
    res.status(500).json({ error: 'Failed to send OTP', details: error.message });
  }
}
