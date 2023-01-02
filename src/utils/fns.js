
const calcPercentageOf =(percentageValue, ofValue)=> (percentageValue / 100) * ofValue;

const calcPercentage =(num1, num2)=>Math.round(((num1 / num2) - 1) * 10000 ) / 10000

const calcPNL =(target, units, entry)=>(target * units) - (entry * units);

const createRangeList = (target, units, entry, capital, amt)=>{
    const percentageTarget = calcPercentage(target, entry)
    const eachWayPercent = (percentageTarget) / amt;
    const arr = [];
    //console.log(percentageTarget)
    for(let i=1; i <= (amt * 2); i++){
        const percentage = eachWayPercent * i
        const uPrice = (percentage * entry) + entry;

        const balance = calcPNL(uPrice, units, entry) + capital

        arr.push({
            uPrice,
            priceChange: uPrice - entry,
            percentage: percentage * 100,
            balance,
            pnl: balance - capital
        });

        if(uPrice < 0){
            break;
        }
    }
    arr.pop()
    return arr;
};


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

    //get range options
    obj.rangeTargetOptions = isNaN(parseFloat(obj.rangeTargetOptions)) ? 0.5 : parseFloat(obj.rangeTargetOptions);
    obj.rangeStoplossOptions = isNaN(parseFloat(obj.rangeStoplossOptions)) ? 0.5 : parseFloat(obj.rangeStoplossOptions);


    //calculate pnl
    obj.profit = createRangeList(obj.calcTarget, obj.totalUnits, obj.entryPrice, obj.capital, obj.rangeTargetOptions)
    obj.loss = createRangeList(obj.calcStoploss, obj.totalUnits, obj.entryPrice, obj.capital, obj.rangeStoplossOptions)

    return obj;
};


const styleRows = (data, target, colour)=>{

    return data.map(p=>{
        let style = colour;
        console.log()
        if(p.uPrice === target){
            style=`${style} target`;
        }else{
            style=`${style} range`;
        }
        return {...p, style}
    });

};



export { performObjCalcs, styleRows }