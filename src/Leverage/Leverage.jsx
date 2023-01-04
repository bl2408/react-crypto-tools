import { useState, lazy, Suspense, useEffect } from "react";
import Form from "./Form";
import "./index.css";


const Display = lazy(() => import('./Display'));
const LiveTrades = lazy(() => import('./LiveTrades'));


export default function Leverage(){

    const [ valuesObj, setValuesObj ] = useState({});
    const [ calcObj, setCalcObj ] = useState({});
    
    const [ liveTradesBar, setLiveTradesBar ] = useState(false);

    useEffect(()=>{
        if(valuesObj.mode){
            import("../utils/fns").then(fn =>fn.performObjCalcs(valuesObj)).then(res=>setCalcObj(state=>res));
        }
        return ()=>{};
    }, [valuesObj]);

    return (
        <main>

            <Form setValuesObj={setValuesObj} />

            <div id="display-grids" className={liveTradesBar ? "open" : null}>

                <div className="col1">
                {
                    calcObj.mode 
                    ? 
                        <Suspense fallback={<div>Loading...</div>}>
                            <Display data={calcObj} setLiveTradesBar={setLiveTradesBar} />
                        </Suspense> 
                    : null
                }                   
                </div>

                <div className="col2">
                    <Suspense fallback={<div>Loading...</div>}>
                        <LiveTrades />
                    </Suspense>
                    
                </div>

            </div>

            
            
            
        </main>
    );
}