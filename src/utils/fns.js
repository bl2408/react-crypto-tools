
const calcPercentageOf =(percentageValue, ofValue)=> (percentageValue / 100) * ofValue;

const calcPercentage =(num1, num2)=>Math.round(((num1 / num2) - 1) * 10000 ) / 10000

const calcPNL =(target, units, entry)=>(target * units) - (entry * units);



const performObjCalcs = (obj)=>{
    //calculate total capital
    obj.leveragedCapital = obj.capital * obj.leverage

    //calculate total units
    obj.totalUnits = obj.leveragedCapital / obj.entryPrice

    switch(obj.targetOptions){
        case "percentage":
            obj.calcTarget = obj.entryPrice + calcPercentageOf(obj.target, obj.entryPrice);
            break;
        case "addMinusValue":
            obj.calcTarget = obj.entryPrice + obj.target;
            break;
        default :
            obj.calcTarget = obj.target;
    }
    switch(obj.stoplossOptions){
        case "percentage":
            obj.calcStoploss = obj.entryPrice - calcPercentageOf(obj.stoploss, obj.entryPrice);
            break;
        case "addMinusValue":
            obj.calcStoploss = obj.entryPrice - obj.stoploss;
            break;
        default :
            obj.calcStoploss = obj.stoploss;
    }

    return obj;
};




export { performObjCalcs }