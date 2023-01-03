import { useState, useMemo, lazy, Suspense, useEffect } from "react";
// import { performObjCalcs } from "../utils/fns";
// import Display from "./Display";
import Form from "./Form";
import "./index.css";


const Display = lazy(() => import('./Display'));


export default function Leverage(){

    const [ valuesObj, setValuesObj ] = useState({});
    const [ calcObj, setCalcObj ] = useState({});

    useEffect(()=>{
        if(valuesObj.mode){
            import("../utils/fns").then(fn =>fn.performObjCalcs(valuesObj)).then(res=>setCalcObj(state=>res));
        }
        return ()=>{};
    }, [valuesObj]);

    return (
        <main>
            <Form setValuesObj={setValuesObj} />
            {calcObj.mode 
            ? 
                <Suspense fallback={<div>Loading...</div>}>
                    <Display data={calcObj} />
                </Suspense> 
            : null
            }
            
        </main>
    );
}