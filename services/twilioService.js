const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Function to send 2FA code via SMS
const send2FACode = async (to, code) => {
    try {
        const message = await client.messages.create({
            body: `Your 2FA code is: ${code}`,
            from: twilioPhoneNumber,
            to: to
        });
        console.log('2FA code sent:', message.sid);
    } catch (error) {
        console.error('Error sending 2FA code:', error);
    }
};

module.exports = { send2FACode };
