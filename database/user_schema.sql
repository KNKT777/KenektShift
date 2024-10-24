
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (username, email, password, role) VALUES
    ('admin', 'admin@example.com', 'hashed_password', 'admin'),
    ('user1', 'user1@example.com', 'hashed_password', 'user'),
    ('user2', 'user2@example.com', 'hashed_password', 'user');
    