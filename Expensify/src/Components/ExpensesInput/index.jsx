import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import "./index.css"
import ExpenseCard from "../ExpensesCard";
import Header from "../Header";
import { useNavigate } from "react-router";
const ExpenseInput = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

 const fetchExpenses = async () => {

  try {
    const token = Cookies.get("jwt_token");
    const res = await axios.get("https://expensify-2.onrender.com", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data);
  } catch (err) {
    console.error("Failed to fetch expenses:", err.response || err);
  }

};

const handleEdit = (exp) => {
  setForm({
    amount: exp.amount,
    category: exp.category,
    date: new Date(exp.date).toISOString().split("T")[0],
    description: exp.description,
  });
  setEditingId(exp._id); 
  navigate("/expenses")
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = Cookies.get("jwt_token");
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    try {
    if (editingId) {
      await axios.put(`https://expensify-2.onrender.com/expense/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null); 
    } else {
      await axios.post("https://expensify-2.onrender.com/expense", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    fetchExpenses(); 

    setForm({
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  } catch (err) {
    console.error(err);
    alert("Failed to save expense. Make sure you are logged in.");
  }


    setForm({
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  } catch (err) {
    console.error(err);
    alert("Failed to save expense. Make sure you are logged in.");
  }
};


  const handleDelete = async (id) => {
    const token = Cookies.get("jwt_token");
    await axios.delete(`https://expensify-2.onrender.com/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    fetchExpenses();
  };

  const handleExportCSV = () => {
    const expensesData = expenses;
  if (expensesData.length === 0) {
    alert("No expenses to export!");
    return;
  }

  const headers = ["Amount", "Category", "Date", "Description"];

  const rows = expensesData.map(exp => [
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
};

  return (
    <>
    <div className="header"><Header /></div>     
    <div className="expense-form-container">
    <div className="container">

      <h1 className="title">Add New Expense</h1>
      <form onSubmit={handleSubmit} className="form">

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="input"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Choose Category</option>
          <option value="Food">Food & Groceries</option>
          <option value="Clothing">Clothing</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Emi">Emi</option>
          <option value="Education">Education</option>
          <option value="Utilities">Utilities</option>
          <option value="Health">Health & Medical</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="textarea"
        />
      <div className="buttons-adjustment">
        <button type="submit" className="btn-primary save-expense-button">
         <span className="save-expense">Save Expense</span>
        </button>
        <button onClick={handleExportCSV} className="btn-primary export-expense-csv-button">
          <span className="save-expense">Export as CSV</span>
        </button>
      </div>
      </form>
      </div>

      <div className="list-container-1">
  <h2 className="subtitle">All Expenses</h2>
  <div className="flex flex-col gap-4">
    {expenses.map((exp) => (
      <ExpenseCard
  key={exp._id}
  title={exp.description || "No Description"}
  category={exp.category}
  date={new Date(exp.date).toLocaleDateString()}
  amount={exp.amount}
  onDelete={() => handleDelete(exp._id)}
  onEdit={() => handleEdit(exp)}
/>
    ))}
  </div>
</div>

    </div>
    </>
  );
};

export default ExpenseInput;
