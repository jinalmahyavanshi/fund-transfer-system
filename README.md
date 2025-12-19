1. Project Title
Real-Time Fund Transfer & Audit Log System
This project implements a simple peer-to-peer fund transfer application with an immutable audit logging mechanism.

2. Project Description
This application allows users to transfer funds between accounts while ensuring that all transactions are processed atomically and recorded in a permanent audit log.
The backend is developed using Spring Boot, which provides strong support for transactional operations and data integrity, making it suitable for financial applications. The frontend is built using React, enabling a responsive and interactive user interface.

Key Features:
1.Atomic fund transfers (debit and credit happen together)
2.Immutable transaction history for audit purposes
3.Secure REST APIs
4.Real-time balance and transaction updates on the frontend

Challenges Faced:
1.Ensuring data consistency during fund transfers
2.Handling transaction failures without partial updates
3.Synchronizing backend updates with frontend UI


How to Install and Run the Project
Prerequisites
Make sure the following tools are installed on your system:
1.Java (JDK 17 or compatible)
2.Node.js (LTS version)
3.PostgreSQL
4.Git

Steps to Run the Project
Clone the repository:
git clone https://github.com/<your-username>/fund-transfer-audit-system.git
cd fund-transfer-audit-system


Start the backend:
cd backend
./mvnw spring-boot:run


Start the frontend:
cd frontend
npm install
npm start

The backend will run on http://localhost:5000
The frontend will run on http://localhost:3000

How to Use the Project
1.Open the application in the browser.
2.Login using a predefined user.
3.Enter the receiver’s user ID and the amount to transfer.
4.Submit the transfer request.
5.View the updated balance and transaction history instantly.
6.Review the immutable audit log in the transaction history section.

Final Note
This project demonstrates core concepts required in financial systems such as transaction safety, auditability, and clean full-stack integration.
