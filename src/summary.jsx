import { useEffect,useRef } from "react";
import Chart from "chart.js/auto";
export default function Summary(props){
    let totalExpenses = props.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    let remaining = (props.income??0) - (totalExpenses?? 0);
    let housingAmount = [];
    let transportationAmount = [];
    let groceriesAmount = [];
    let utilitiesAmount = [];
    let personalAmount = [];
    let healthAmount = [];
    let educationAmount = [];
    let savingsAmount = [];
    let otherAmount = [];
    props.expenses.forEach(expense=>{
        if(expense.category === 'housing'){
            housingAmount.push(expense.amount);
        }else if(expense.category === 'transportation'){
            transportationAmount.push(expense.amount);
        }else if(expense.category === 'groceries'){
            groceriesAmount.push(expense.amount);
        }else if(expense.category === "utilities"){
            utilitiesAmount.push(expense.amount);
        }else if(expense.category === "personal"){
            personalAmount.push(expense.amount);
        }else if(expense.category === "health"){
            healthAmount.push(expense.amount)
        }else if(expense.category === "education"){
            educationAmount.push(expense.amount)
        }else if(expense.category === "savings"){
            savingsAmount.push(expense.amount)
        }else if(expense.category === "other"){
            otherAmount.push(expense.amount)
        }
    })
    let sumHousing = housingAmount.reduce((total, num) => total + num, 0);
    let sumTransportaion = transportationAmount.reduce((total, num) => total + num, 0);
    let sumGroceries = groceriesAmount.reduce((total, num) => total + num, 0);
    let sumUtilities = utilitiesAmount.reduce((total, num) => total + num, 0);
    let sumPersonal = personalAmount.reduce((total, num) => total + num, 0);
    let sumHealth = healthAmount.reduce((total, num) => total + num, 0);
    let sumEducation = educationAmount.reduce((total, num) => total + num, 0);
    let sumSavings = savingsAmount.reduce((total, num) => total + num, 0);
    let sumOther = otherAmount.reduce((total, num) => total + num, 0);
    const rawLabels = [
  'Housing', 'Transportation', 'Groceries', 'Utilities',
  'Personal', 'Health', 'Education', 'Savings', 'Others', 'Remaining'
];

const rawData = [
  sumHousing, sumTransportaion, sumGroceries, sumUtilities,
  sumPersonal, sumHealth, sumEducation, sumSavings, sumOther, remaining
];

const rawColors = [
  '#10b981', '#3b82f6', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#6366f1', '#22d3ee',
  '#a855f7', '#9ca3af'
];
const filtered = rawData.map((value, i) => ({ label: rawLabels[i], value, color: rawColors[i] }))
.filter(entry => entry.value > 0);
const labels = filtered.map(entry => entry.label);
const data = filtered.map(entry => entry.value);
const backgroundColor = filtered.map(entry => entry.color);
    const doughnut = useRef();
    useEffect(()=>{
        if (!doughnut.current  || !remaining) return;
        const doughnutInstance = new Chart(doughnut.current, {
            type:'pie',
            data: {
                labels:labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins:{
                    legend:{
                        position:'bottom',
                        labels:{
                            usePointStyle:true,
                            pointStyle:'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Expenses Breakdown',
                        font: {
                            size: 20,
                            weight: '600',
                            color:'#000000'
                    },
                }
            }
        }
    });
        return () => doughnutInstance.destroy();
        
    }, [props.expenses, props.income]);
    return(
        <section className="flex items-center justify-center p-3 border-b border-gray-300 h-64 lg:px-40">
            <div className="flex flex-col items-baseline justify-between gap-4 w-1/2 h-full">
                <h2 className="text-xl font-semibold mt-1 ">Summary</h2>
                <ul className="flex flex-col gap-4 h-5/6">
                    <li>Total income: {props.income != 0 ?`${props.income} ${props.currency}` : " " }</li>
                    <li>Total Expense: {(totalExpenses?? 0)} {props.currency}</li>
                    <li>Remaining: {remaining} {props.currency} </li>
                </ul>
            </div>
            <div className="w-1/2 h-full relative">
                <canvas className="w-3/4 h-auto overflow-hidden"  ref={doughnut}/>
            </div>
        </section>
    )
}