
    # API Documentation

    ## Versioning
    The API uses versioning to ensure backward compatibility. Current version: **v1**

    ## Endpoints
    ### User Service
    - `POST /api/v1/users/register` - Register a new user.
    - `POST /api/v1/users/login` - Authenticate a user.
    - `GET /api/v1/users/:id` - Retrieve user profile information.

    ### Job Management Service
    - `GET /api/v1/jobs` - Retrieve job listings.
    - `POST /api/v1/jobs` - Create a new job listing.
    - `PUT /api/v1/jobs/:id` - Update job information.

    ### Billing Service
    - `GET /api/v1/billing` - Retrieve billing information.
    - `POST /api/v1/billing/subscribe` - Subscribe to a new plan.

    ## Response Formats
    All responses follow the standard JSON format:
    ```
    {
      "status": "success",
      "data": {
        ...
      }
    }
    ```
    