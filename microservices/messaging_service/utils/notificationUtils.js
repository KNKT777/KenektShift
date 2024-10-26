
    import twilio from 'twilio';
    import dotenv from 'dotenv';
    dotenv.config();

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    export const sendSMSNotification = (to, message) => {
      client.messages
        .create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: to,
        })
        .then(message => console.log(`Message sent: ${message.sid}`))
        .catch(error => console.error('Error sending SMS notification:', error));
    };
    