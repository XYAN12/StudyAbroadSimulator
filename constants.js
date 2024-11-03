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

export const yearLevelIndex = [
    yearLevel.PREPARATION,
    yearLevel.YEAR_10,
    yearLevel.YEAR_11,
    yearLevel.YEAR_12,
    yearLevel.BACHELOR_1,
    yearLevel.BACHELOR_2,
    yearLevel.BACHELOR_3,
    yearLevel.MASTER_1,
    yearLevel.MASTER_2
];

export function updateYearLevel(player) {
    const currentIndex = yearLevelIndex.indexOf(player.currentYearLevel);

    if (currentIndex < yearLevelIndex.length - 1) {
        player.currentYearLevel = yearLevelIndex[currentIndex + 1];

        if (player.currentYearLevel === yearLevel.YEAR_10 ||
            player.currentYearLevel === yearLevel.YEAR_11 ||
            player.currentYearLevel === yearLevel.YEAR_12) {
            player.yearlySchoolFee = schoolYearlyFee.HIGH_SCHOOL_FEE;
        } else if (player.currentYearLevel === yearLevel.BACHELOR_1 ||
            player.currentYearLevel === yearLevel.BACHELOR_2 ||
            player.currentYearLevel === yearLevel.BACHELOR_3) {
            player.yearlySchoolFee = schoolYearlyFee.BACHELOR_FEE;
        } else if (player.currentYearLevel === yearLevel.MASTER_1 ||
            player.currentYearLevel === yearLevel.MASTER_2) {
            player.yearlySchoolFee = schoolYearlyFee.MASTER_FEE;
        }
    }
}
