
    import Keycloak from 'keycloak-connect';
    import session from 'express-session';
    import keycloakConfig from '../config/keycloak/keycloakConfig.js';

    const memoryStore = new session.MemoryStore();

    export const keycloak = new Keycloak({ store: memoryStore });

    export const keycloakMiddleware = (app) => {
      app.use(session({
        secret: 'some secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      }));

      app.use(keycloak.middleware());
    };
    