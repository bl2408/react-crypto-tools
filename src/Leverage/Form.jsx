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
                case "text":
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
                    <input type="text" name="capital" pattern="\d*" />
                </label>

                <label>
                    Leverage:
                    <input type="text" name="leverage" pattern="\d*" />
                </label>
            </div>

            <label>
                Entry price:
                <input type="text" name="entryPrice" pattern="\d*" />
            </label>

            <div className="row2">
                <label>
                    Target:
                    <input type="text" name="takeProfit" pattern="\d*" />
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
                    <input type="text" name="stopLoss" pattern="\d*" />
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