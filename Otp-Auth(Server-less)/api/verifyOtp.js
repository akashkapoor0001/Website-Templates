const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = async (req, res) => {
    // CORS headers for browser requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { mobileNumber, code } = req.body;

    if (!mobileNumber || !code) {
        return res.status(400).json({ error: 'Mobile number and code are required' });
    }

    try {
        const verificationCheck = await client.verify.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks
            .create({ to: mobileNumber, code });

        if (verificationCheck.valid) {
            return res.status(200).json({ valid: true, message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ valid: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Failed to verify OTP' });
    }
};
