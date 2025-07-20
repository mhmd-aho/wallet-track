export default function AddExpense(props){
    const handleOnsubmit = ()=>{
        const expenseToAdd = { ...props.newExpense}; 
        props.setExpenses(prev=>[...prev, expenseToAdd])
        props.setExpense({id: Date.now(),date:props.formatted,amount: null,note: "",category: "",})}
    const handleChange = (e) => {
    const { name, value } = e.target;
    props.setExpense((prev) => ({
        ...prev,
        [name]: name === "amount" ? Number(value) : value,
    }));
};
    return(
        <form className="flex flex-col items-baseline justify-center gap-4 p-3 border-b border-gray-300"  onSubmit={handleOnsubmit}>
            <h2 className="text-xl font-semibold ">Add Expense</h2>
            <div className="flex flex-col gap-2 w-full lg:px-40 lg:self-center">
                <div className="flex items-center justify-center gap-1 w-full">
                    <input className="border border-gray-300 rounded w-1/2" onChange={handleChange} type="number" name="amount" id="amount" value={props.newExpense.amount} required min={0} placeholder="Amount" />
                    <select className="border border-gray-3 rounded w-1/2" onChange={handleChange} name="category" id="category" value={props.newExpense.category} required>
                        <option value="">Category</option>
                        <option className="text-black" value="housing">Housing</option>
                        <option className="text-black" value="transportation">Transportation</option>
                        <option className="text-black" value="groceries">Groceries</option>
                        <option className="text-black" value="utilities">Utilities</option>
                        <option className="text-black" value="personal">Personal</option>
                        <option className="text-black" value="health">Health</option>
                        <option className="text-black" value="education">Education</option>
                        <option className="text-black" value="savings">Savings</option>
                        <option className="text-black" value="other">Other</option>
                    </select>
                </div>
                <input className="border border-gray-300 rounded w-full h-7"  onChange={handleChange} type="text" name="note" id="note" placeholder="Note" value={props.newExpense.note} />
                <input className="bg-blue-500 rounded w-full h-7 text-white" type="submit" value="Add expense" />
            </div>
        </form>
    )
}