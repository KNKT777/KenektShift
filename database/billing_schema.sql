
    CREATE TABLE billing (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        job_id INTEGER REFERENCES jobs(id),
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO billing (user_id, job_id, amount, status) VALUES
    (1, 1, 100.00, 'pending'),
    (2, 2, 200.00, 'paid'),
    (3, 3, 150.00, 'failed');
    