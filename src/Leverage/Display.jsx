
export default function Display({data}){


    return (
        <div id="display-grids">

            <div className="col1">
                {/* balance/units/pnl */}
                <div>
                    <div className="row4">
                        <div className="header alignRight">Balance:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="row4">
                        <div className="header alignRight">Units:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="row4">
                        <div className="header alignRight">PNL:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="row4">
                        <div className="header alignRight">Liquidation:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                
                {/* target/current/sl */}
                <div>
                    <div className="row4">
                        <div></div>
                        <div className="header">Unit $</div>
                        <div className="header">Change $</div>
                        <div className="header">Change %</div>
                    </div>
                    <div className="row4">
                        <div className="header alignRight">Target:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="row4">
                        <div className="header alignRight">Current:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="row4">
                        <div className="header alignRight">SL:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            
            <div className="col2">
                {/* Profit range */}
                <div>
                    <div className="row4 header alignCenter">
                        <div>Unit $</div>
                        <div>Change $</div>
                        <div>Change %</div>
                        <div>Balance +$</div>
                    </div>                                      
                </div>

                {/* Loss range */}
                <div>
                    <div className="row4 header alignCenter">
                        <div>Unit $</div>
                        <div>Change $</div>
                        <div>Change %</div>
                        <div>Balance -$</div>
                    </div>                                      
                </div>
            </div>

        </div>
    );

}