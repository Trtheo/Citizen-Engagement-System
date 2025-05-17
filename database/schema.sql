CREATE TABLE agencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE complaints (
  id SERIAL PRIMARY KEY,
  citizen_name VARCHAR(100),
  email VARCHAR(100),
  category VARCHAR(50),
  message TEXT,
  agency_id INT REFERENCES agencies(id),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  reset_token TEXT,
  reset_expires TIMESTAMP
);

