import { useState, useMemo } from "react";
import { performObjCalcs } from "../utils/fns";
import Display from "./Display";
import Form from "./Form";
import "./index.css"

export default function Leverage(){

    const [ valuesObj, setValuesObj ] = useState({});
    const calcObj = useMemo(() => performObjCalcs(valuesObj), [valuesObj]);


    return (
        <main>
            <Form setValuesObj={setValuesObj} />
            <Display data={calcObj} />
        </main>
    );
}