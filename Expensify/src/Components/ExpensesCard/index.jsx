
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

const ExpenseCard = ({ title, category, date, amount, onDelete, onEdit }) => {
  return (
    <div className="expense-card-1">

      <div className="icon-container-1">
        {categoryIcons[category] || categoryIcons["Others"]}
      </div>

      <div className="expense-details-1">
        <h4 className="expense-title-1">{title}</h4>
        <p className="expense-meta-1">
          {category} • {date}
        </p>
      </div>

      
      <div className="expense-amount-1">
        ${amount}
      </div>

      <div className="expense-actions-1">
        <Edit className="action-icon-1 edit-1" onClick={onEdit} />
        <Trash2 className="action-icon-1 delete-1" onClick={onDelete} />
      </div>
    </div>
  );
};

export default ExpenseCard;
