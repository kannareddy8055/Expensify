import React from "react";
import { Edit, Trash2 } from "lucide-react"; 
import { FaUtensils, FaTshirt, FaPlane, FaFilm, FaMoneyCheckAlt, FaEllipsisH } from "react-icons/fa"; // category icons
import "./index.css"; 

const categoryIcons = {
  Food: <FaUtensils className="expense-icon food" />,
  Clothing: <FaTshirt className="expense-icon clothing" />,
  Travel: <FaPlane className="expense-icon travel" />,
  Entertainment: <FaFilm className="expense-icon entertainment" />,
  Emi: <FaMoneyCheckAlt className="expense-icon emi" />,
  Others: <FaEllipsisH className="expense-icon others" />,
};

const DashboardExpenseCard = ({ title, category, date, amount}) => {
  return (
    <div className="expense-card">

      <div className="icon-container">
        {categoryIcons[category] || categoryIcons["Others"]}
      </div>

      <div className="expense-details">
        <h4 className="expense-title">{title}</h4>
        <p className="expense-meta">
          {category} • {date}
        </p>
      </div>

      
      <div className="expense-amount">
        ${amount}
      </div>
    </div>
  );
};

export default DashboardExpenseCard;
