
    CREATE TABLE jobs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO jobs (user_id, title, description, status) VALUES
    (1, 'Job 1', 'Description for job 1', 'open'),
    (2, 'Job 2', 'Description for job 2', 'in_progress'),
    (3, 'Job 3', 'Description for job 3', 'completed');
    