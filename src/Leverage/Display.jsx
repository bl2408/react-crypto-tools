import { selectHighlight } from '../utils/fns'

export default function Display({data}){

    const formatInsertValues =({value, symbol, fixed, symbolEnd})=>{
        if(value === undefined || value.length <= 0){ return ;}

        value = value.toFixed(!fixed ? 4 : fixed);

        if(fixed === 0){
            value = parseInt(value);
        }

        let negative = "";

        if(value < 0){
            value = Math.abs(value);
            negative = "-"
        }

        return (
            <>
                {negative}
                {!symbolEnd ? symbol : ""}
                <span onClick={selectHighlight}>{value}</span>
                {symbolEnd ? symbol : ""}
            </>
        )
        
        
    };

    const tableTakeProfitRow = (
        <div className="row4 alignCenter green">
            <div className="header alignRight">Target:</div>
            <div>{formatInsertValues({value: data.calcTakeProfit, symbol: "$"})}</div>
            <div>{formatInsertValues({value: data.takeProfitChangeValue, symbol: "$"})}</div>
            <div>{formatInsertValues({value: data.takeProfitChangePercent, symbol: "%", symbolEnd: true, fixed:2})}</div>
        </div>
    );

    const tableStopLostRow = (
        <div className="row4 alignCenter red">
            <div className="header alignRight">SL:</div>
            <div>{formatInsertValues({value: data.calcStopLoss, symbol: "$"})}</div>
            <div>{formatInsertValues({value: data.stopLossChangeValue, symbol: "$"})}</div>
            <div>{formatInsertValues({value: data.stopLossChangePercent, symbol: "%", symbolEnd: true, fixed:2})}</div>
        </div>
    );

    const tableLoss = data?.calcLossTable?.map((item, i)=>{
        const liqStyle = parseInt(Math.round(item.risk)) === 100 ? "red" : "";
        return (
            <div key={`losstable-${i}`} className={`row5 alignCenter ${liqStyle}`}>
                <div>{formatInsertValues({value: item.unitPrice, symbol: "$"})}</div>
                <div>{formatInsertValues({value: item.priceChange, symbol: "$"})}</div>
                <div>{formatInsertValues({value: item.priceChangePercent, symbol: "%", symbolEnd:true, fixed: 2})}</div>
                <div>{formatInsertValues({value: item.risk, symbol: "%", symbolEnd:true, fixed: 0})}</div>
                <div>{formatInsertValues({value: item.capitalChange, symbol: "$"})}</div>
            </div>
        )
    });

    return (
        <div id="display-grids">

            <div className="col1">

                {/* target/current/sl */}
                <div>
                    <div className="row4 alignCenter header">
                        <div></div>
                        <div>Unit $</div>
                        <div>Change $</div>
                        <div>Change %</div>
                    </div>

                    {data.mode == "long" ? tableTakeProfitRow : tableStopLostRow}
                    
                    <div className="row4 alignCenter">
                        <div className="header alignRight headerbg">Entry:</div>
                        <div>{formatInsertValues({value: data.entryPrice, symbol: "$"})}</div>
                        <div></div>
                        <div></div>
                    </div>

                    {data.mode == "short" ? tableTakeProfitRow : tableStopLostRow}
                    
                </div>
                
                {/* Profit/Loss */}
                <div>
                    <div className="row4 alignCenter header">
                        <div></div>
                        <div>Total</div>
                        <div>ROI %</div>
                        <div>Balance $</div>
                    </div>
                    <div className={`row4 alignCenter ${ data.profit < 0 ? "red" : "green"}`}>
                        <div className="header alignRight">Profit:</div>
                        <div>
                            {formatInsertValues({value: data.profit, symbol: "$"})}
                        </div>
                        <div>
                            {formatInsertValues({value: data.calcTakeProfitROI, symbol: "%", symbolEnd: true, fixed: 2})}
                        </div>
                        <div>
                            {formatInsertValues({value: data.calcTakeProfitBalance, symbol: "$"})}
                        </div>
                    </div>
                    <div className={`row4 alignCenter ${ data.loss > 0 ? "green" : "red"}`}>
                        <div className="header alignRight">Loss:</div>
                        <div>
                            {formatInsertValues({value: data.loss, symbol: "$"})}
                        </div>
                        <div>
                            {formatInsertValues({value: data.calcStopLossROI, symbol: "%", symbolEnd: true, fixed: 2})}
                        </div>
                        <div>
                            {formatInsertValues({value: data.calcStopLossBalance, symbol: "$"})}
                        </div>
                    </div>
                </div>

                {/* Loss table */}
                <div>
                    <div className="row5 header alignCenter">
                        <div>Unit $</div>
                        <div>Change $</div>
                        <div>Change %</div>
                        <div>Risk</div>
                        <div>Loss</div>
                    </div>

                    {data.calcLossTable ? tableLoss : null}

                </div>
                
                {/* balance */}
                <div>
                    <div className="row4 alignCenter header">
                        <div></div>
                        <div>Intial</div>
                        <div>Leverage</div>
                        <div>Value</div>
                    </div>
                    <div className="row4 alignCenter">
                        <div className="header alignRight headerbg">Balance:</div>
                        <div>{formatInsertValues({value: data.capital, symbol: "$", fixed: 2})}</div>
                        <div>{formatInsertValues({value: data.leverage, fixed: 1, symbol: "x"})}</div>
                        <div>{formatInsertValues({value: data.leveragedCapital, fixed: 2, symbol: "$"})}</div>
                    </div>

                </div>

                {/* Units */}
                <div>
                    <div className="row4 alignCenter header">
                        <div></div>
                        <div>Total</div>
                        <div></div>
                        <div>$ Per unit</div>
                    </div>
                    <div className="row4 alignCenter">
                        <div className="header headerbg alignRight">Units:</div>
                        <div>{formatInsertValues({value: data.totalUnits})}</div>
                        <div></div>
                        <div>{formatInsertValues({value: data.entryPrice, symbol:"$"})}</div>
                    </div>
                </div>

            </div>
            
            <div className="col2">
            </div>

        </div>
    );

}