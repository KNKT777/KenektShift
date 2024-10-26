import express from 'express';
export default {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  realm: process.env.KEYCLOAK_REALM,
  authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
  redirectUri: process.env.KEYCLOAK_REDIRECT_URI,
};
