import React, { useState, useMemo } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import "./index.css";
import DashboardExpenseCard from "../DashboardExpenseCard";
import Header from "../Header";
// import DashboardExpenseCard from "../DashboardExpensesCard";

const Dashboard = ({ expenses }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      const expenseDate = new Date(exp.date);
      const matchesMonth = selectedMonth
        ? expenseDate.getMonth() + 1 === parseInt(selectedMonth)
        : true;
      const matchesCategory = selectedCategory
        ? exp.category === selectedCategory
        : true;
      return matchesMonth && matchesCategory;
    });
  }, [expenses, selectedMonth, selectedCategory]);

  const total = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const categoryData = useMemo(() => {
    const data = {};
    filteredExpenses.forEach((exp) => {
      data[exp.category] = (data[exp.category] || 0) + Number(exp.amount);
    });
    return Object.entries(data).map(([category, value]) => ({ name: category, value }));
  }, [filteredExpenses]);

  const monthlyData = useMemo(() => {
    const data = {};
    expenses.forEach((exp) => {
      const d = new Date(exp.date);
      const month = d.toLocaleString("default", { month: "short" });
      data[month] = (data[month] || 0) + Number(exp.amount);
    });
    return Object.entries(data).map(([month, value]) => ({ month, value }));
  }, [expenses]);

  const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#9ca3af"];
  
  return (
    <>
      <div className="header"><Header/></div>
    <div className="dashboard">
      
        <div className="hint">
            <h1 className="dashboard-quotation ">Your Financial Story</h1>
            <p className="track-journey">Track your journey...</p>
        </div>

      <div className="filters">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
      </div>

        <div className="stats-container">

  <div className="stat-card">
    <div className="position-up">
    <div className="stat-titles">
        <h4 className="stat-heading">Total Spent</h4>
        <img alt="img" className="logo-img" src="https://res.cloudinary.com/drskskzys/image/upload/v1756931568/Screenshot_2025-09-04_013913_b7ippo.png" />
    </div>
    <div className="stat-details">
        <p className="stat-value">${total}</p>
        <span className="stat-sub">Total amount</span>
    </div>
    </div>
  </div>
  
  <div className="stat-card">
    <div className="position-up">
    <div className="stat-titles">
        <h4 className="stat-heading">Expenses Count</h4>
        <img alt="img" className="logo-img" src="https://res.cloudinary.com/drskskzys/image/upload/v1756932902/Screenshot_2025-09-04_013923_suiaip.png" />
    </div>
    
    <div className="stat-details">
        <p className="stat-value">{filteredExpenses.length}</p>
        <span className="stat-sub">Tracked expenses</span>
    </div>
    </div>
  </div>

  <div className="stat-card">
    <div className="position-up">
        <div className="stat-titles">
            <h4 className="stat-heading">Average</h4>
            <img alt="img" className="logo-img" src="https://res.cloudinary.com/drskskzys/image/upload/v1756932912/Screenshot_2025-09-04_013933_yzsqaq.png" />
        </div>
        <div className="stat-details">
            <p className="stat-value">${total ? total/filteredExpenses.length : 0}</p>
            <span className="stat-sub">Per expense</span>
        </div>
    </div>
  </div>
</div>



<div className="list-container chart-container">
  <h2 className="subtitle">All Expenses</h2>
  <div className="expenses-container">
    
    {filteredExpenses.length!==0 ? filteredExpenses.map((exp) => (
      <DashboardExpenseCard
  key={exp._id}
  title={exp.description || "No Description"}
  category={exp.category}
  date={new Date(exp.date).toLocaleDateString()}
  amount={exp.amount}
/>

    )) : <h1 className="no-expenses">No Expenses Added</h1>}
  </div>
</div>

      <div className="chart-container">
        <h3 className="subtitle">Category Breakdown</h3>{ categoryData.length !== 0 ?
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={120} label>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer> : <h1 className="no-expenses">No Category Fpund</h1>}
      </div>

     
      <div className="chart-container">
        <h3>Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#80aee3ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
