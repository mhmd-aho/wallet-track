import Expense from "./expense"
export default function ExpenseHistory(props){
    const expenses = props.expenses
    return(
        <section className="flex flex-col sm:items-center items-baseline justify-center gap-4 p-3 border-b border-gray-300 h-72 " >
            <h2 className="text-xl font-semibold sm:self-baseline ">Expenses History</h2>
            <div className="sm:w-3/4 w-full h-3/4 border border-gray-400  rounded-2xl">
            <div className="w-full px-2 h-1/6 flex items-center lg:gap-36 sm:gap-10 border-b border-gray-400 text-center" >
                <p className="sm:text-lg text-sm font-semibold w-28" >Date</p>
                <p className="sm:text-lg text-sm font-semibold w-28" >Category</p>
                <p className="sm:text-lg text-sm font-semibold w-28" >Note</p>
                <p className="sm:text-lg text-sm font-semibold w-28" >Amount</p>
            </div>
            <div className="h-5/6 pb-2">
                <div className="h-full overflow-y-auto">
                    {
                        expenses.map(expense=>(
                            <Expense setExpenses={props.setExpenses} currency={props.currency} id={expense.id} key={expense.id} amount={expense.amount} note={expense.note} date={expense.date} category={expense.category} />
                        )
                        )
                    }
                </div>
            </div>
        </div>
        </section>
    )
}