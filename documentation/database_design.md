
    # Database Design

    ## Overview
    The database consists of multiple schemas, each representing a core service:

    - **User Schema**: Stores user information, authentication details, and preferences.
    - **Jobs Schema**: Stores job listings, job requirements, and related information.
    - **Billing Schema**: Stores subscription plans, transactions, and payment history.
    - **Notifications Schema**: Stores pending and sent notifications.

    ## ER Diagram
    (Provide a diagram of the entity relationships)

    ## Tables
    - **users**: id, email, password_hash, role, created_at, updated_at
    - **jobs**: id, title, description, requirements, employer_id, created_at, updated_at
    - **billing**: id, user_id, amount, status, created_at, updated_at
    - **notifications**: id, user_id, message, status, created_at
    