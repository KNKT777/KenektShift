
    #!/bin/bash
    # Backup Script for Geo-Redundant Backups

    TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
    BACKUP_DIR="/backups/${TIMESTAMP}"
    S3_BUCKET="s3://your-geo-redundant-backup-bucket"

    # Create backup directory
    mkdir -p ${BACKUP_DIR}

    # Dump PostgreSQL Database
    pg_dump -U postgres -h db-master kenektshift > ${BACKUP_DIR}/kenektshift_db.sql

    # Compress the backup
    tar -czvf ${BACKUP_DIR}.tar.gz ${BACKUP_DIR}

    # Copy to S3 Bucket
    aws s3 cp ${BACKUP_DIR}.tar.gz ${S3_BUCKET}

    echo "Backup completed and uploaded to S3 at ${S3_BUCKET}/${TIMESTAMP}.tar.gz"
    