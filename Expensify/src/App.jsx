import { useState, useEffect } from 'react'
import Login from './Components/LoginPage'
import HomePage from './Components/HomePage'
import Header from './Components/Header'
import Dashboard from './Components/Dashboard'
import Expenses from './Components/RecentExpenses'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import ProtectedRoute from './ProtectedRoute'
import Cookies from "js-cookie"
import axios from "axios";

function App() {
    const [expenses, setExpenses] = useState([]);
useEffect(() => {
    fetchExpenses();
  }, []);

  
  const headers = ["Amount", "Category", "Date", "Description"];

  const rows = expenses.map(exp => [
    exp.amount,
    exp.category,
    new Date(exp.date).toLocaleDateString(),
    exp.description || ""
  ]);

  const csvContent =
    [headers, ...rows].map(e => e.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "expenses.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);



  const fetchExpenses = async () => {
    try {
      const token = Cookies.get("jwt_token");
      const res = await axios.get("https://expensify-2.onrender.com/expense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Failed to fetch expenses:", err.response || err);
    }
  };

  return (
    <>
     <BrowserRouter>
     <Routes>
      
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path='/header' element={<ProtectedRoute><Header /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard expenses={expenses}/></ProtectedRoute>} />
      <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App