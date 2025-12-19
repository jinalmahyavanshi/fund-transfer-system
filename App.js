import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      username: "user1",
    });
    setUser(res.data.user);
    setBalance(res.data.user.balance);
    fetchHistory(res.data.token, res.data.user.id);
  };

  const fetchHistory = async (token, userId) => {
    const res = await axios.get(
      `http://localhost:5000/history/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setHistory(res.data);
  };

  const handleTransfer = async () => {
    await axios.post("http://localhost:5000/transfer", {
      senderId: user.id,
      receiverId: Number(receiverId),
      amount: Number(amount),
    });

    // Refresh history & balance
    login();
    setReceiverId("");
    setAmount("");
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Fund Transfer Dashboard</h1>

      <div className="card balance-card">
        <h2>Current Balance</h2>
        <p className="balance">₹ {balance}</p>
      </div>

      <div className="card transfer-card">
        <h2>Transfer Money</h2>
        <div className="form">
          <input
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleTransfer}>Transfer</button>
        </div>
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((tx) => (
              <tr key={tx.id}>
                <td>{new Date(tx.timestamp).toLocaleString()}</td>
                <td>₹ {tx.amount}</td>
                <td
                  className={
                    tx.sender_id === user.id ? "sent" : "received"
                  }
                >
                  {tx.sender_id === user.id ? "Sent" : "Received"}
                </td>
                <td className={tx.status === "success" ? "success" : "failed"}>
                  {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
