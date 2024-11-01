export const yearLevel = {
    PREPARATION: "准备留学",
    YEAR_10: "高一",
    YEAR_11: "高二",
    YEAR_12: "高三",
    BACHELOR_1: "大一",
    BACHELOR_2: "大二",
    BACHELOR_3: "大三",
    MASTER_1: "研一",
    MASTER_2: "研二"
};

// school fee
export const schoolYearlyFee = {
    HIGH_SCHOOL_FEE: 25000,
    BACHELOR_FEE:40000,
    MASTER_FEE:40000,
}

// rent fee
export const rentMonthlyFee = {
    HOMESTAY:1500,
    STUDIO:2400,
    APARTMENT:1300,
    BUY_ONE:600000,
}

export function generateYearlyPocketMoney(wealth) {
    const minPocketMoney = 30000;
    const maxPocketMoney = 950000;

    const yearlyPocketMoney = minPocketMoney * Math.pow(maxPocketMoney / minPocketMoney, wealth / 100);

    return Math.round(yearlyPocketMoney);
}

