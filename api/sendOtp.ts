import { NowRequest, NowResponse } from '@vercel/node';
import twilio from 'twilio';

const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILIO_AUTH_TOKEN'];
const serviceSid = process.env['TWILIO_SERVICE_SID'];
if (!serviceSid) {
  throw new Error('TWILIO_SERVICE_SID is not defined');
}

const client = twilio(accountSid, authToken);

export default async function handler(req: NowRequest, res: NowResponse) {
  const { mobileNumber } = req.body;

  if (!serviceSid) {
    res.status(500).json({ error: 'Service SID is not defined' });
    return;
  }

  try {
    const verification = await client.verify.services(serviceSid)
      .verifications
      .create({ to: mobileNumber, channel: 'sms' });

    console.log('Verification Response:', verification);

    if (verification && verification.sid) {
      res.status(200).json({ sid: verification.sid });
    } else {
      res.status(500).json({ error: 'Failed to get verification SID' });
    }
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ error: 'Failed to send OTP', details: (error as Error).message });
  }
}
