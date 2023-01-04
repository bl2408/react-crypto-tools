
const calcPercentageOf =(percentageValue, ofValue)=> (percentageValue / 100) * ofValue;

const calcPercentage =(num1, num2, abs=true)=>Math.abs(Math.round(((num1 / num2) - 1) * 10000 ) / 10000 ) * 100;

const calcPNL = (target, units, entry)=>(target * units) - (entry * units);



const performObjCalcs = (obj)=>{

    if(!obj.mode){ return {}; }

    //calculate total capital
    obj.leveragedCapital = obj.capital * obj.leverage

    //calculate total units
    obj.totalUnits = obj.leveragedCapital / obj.entryPrice

    obj.calcTakeProfit = obj.entryPrice
    
    switch(obj.takeProfitOptions){
        case "percentage":
            obj.calcTakeProfit = obj.mode ==="long" 
            ? obj.calcTakeProfit + calcPercentageOf(obj.takeProfit, obj.entryPrice)
            : obj.calcTakeProfit - calcPercentageOf(obj.takeProfit, obj.entryPrice);
            break;
        case "addMinusValue":
            obj.calcTakeProfit = obj.mode ==="long" 
            ? obj.entryPrice + obj.takeProfit
            : obj.entryPrice - obj.takeProfit;
            break;
        default :
            obj.calcTakeProfit = obj.takeProfit;
    }

    obj.calcStopLoss = obj.entryPrice

    switch(obj.stopLossOptions){
        case "percentage":
            obj.calcStopLoss = obj.mode ==="long" 
            ? obj.calcStopLoss - calcPercentageOf(obj.stopLoss, obj.entryPrice)
            : obj.calcStopLoss + calcPercentageOf(obj.stopLoss, obj.entryPrice);
            break;
        case "addMinusValue":
            obj.calcStopLoss = obj.mode ==="long" 
            ? obj.calcStopLoss - obj.stopLoss
            : obj.calcStopLoss + obj.stopLoss;
            break;
        default :
            obj.calcStopLoss = obj.stopLoss;
    }

    if(obj.mode ==="long"){
        obj.calcStopLoss = obj.calcStopLoss < 0 ? 0 : obj.calcStopLoss;
    }else if(obj.mode ==="short"){
        obj.calcTakeProfit = obj.calcTakeProfit < 0 ? 0 : obj.calcTakeProfit;
    }

    // calculate P/L changes
    obj.takeProfitChangePercent = calcPercentage(obj.calcTakeProfit, obj.entryPrice);
    obj.takeProfitChangeValue = obj.calcTakeProfit - obj.entryPrice;

    obj.stopLossChangePercent = calcPercentage(obj.calcStopLoss, obj.entryPrice);
    obj.stopLossChangeValue = obj.calcStopLoss - obj.entryPrice;

    //calculate PNL
    obj.profit = calcPNL(
        obj.mode ==="long" ? obj.calcTakeProfit : obj.entryPrice, 
        obj.totalUnits, 
        obj.mode ==="long" ?  obj.entryPrice : obj.calcTakeProfit
    );
    obj.loss = calcPNL(
        obj.mode ==="long" ? obj.calcStopLoss :  obj.entryPrice, 
        obj.totalUnits, 
        obj.mode ==="long" ? obj.entryPrice : obj.calcStopLoss, 
    );

    obj.calcTakeProfitBalance = obj.capital + obj.profit;
    obj.calcStopLossBalance = obj.capital - Math.abs(obj.loss);

    obj.calcTakeProfitROI = calcPercentage(obj.calcTakeProfitBalance, obj.capital);
    obj.calcStopLossROI = calcPercentage(obj.calcStopLossBalance, obj.capital);

    obj.calcLossTable = calcLossTable(obj.capital, obj.entryPrice, obj.totalUnits, obj.mode);

    return obj;
};

const calcLossTable =(capital, entry, units, mode)=>{
    const arr = [];
    let capitalChange = 0
    let unitPrice = 0

    for(let i=.1; i <=1; i+=.1){
        capitalChange = capital * i

        if(mode === "long"){
            unitPrice = ((units * entry) - capitalChange) / units;
        }else{
            unitPrice = ((units * entry) + capitalChange) / units;
        }

        if(unitPrice < 0){
            break;
        }
        arr.push({
            unitPrice,
            priceChange: Math.abs(unitPrice - entry),
            priceChangePercent: calcPercentage(unitPrice, entry),
            risk: i * 100,
            capitalChange,
        });
    }
    
    return arr;
};


const selectHighlight =(e)=> {
    window.getSelection()
      .selectAllChildren(e.target);
};




export { performObjCalcs, selectHighlight}