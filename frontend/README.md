
    # Front-End Setup for KenektShift

    ## Features to Integrate

    1. **OAuth Authentication (Keycloak)**:
       - Use a library like `@react-keycloak/web` to integrate Keycloak.
       - Configure Keycloak settings in a `.env` file.
    
    2. **GraphQL Integration**:
       - Use Apollo Client to query data from the GraphQL Gateway.
       - Set up a basic GraphQL query to test data retrieval from the backend.
    
    3. **WebSocket Real-Time Updates**:
       - Use `socket.io-client` to subscribe to updates from the job management service.
       - Test real-time notifications and job status updates.

    ## Basic Folder Structure

    - `src/`
      - `components/`
      - `services/`
        - `api.js` (GraphQL and REST API integration)
        - `auth.js` (OAuth Keycloak integration)
      - `utils/`
      - `App.js`
      - `index.js`

    ## Quick Start

    1. Install dependencies:
       ```
       npm install
       ```

    2. Start the application:
       ```
       npm start
       ```

    ## Front-End Libraries to Install

    - **Apollo Client** for GraphQL: `npm install @apollo/client`
    - **Socket.io Client** for real-time updates: `npm install socket.io-client`
    - **Keycloak Integration**: `npm install @react-keycloak/web`
    - **Sentry** for error tracking: `npm install @sentry/react`
    