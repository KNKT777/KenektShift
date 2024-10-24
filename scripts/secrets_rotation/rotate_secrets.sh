
    #!/bin/bash

    SECRET_NAME="your_secret_name"
    REGION="your_region"

    # Get the current version of the secret
    CURRENT_SECRET=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --region $REGION)

    # Generate new secret
    NEW_SECRET=$(openssl rand -base64 32)

    # Rotate the secret
    aws secretsmanager update-secret --secret-id $SECRET_NAME --secret-string "$NEW_SECRET" --region $REGION

    echo "Secret rotated successfully for $SECRET_NAME in $REGION."
    