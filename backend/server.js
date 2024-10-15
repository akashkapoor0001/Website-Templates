const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

// Endpoint to send OTP
app.post('/api/sendOtp', async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const verification = await client.verify.services(serviceSid)
      .verifications
      .create({ to: mobileNumber, channel: 'sms' });

    console.log('Verification Response:', verification);
    res.status(200).json({ sid: verification.sid });
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ error: 'Failed to send OTP', details: error.message });
  }
});

// Endpoint to verify OTP
app.post('/api/verifyOtp', async (req, res) => {
  const { mobileNumber, code } = req.body;

  try {
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: mobileNumber, code });

    res.status(200).json({ valid: verificationCheck.status === 'approved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
