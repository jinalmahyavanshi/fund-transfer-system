Project Overview
This project implements a simple peer-to-peer fund transfer system with a mandatory, immutable audit log.The application allows users to transfer funds between accounts while ensuring that debit and credit operations are executed atomically.The backend is responsible for handling transactions, maintaining consistency using database transactions, and storing a permanent audit trail. The frontend provides a simple interface for initiating transfers and viewing transaction history in real time.

Setup / Run Instructions
Prerequisites
Ensure the following are installed on your system:
Node.js (LTS version)
PostgreSQL
Git

Step-by-Step Setup
1. Clone the Repository
git clone https://github.com/<your-username>/fund-transfer-audit-system.git
cd fund-transfer-audit-system

2. Database Setup
Create a PostgreSQL database named:
fund_transfer_db

Create tables:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  balance DECIMAL(10,2) DEFAULT 1000.00
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id),
  receiver_id INT REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(10)
);

Insert sample users:
INSERT INTO users (username) VALUES ('user1'), ('user2');

3. Run Backend
cd backend
npm install
node server.js

Backend runs on:
http://localhost:5000

4. Run Frontend
cd frontend
npm install
npm start


Frontend runs on:
http://localhost:3000

API Documentation
1. Login
POST /login
Request Body:
{
  "username": "user1"
}

2. Fund Transfer
POST /transfer
Request Body:
{
  "senderId": 1,
  "receiverId": 2,
  "amount": 500
}

Description:
Transfers funds from sender to receiver using a database transaction to ensure atomicity.

3. Transaction History
GET /history/{userId}
Headers:
Authorization: Bearer <JWT_TOKEN>
Description:
Fetches the transaction history (audit log) for a specific user.

Database Schema
Users Table
id – Primary key
username – Unique user identifier
balance – Current account balance
Transactions Table (Audit Log)
id – Primary key
sender_id – Sender user ID
receiver_id – Receiver user ID
amount – Transaction amount
timestamp – Date and time of transaction
status – success / failed
The transactions table acts as an immutable audit log and records every transfer permanently.

AI Tool Usage Log (MANDATORY)
AI tools were used for development assistance in the following areas:
Generating database transaction boilerplate for atomic fund transfer logic.
Creating the initial structure for the frontend transaction history table.
All AI-generated code was reviewed, modified, and integrated manually to meet the project requirements.
