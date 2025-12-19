Overview

This project is a full-stack peer-to-peer fund transfer application designed to simulate real-time financial transactions while maintaining a mandatory, immutable audit log. The primary goal of this assignment is to demonstrate backend correctness, database transaction handling, auditability, and frontend integration, which are critical requirements in financial systems.

The system ensures that:
Fund transfers are atomic (debit and credit occur together or not at all)
Every transaction is permanently recorded
The audit trail is immutable and tamper-proof
The frontend reflects updates in real time

Technology Stack
Backend: Node.js,Express.js,PostgreSQL,pg (PostgreSQL client),JWT (Authentication),CORS
Frontend:React.js,Axios,Custom CSS
Development Tools:VS Code,Postman,pgAdmin,Git & GitHub

Project Setup & Execution

Ensure the following are installed:
Node.js (LTS),PostgreSQL,Git

Clone the Repository
git clone https://github.com/<your-username>/fund-transfer-audit-system.git
cd fund-transfer-audit-system

Database Configuration
Create Database
CREATE DATABASE fund_transfer_db;

Create Tables
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

Insert Sample Users
INSERT INTO users (username) VALUES ('user1'), ('user2');


Backend Setup
cd backend
npm install
node server.js


Backend runs on:
http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:
http://localhost:3000

API Documentation
Authentication

POST /login

Request:

{
  "username": "user1"
}


Response:

{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "username": "user1",
    "balance": 1000
  }
}

Fund Transfer

POST /transfer

Request:

{
  "senderId": 1,
  "receiverId": 2,
  "amount": 500
}


Response:

{
  "message": "Transfer successful"
}

📜 Transaction History

GET /history/:userId

Headers:

Authorization: Bearer <JWT_TOKEN>


Response:

[
  {
    "id": 1,
    "sender_id": 1,
    "receiver_id": 2,
    "amount": 500,
    "timestamp": "2025-12-19T12:44:01Z",
    "status": "success"
  }
]

Database Design
Users Table
Column	Description
id	Primary key
username	Unique user identifier
balance	Current account balance
Transactions Table (Audit Log)
Column	Description
sender_id	Sender user ID
receiver_id	Receiver user ID
amount	Transaction amount
timestamp	Transaction date & time
status	success / failed
