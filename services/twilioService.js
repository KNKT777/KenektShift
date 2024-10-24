import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

if (!client) {
    console.error('Twilio client could not be initialized. Please check your Twilio credentials in the .env file.');
}

export const sendSMS = async (to, message) => {
    if (!client) {
        console.log('Twilio client is not configured. Skipping SMS sending.');
        return;
    }

    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        return response;
    } catch (error) {
        console.error('Failed to send SMS:', error);
        throw new Error('Failed to send SMS');
    }
};

export const send2FA = async (to, code) => {
    if (!client) {
        console.log('Twilio client is not configured. Skipping 2FA code sending.');
        return;
    }

    try {
        const response = await client.messages.create({
            body: `Your verification code is: ${code}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        return response;
    } catch (error) {
        console.error('Failed to send 2FA code:', error);
        throw new Error('Failed to send 2FA code');
    }
};
