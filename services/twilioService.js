// twilioService.js

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        return response;
    } catch (error) {
        throw new Error('Failed to send SMS');
    }
};

export const send2FA = async (to, code) => {
    try {
        const response = await client.messages.create({
            body: `Your verification code is: ${code}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        return response;
    } catch (error) {
        throw new Error('Failed to send 2FA code');
    }
};
