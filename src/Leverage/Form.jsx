export default function Form({setValuesObj}){


    const handleSubmit =e=>{
        e.preventDefault();

        const obj = {};

        for(const item of e.target.elements){
            switch(item.type){
                case "text":
                    obj[item.name] = isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
                    break;
                case "select-one":
                    obj[item.name] = item.value
                    break;
            }
        }

        setValuesObj(state=>({...obj}))
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className="row2">
                <label>
                    Capital:
                    <input type="text" name="capital"/>
                </label>

                <label>
                    Leverage:
                    <input type="text" name="leverage"/>
                </label>
            </div>

            <label>
                Entry price:
                <input type="text" name="entryPrice"/>
            </label>

            <div className="row2">
                <label>
                    Target:
                    <input type="text" name="target"/>
                </label>
                <label>
                    Option
                    <select name="targetOptions">
                        <option value="percentage">%</option>
                        <option value="addMinusValue">Price +/- $</option>
                        <option value="pricePerUnit">$ per unit</option>
                    </select>
                </label>  
            </div>

            <div className="row2">
                <label>
                    Stoploss:
                    <input type="text" name="stoploss"/>
                </label>
                <label>
                    Option
                    <select name="stoplossOptions">
                        <option value="percentage">%</option>
                        <option value="addMinusValue">Price +/- $</option>
                        <option value="pricePerUnit">$ per unit</option>
                    </select>
                </label>  
            </div>

             

            <div id="form-buttons">
                <input type="submit" value="Long" />
                <input type="submit" value="Short" />
                <input type="reset" value="Clear" />
            </div>
        </form>

    );
}