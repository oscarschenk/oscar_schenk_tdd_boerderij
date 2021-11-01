

const getYieldForPlant = (input, factor) => {
        
    if (!factor) {
        return input.yield;
    }
    
    let sun = 1;
    let wind = 1;
  
    if (input.factors.sun) {
        switch (factor.sun) {
            case "low":
                sun = (100 + input.factors.sun.low) / 100;
            break;
            case "medium":
                sun = (100 + input.factors.sun.medium) / 100;
            break;
            case "high":
                sun = (100 + input.factors.sun.high) / 100;
            break;
        }
    }

    if (input.factors.wind) {
        switch (factor.wind) {
            case "low":
                wind = (100 + input.factors.wind.low) / 100;
            break;
            case "medium":
                wind = (100 + input.factors.wind.medium) / 100;
            break;
            case "high":
                wind = (100 + input.factors.wind.high) / 100;
            break;
        }
    }
  
    const yieldForPlant = input.yield * sun * wind;
  
    return yieldForPlant;
};


const getYieldForCrop = (input, factor) => {
    return input.numCrops * getYieldForPlant(input.crop, factor)
}


const getTotalYield = (input, factor) => {
    const yieldPerCrop = input.crops.map(item => getYieldForCrop(item, factor))
    totalCrops = yieldPerCrop.reduce(function(sum, number) {
        const updatedSum = sum + number;
        return updatedSum;
    }, 0);
    return totalCrops
}

const getCostsForCrop = (input) => {
    const costsCalc = input.crops.map(item => {
        return item.crop.cost * item.numCrops
    })
    totalCosts = costsCalc.reduce(function(sum, number) {
        const updatedSum = sum + number;
        return updatedSum;
    }, 0);
    return totalCosts
}

const getRevenueForCrop = (input, factor) => {
    const revenueCalc = input.crops.map(item => {
        const yieldPerCrop = getYieldForCrop(item, factor)
        const revenuePerCrop = yieldPerCrop * item.crop.salePrice;
        return revenuePerCrop
    })
    totalRevenue = revenueCalc.reduce(function(sum, number) {
        const updatedSum = sum + number;
        return updatedSum;
    }, 0);
    return totalRevenue
}

const getProfitForCrop = (input, factor) => {
    const revenuePerPlant = getRevenueForCrop(input, factor);
    const profitPerPlant = revenuePerPlant - getCostsForCrop(input);
    return profitPerPlant;
    
    return 
}

const getTotalProfit = (input, factor) => {
    const totalRevenue = getRevenueForCrop(input);
    const totalCost = getCostsForCrop(input);
    const totalProfit = totalRevenue - totalCost;
    return totalProfit;
}


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};

