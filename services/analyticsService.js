import dotenv from 'dotenv';
import mixpanel from 'mixpanel';

dotenv.config();

const mixpanelToken = process.env.MIXPANEL_TOKEN;

if (!mixpanelToken) {
  console.error('Mixpanel token is not defined. Please set MIXPANEL_TOKEN in your .env file.');
}

const mixpanelClient = mixpanelToken ? mixpanel.init(mixpanelToken) : null;

export const trackEvent = (eventName, properties) => {
  if (!mixpanelClient) {
    console.log('Mixpanel client is not configured. Skipping event tracking.');
    return;
  }
  mixpanelClient.track(eventName, properties);
};

export const trackUserSignup = (user) => {
  trackEvent('User Signup', {
    userId: user.id,
    email: user.email,
    createdAt: user.createdAt,
  });
};

export default mixpanelClient;
