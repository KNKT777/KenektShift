
    #!/bin/bash

    PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f database/user_schema.sql
    PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f database/job_schema.sql
    PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f database/billing_schema.sql

    echo "Database schema and seed data applied successfully."
    