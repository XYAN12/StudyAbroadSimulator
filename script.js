import { steps } from './steps.js';
import * as constants from './constants.js';

let initialStatsChart;
let playerStatsChart;
let player;

document.addEventListener("DOMContentLoaded", () => {
    showStep("start");
});

/**
 * player class
 */
class Player {
    constructor() {
        this.iq = getNormallyDistributedValue();
        this.eq = getNormallyDistributedValue();
        this.wealth = getNormallyDistributedValue();
        this.ability = getNormallyDistributedValue();
        this.englishProficiency = getNormallyDistributedValue();
        this.physicalHealth = getNormallyDistributedValue();
        this.mentalHealth = getNormallyDistributedValue();
        this.socialSkills = getNormallyDistributedValue();
        this.luck = getNormallyDistributedValue();

        this.yearsOfStudy = 1;
        this.currentYearLevel = constants.yearLevel.PREPARATION;
        this.yearlySchoolFee = constants.schoolYearlyFee.HIGH_SCHOOL_FEE;
        this.rentFee = constants.rentMonthlyFee.HOMESTAY;
        this.assignmentsDue = 0;
        this.assignmentsOverdue = 0;

        this.yearlyPocketMoney  = constants.generateYearlyPocketMoney(this.wealth);
        this.money = this.yearlyPocketMoney;
    }
}

/**
 * generate value from 1-100 based on normal distribution
 * @param mean
 * @param stdDev
 * @returns {number}
 */
function getNormallyDistributedValue(mean = 50, stdDev = 15) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    let value = Math.round(mean + z * stdDev);

    // Ensure value is between 0 and 100
    return Math.max(0, Math.min(100, value));
}


/**
 * display larger stats radar diagram at the start
 */
function showInitialStats() {
    document.getElementById("current-year").innerText = "准备留学！";
    document.getElementById("current-month").innerText = "您的初始状态";
    const chart = document.getElementById("playerInitialStatsChart").getContext("2d");
    initialStatsChart = generateStatsChart(chart);
    if (initialStatsChart) {
        const chartContainer = document.querySelector(".chart-container");
        chartContainer.style.height = "400px";
    }

    const ctx = document.getElementById("playerStatsChart").getContext("2d");
    playerStatsChart = generateStatsChart(ctx);

}

/**
 * generate radar diagram to display player's stats
 * @param ctx
 * @returns {Chart}
 */
function generateStatsChart(ctx){
    const data = {
        labels: ['智商', '情商', '财富', '自理能力', '英文水平', '身体健康', '心理健康', '社交能力', '幸运值'],
        datasets: [{
            label: '玩家统计',
            data: [
                player.iq,
                player.eq,
                player.wealth,
                player.ability,
                player.englishProficiency,
                player.physicalHealth,
                player.mentalHealth,
                player.socialSkills,
                player.luck
            ],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }]
    };


    const config = {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    pointLabels: {
                        display: true
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 5,
                        suggestedMax: 100,
                    }
                }
            }
        }
    };

    return new Chart(ctx, config);
}

/**
 * destroy the radar digram
 */
function destroyInitialChart() {
    if (initialStatsChart) {
        initialStatsChart.destroy();
        initialStatsChart = null;
        const chartContainer = document.querySelector(".chart-container");
        chartContainer.style.height = "0";
    }
}


function showStep(stepKey) {


    const step = steps[stepKey];
    if(step.currentYear) {
        document.getElementById("current-year").innerText = step.currentYear;
    }else{
        document.getElementById("current-year").innerText = "留学第" + player.yearsOfStudy + "年/" + player.currentYearLevel;
    }
    document.getElementById("current-month").innerText = step.currentMonth;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = '';

    if (stepKey === "start"){
        document.getElementById("leftMoney").innerText = "";
        destroyInitialChart()
        //destroy chart at the bottom as well
        if (playerStatsChart) {
            playerStatsChart.destroy();
            playerStatsChart = null;
        }
        player = new Player();
    }
    else if (stepKey === "showInitialStatus"){
        showInitialStats()
        document.getElementById("leftMoney").innerText = "$" + player.money.toString();
    }
    else if (stepKey === "selectDestination"){
        destroyInitialChart()
    }else if (stepKey === "selectWhenStart") {
        step.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.onclick = () => {
                switch (option.text) {
                    case "高中开始":
                        player.currentYearLevel = constants.yearLevel.YEAR_10;
                        player.yearlySchoolFee = constants.schoolYearlyFee.HIGH_SCHOOL_FEE;
                        break;
                    case "本科开始":
                        player.currentYearLevel = constants.yearLevel.BACHELOR_1;
                        player.yearlySchoolFee = constants.schoolYearlyFee.BACHELOR_FEE;
                        break;
                    case "硕士开始":
                        player.currentYearLevel = constants.yearLevel.MASTER_1;
                        player.yearlySchoolFee = constants.schoolYearlyFee.MASTER_FEE;
                        break;
                }
                showStep(option.nextStep);
            };
            optionsDiv.appendChild(button);
        });

        return;

    } else if (stepKey === "selectRentType") {
        let availableOptions = step.options;
        if (
            player.currentYearLevel === constants.yearLevel.YEAR_10 ||
            player.currentYearLevel === constants.yearLevel.YEAR_11 ||
            player.currentYearLevel === constants.yearLevel.YEAR_12
        ) {
            availableOptions = step.options.filter(option => option.text === "住寄宿家庭");
        }

        availableOptions.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.onclick = () => {
                switch (option.text) {
                    case "住寄宿家庭":
                        player.rentFee = constants.rentMonthlyFee.HOMESTAY;
                        break;
                    case "与人合租":
                        player.rentFee = constants.rentMonthlyFee.APARTMENT;
                        break;
                    case "自己租房":
                        player.rentFee = constants.rentMonthlyFee.STUDIO;
                        break;
                    case "直接买房":
                        player.rentFee = constants.rentMonthlyFee.BUY_ONE;
                        break;
                }
                const modal = document.getElementById("modal");
                document.getElementById("yearly-school-fee").innerText = "您今年的学费是$" + player.yearlySchoolFee;
                document.getElementById("monthly-rent-fee").innerText = "您今年每个月的房租是$" + player.rentFee;
                document.getElementById("pocket-money").innerText = "您每年的零花钱是$" + player.yearlyPocketMoney;
                player.money = player.money - player.yearlySchoolFee - player.rentFee*12;
                document.getElementById("money-left").innerText = "您现在剩余的资产为$" + player.money.toString();
                modal.style.display = "block";

                // 添加模态框关闭逻辑
                const closeModalButton = document.getElementById("modal-close");
                closeModalButton.onclick = () => {
                    modal.style.display = "none";



                    showStep(option.nextStep);
                };
            }
            optionsDiv.appendChild(button);
        });

        return;
    }


    step.options.forEach(option => {
        if (stepKey !== "start") {
            document.getElementById("leftMoney").innerText = "$" + player.money.toString();
        }

        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            showStep(option.nextStep);
        };
        optionsDiv.appendChild(button);
    });
}