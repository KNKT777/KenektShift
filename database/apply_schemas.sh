#!/bin/bash

echo "PG_HOST: $PG_HOST"
echo "PG_USER: $PG_USER"
echo "PG_DATABASE: $PG_DATABASE"

PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f user_schema.sql
PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f job_schema.sql
PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f billing_schema.sql

echo "Database schema and seed data applied successfully."

