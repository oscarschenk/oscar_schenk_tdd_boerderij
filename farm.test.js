const { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostsForCrop, 
    getRevenueForCrop, 
    getProfitForCrop,
    getTotalProfit 
} = require("./farm.js");

const corn = {
        name: "corn",
        yield: 3,
        cost: 1,
        salePrice: 3,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low:0,
                medium: -15,
                high: -40
            },
        },
    };

const avocado = {
        name: "avocado",
        yield: 10,
        cost: 5,
        salePrice: 3,
        factors: {
            sun: {
                low: -20,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60
            },
        },
    };

const pumpkin = {
        name: "pumpkin",
        yield: 1,
        cost: 2,
        salePrice: 10,
        factors: {
            sun: {
                low: -70,
                medium: 0,
                high: 70,
            },
            wind: {
                low: 0,
                medium: -25,
                high: -50
            },
        },
    };

const watermelon = {
        name: "watermelon",
        yield: 5,
        cost: 3,
        salePrice: 8,
        factors: {
            sun: {
                low: -70,
                medium: 0,
                high: 100,
            },
            wind: {
                low: 0,
                medium: -25,
                high: -60
            }
        },
    };

describe("getYieldForPlant", () => {
    
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(3);
    });

    test("Get yield for plant with low sun factor", () => {
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
    });

    test("Get yield for plant with high wind factor", () => {
        const environmentFactors = {
            wind: "high",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBeCloseTo(1.8);
    });

    test("Get yield for plant with medium wind and high sun factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBeCloseTo(3.825);
    });



});

describe("getYieldForCrop", () => {
    
    test("Get yield for crop, simple", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop, with environment factors", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium"
        }

        expect(getYieldForCrop(input, environmentFactors)).toBe(12.75);
    });


});

describe("getTotalYield", () => {
    
    test("Calculate total yield with multiple crops", () => {
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(17);
    });

    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });

    test("Calculate total yield with multiple crops and environment factors", () => {
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: avocado, numCrops: 3 },
            { crop: pumpkin, numCrops: 2 },
            { crop: watermelon, numCrops: 5},
        ];
        const environmentFactors = {
            sun: "high",
            wind: "high"
        }
        expect(getTotalYield({ crops }, environmentFactors)).toBeCloseTo(53.2);
    });

});

describe("getCostsForCrop", () => {
    test("Get Cost For Planting Crop", () => {
        const crops = [
            { crop: corn, numCrops: 15 },
        ];
        expect(getCostsForCrop({crops})).toBe(15);
    });
});

describe("getRevenueForCrop", () => {
    test("Get Revenue For Crop", () => {
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: avocado, numCrops: 3 },
            { crop: pumpkin, numCrops: 2 },
            { crop: watermelon, numCrops: 5},
        ];
        const environmentFactors = {
            sun: "low",
            wind: "medium",
        }
        expect(getRevenueForCrop({ crops }, environmentFactors)).toBeCloseTo(119.024);
    });
});

describe("getProfitForCrop", () => {
    test("Get Profit For Crop", () => {
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        const environmentFactors = {
            sun: "medium",
            wind: "low",
        }
        expect(getProfitForCrop({ crops }, environmentFactors)).toBe(40);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: avocado, numCrops: 5},
            { crop: pumpkin, numCrops: 10},
            { crop: watermelon, numCrops: 3}
        ];
        const environmentFactors = {
            sun: "high",
            wind: "medium"
        }
        expect(getTotalProfit({ crops })).toBe(356);
    });
});