import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseList from "./components/Expense List/ExpenseList";
import { useState } from "react";
import ExpenseFilter from "./components/Expense List/ExpenseFilter";
import ExpenseForm from "./components/Expense List/ExpenseForm";
import useDarkMode from "./components/hooks/useDarkMode";
import MyNavbar from "./components/Navbar/Navbar";
import Darkmode from "./components/Darkmode/Darkmode";
import myImageDay from "./images/lightMode.png";
import myImageNight from "./images/darkMode.png";

function App() {
  const { darkMode, handleMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Milk",
      amount: 3,
      category: "Groceries",
    },
    {
      id: 2,
      description: "hamer",
      amount: 19,
      category: "Utilities",
    },
    {
      id: 3,
      description: "balloons",
      amount: 2,
      category: "Entertainment",
    },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <MyNavbar>
        <Darkmode
          onClick={handleMode}
          src={darkMode ? myImageNight : myImageDay}
          alt={darkMode ? "Light Mode" : "Dark Mode"}
        />
      </MyNavbar>

      <div
        className={
          darkMode
            ? "dark-mode px-5 m-5 justify-content-between"
            : "light-mode px-5 m-5 justify-content-between"
        }
      >
        <div className="mb-5">
          <ExpenseForm
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          />
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      </div>
    </>
  );
}

export default App;
