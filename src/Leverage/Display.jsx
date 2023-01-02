import { styleRows } from "../utils/fns.js"

export default function Display({data}){

    const totalList = [
        ...styleRows(data.profit, data.calcTarget, "green"), 
        {uPrice: data.entryPrice, priceChange: 0, percentage: 0, balance: data.capital, pnl: 0, style: "start"},
        ...styleRows(data.loss, data.calcStoploss, "red")
    ].sort((a,b)=> b.uPrice - a.uPrice);

    console.log(totalList)

    return (
        <div >
            
            <div className="display-grid">
               
                <div className="dg-row">
                    <div>Unit Price</div>
                    <div>Price Change $</div>
                    <div>Price Change %</div>
                    <div>PNL</div>
                    <div>Balance</div>
                </div>

                {totalList.map(item=>{
                    return (
                        <div key={item.uPrice} className={`dg-row ${item.style}`}>
                            <div>{item.uPrice}</div>
                            <div>{item.priceChange}</div>
                            <div>{item.percentage}</div>
                            <div>{item.pnl}</div>
                            <div>{item.balance}</div>
                        </div>
                    )
                })}

                

            </div>

        </div>
    );

}