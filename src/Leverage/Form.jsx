import { useEffect, useRef } from "react";

export default function Form({setValuesObj}){

    const refForm = useRef();

    useEffect(()=>{
        document.querySelectorAll("option").forEach(el=>{
            el.innerHTML = `${el.innerHTML} &nbsp;`
        });
    },[]);

    const handleSubmit =(mode)=>{

        const obj = {
            mode
        };

        for(const item of refForm.current.elements){
            
            switch(item.type){
                case "number":
                    if(!item.value){ 
                        item.focus();
                        return ;
                    }
                    obj[item.name] = isNaN(parseFloat(item.value)) ? 0 : Math.abs(parseFloat(item.value));
                    break;
                case "select-one":
                    obj[item.name] = item.value;
                    break;
            }
        }

        setValuesObj(state=>({...obj}))
    };

    return (

        <form ref={refForm} onSubmit={e=>e.preventDefault()} autoComplete="off">
            <div className="row2">
                <label>
                    Capital:
                    <input name="capital" type="number" pattern="[0-9]*" inputMode="numeric" step="any" />
                </label>

                <label>
                    Leverage:
                    <input name="leverage" type="number" pattern="[0-9]*" inputMode="numeric" step="any" />
                </label>
            </div>

            <label>
                Entry price:
                <input name="entryPrice" type="number" pattern="[0-9]*" inputMode="numeric" step="any" />
            </label>

            <div className="row2">
                <label>
                    Target:
                    <input name="takeProfit" type="number" pattern="[0-9]*" inputMode="numeric" step="any" />
                </label>
                <label>
                    Option:
                    <select name="takeProfitOptions">
                        <option value="percentage">%</option>
                        <option value="addMinusValue">Price +/- $</option>
                        <option value="pricePerUnit">$ per unit</option>
                    </select>
                </label>  
            </div>

            <div className="row2">
                <label>
                    Stoploss:
                    <input name="stopLoss" type="number" pattern="[0-9]*" inputMode="numeric" step="any" />
                </label>
                <label>
                    Option:
                    <select name="stopLossOptions">
                        <option value="percentage">%</option>
                        <option value="addMinusValue">Price +/- $</option>
                        <option value="pricePerUnit">$ per unit</option>
                    </select>
                </label>  
            </div>

             

            <div id="form-buttons">
                <button onClick={()=>handleSubmit("long")}>Long</button>
                <button onClick={()=>handleSubmit("short")}>Short</button>
                <input type="reset" value="Clear" />
            </div>
        </form>

    );
}