import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './TransactionList';
import BudgetComparison from './BudgetComparison';

const Dashboard = ({ token }) => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const transactionsResponse = await axios.get('http://localhost:8000/api/transactions/', config);
        const budgetResponse = await axios.get('http://localhost:8000/api/budget/', config);
        setTransactions(transactionsResponse.data);
        setBudget(budgetResponse.data.amount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <BudgetComparison transactions={transactions} budget={budget} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Dashboard;
