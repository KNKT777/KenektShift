
    CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id),
        receiver_id INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'unread'
    );

    INSERT INTO messages (sender_id, receiver_id, content, status) VALUES
    (1, 2, 'Hello, how can I assist you today?', 'unread'),
    (2, 1, 'I need help with my schedule.', 'read');
    