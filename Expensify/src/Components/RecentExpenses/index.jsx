import React from "react"
import ExpenseCard from "../ExpensesCard"
import ExpenseInput from "../ExpensesInput" 
const Expenses = () => {
    return (
        <>
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <ExpenseInput />
        </div>
        
        </>
    )
}

export default Expenses;