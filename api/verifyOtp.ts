import { NowRequest, NowResponse } from '@vercel/node';
import twilio from 'twilio';

const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILIO_AUTH_TOKEN'];
const serviceSid = process.env['TWILIO_SERVICE_SID'];
if (!serviceSid) {
  throw new Error('TWILIO_SERVICE_SID is not defined');
}

if (!accountSid) {
  throw new Error('TWILIO_ACCOUNT_SID is not defined');
}
if (!authToken) {
  throw new Error('TWILIO_AUTH_TOKEN is not defined');
}

const client = twilio(accountSid, authToken);

export default async function handler(req: NowRequest, res: NowResponse) {
  const { mobileNumber, code } = req.body;

  if (!serviceSid) {
    throw new Error('TWILIO_SERVICE_SID is not defined');
  }

  try {
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: mobileNumber, code: code });

    res.status(200).json({ valid: verificationCheck.status === 'approved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP', details: (error as Error).message });
  }
}
