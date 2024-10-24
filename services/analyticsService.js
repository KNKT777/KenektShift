
    import mixpanel from 'mixpanel';

    const mixpanelClient = mixpanel.init(process.env.MIXPANEL_TOKEN);

    export const trackEvent = (eventName, properties) => {
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
    