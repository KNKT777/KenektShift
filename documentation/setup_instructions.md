
    # Setup Instructions for KenektShift Backend

    ## Prerequisites
    - Node.js (v18 or later)
    - Docker and Docker Compose
    - Kubernetes CLI (kubectl)
    - PostgreSQL (for local development)

    ## Installation
    1. Clone the repository:
        ```
        git clone https://github.com/your-repo/kenektshift-backend.git
        ```
    2. Install dependencies:
        ```
        npm install
        ```
    3. Setup environment variables:
        - Copy `.env.example` to `.env` and update the values accordingly.

    ## Running Locally
    1. Start the PostgreSQL and Redis containers:
        ```
        docker-compose up db redis
        ```
    2. Start the application:
        ```
        npm run start
        ```

    ## Running with Docker Compose
    ```
    docker-compose up
    ```

    ## Running with Kubernetes
    ```
    kubectl apply -f k8s/
    ```
    