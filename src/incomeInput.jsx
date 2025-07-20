export default function IncomeInput(props){
    const currencies = ["LL","USD","EUR","CNY","JPY","GBP", "AUD", "CAD", "CHF","HKD","SGD","INR","KRW","BRL",
        "MXN","ZAR","RUB","SEK","NZD","TRY", "AED"];
    return(
        <form className="flex flex-col items-baseline justify-center gap-4 p-3 border-b border-gray-300 h-24" onSubmit={e=>e.preventDefault()}>
            <h2 className="text-xl font-semibold ">Monthly Income</h2>
            {
                props.month  && props.income !== null && props.currency !== ""?
                <p>your income this month is {props.income} {props.currency}</p>:
                <div className="flex items-center justify-center gap-1 w-full h-7">
                    <div className="w-3/4 flex items-center justify-center gap-1">
                    <input className="border border-gray-300 w-1/2 h-full rounded" onChange={e=>props.setIncome(e.target.value)} type="number" name="income" id="income" required placeholder="Monthly Income"/>
                    <select value={props.currency} onChange={(e) => props.setCurrency(e.target.value)} required name="currency" id="currency">
                        <option value="">Choose currency</option>
                    {
                        currencies.map(currency=>(
                            <option className="text-black" value={currency}>{currency}</option>
                        ))
                    }
                    </select>
                    </div>
                    <input className="bg-blue-500 rounded text-sm text-white w-1/4 h-full" type="submit" value="Set Income" />
                </div>
            }
        </form>
    )
}