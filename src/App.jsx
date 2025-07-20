import sun from '/src/img/icons8-sun-60.png';
import moon from '/src/img/icons8-dark-mode-50.png';
import { useState,useEffect } from 'react';
import IncomeInput from "./incomeInput";
import AddExpense from './addExpense';
import Summary from './summary';
import ExpenseHistory from './expenseHistory';
function App() {
  const [darkMode,setDarkMode] = useState(null);
  const handleClick=()=>{
    darkMode? setDarkMode(null) : setDarkMode("dark");
  }
  const [month,setMonth]= useState(()=>{
    const saved = localStorage.getItem('month');
    return saved ? JSON.parse(saved): ""}
  )
  useEffect(() => {
  localStorage.setItem('month', JSON.stringify(month));
}, [month]);
  const [income,setIncome]= useState(()=>{
    const saved = localStorage.getItem('income');
    return saved ? JSON.parse(saved): ""}
  )
  useEffect(() => {
  localStorage.setItem('income', JSON.stringify(income));
}, [income]);
const date = new Date();
const day = String(date.getDate()).padStart(2,'0');
const currentMonth = String(date.getMonth()+1).padStart(2,'0');
const year = String(date.getFullYear());
const formatted = `${day}-${currentMonth}-${year}`
const [newExpense, setExpense] = useState({
    id: Date.now(),
    date:formatted,
    amount: null,
    note: "",
    category: "",
  });
  const [expenses,setExpenses]= useState(()=>{
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved): []}
  );
  useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}, [expenses]);
  const [currency,setCurrency]= useState(()=>{
    const saved = localStorage.getItem('currency');
    return saved ? JSON.parse(saved): ""}
  )
  useEffect(() => {
  localStorage.setItem('currency', JSON.stringify(currency));
}, [currency]);
useEffect(()=>{
  const currentMonth =new Date().getMonth();
  if(month !== currentMonth) {
    setIncome(0);
    setExpenses([]);
    setMonth(currentMonth)
  }
},[month])
  return (
    <div className={`${darkMode} h-full bg-white text-neutral-900 dark:text-white dark:bg-neutral-900`}>
      <header className='p-2 flex items-center justify-between border-gray-300 border-b h-1/12 '>
        <h1 className='lg:text-3xl sm:text-3xl text-2xl font-bold border-gray-300 '>WalletTrack</h1>
        <button onClick={handleClick} ><img className=' sm:h-10 h-8 sm:w-10 w-8 ' src={darkMode? moon : sun} /></button>
      </header>
      <main className='h-11/12'>
        <IncomeInput setCurrency={setCurrency} currency={currency} setIncome={setIncome} setMonth={setMonth} month={month} income={income} />
        <AddExpense newExpense={newExpense} setExpenses={setExpenses} date={date} formatted={formatted} setExpense={setExpense}/>
        <Summary currency={currency} income={income} expenses={expenses}/>
        <ExpenseHistory setExpenses={setExpenses} currency={currency} expenses={expenses}/>
      </main>
    </div>
  )
}

export default App
