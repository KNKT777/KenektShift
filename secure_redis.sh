#!/bin/bash

# Define variables
REDIS_CONF_PATH="/etc/redis/redis.conf"
REDIS_PASSWORD="LMDKi4@fmtjzUxbjUT4."
TRUSTED_IP="65.93.99.93"

# Ensure the script is run as root
if [ "$(id -u)" -ne 0 ]; then
  echo "This script must be run as root. Use sudo."
  exit 1
fi

# Backup Redis configuration
if [ -f "$REDIS_CONF_PATH" ]; then
  echo "Backing up Redis configuration..."
  cp $REDIS_CONF_PATH ${REDIS_CONF_PATH}.backup
  echo "Backup created at ${REDIS_CONF_PATH}.backup"
else
  echo "Redis configuration file not found at $REDIS_CONF_PATH"
  exit 1
fi

# Bind Redis to local IP
sed -i 's/^bind .*/bind 127.0.0.1/' $REDIS_CONF_PATH

# Enable protected mode
sed -i 's/^protected-mode .*/protected-mode yes/' $REDIS_CONF_PATH

# Set Redis password
grep -q '^requirepass' $REDIS_CONF_PATH && \
  sed -i "s/^requirepass .*/requirepass $REDIS_PASSWORD/" $REDIS_CONF_PATH || \
  echo "requirepass $REDIS_PASSWORD" >> $REDIS_CONF_PATH

# Restart Redis to apply changes
echo "Restarting Redis..."
systemctl restart redis

# Configure UFW to restrict access
# Deny all incoming connections to Redis port 6379
echo "Configuring UFW to secure Redis..."
ufw deny 6379

# Allow access from localhost
ufw allow from 127.0.0.1 to any port 6379

# Allow access from the trusted IP address
ufw allow from $TRUSTED_IP to any port 6379

# Enable UFW if it's inactive
if ! ufw status | grep -q "Status: active"; then
  echo "Enabling UFW..."
  ufw enable
fi

# Display UFW status
echo "UFW status:"
ufw status

echo "Redis has been secured successfully."
