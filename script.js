import { steps, events } from './steps.js';
import * as constants from './constants.js';
import {yearLevel} from "./constants.js";

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
function generateStatsChart(ctx) {
    const data = {
        labels: ['智商', '情商', '财富', '自理能力', '英文水平', '身体健康', '心理健康', '社交能力', '幸运值'],
        datasets: [{
            label: '玩家状态',
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
                        display: true,
                        callback: function(label, index) {
                            return `${label}: ${data.datasets[0].data[index]}`;
                        }
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
        }else if (player.rentFee === constants.rentMonthlyFee.BUY_ONE){
            availableOptions = step.options.filter(option => option.text === "已经买房");
        }else {
            availableOptions = step.options.filter(option => option.text !== "已经买房");
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
                    case "已经买房":
                        //player.rentFee = constants.rentMonthlyFee.BUY_ONE;
                        break;
                }
                const modal = document.getElementById("modal");
                document.getElementById("yearly-school-fee").innerText = "您今年的学费是$" + player.yearlySchoolFee;
                document.getElementById("monthly-rent-fee").innerText = "您今年每个月的房租是$" + player.rentFee;
                document.getElementById("pocket-money").innerText = "您的留学经费是$" + player.yearlyPocketMoney;
                player.money = player.money - player.yearlySchoolFee - calculateYearlyRentFee(player);
                document.getElementById("money-left").innerText = "您现在剩余的资产为$" + player.money.toString();
                modal.style.display = "block";

                const closeModalButton = document.getElementById("modal-close");
                closeModalButton.onclick = () => {
                    modal.style.display = "none";
                    showStep(option.nextStep);
                };
            }
            optionsDiv.appendChild(button);
        });

        return;
    }else if(stepKey === "selectHaveMealType") {
        updatePlayerStatus(player)
        let availableOptions = step.options;

        availableOptions.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option.text;

            if (option.text === "跟随寄宿家庭" && player.rentFee !== constants.rentMonthlyFee.HOMESTAY) {
                button.classList.add("disabled-button");
                button.onclick = () => showHintModal("需通过住寄宿家庭选择此项，可后续更改住宿选择。", "hint");
            } else if (option.text === "自己做饭吃" && player.ability <= 70) {
                button.classList.add("disabled-button");
                button.onclick = () => showHintModal("能力值大于 70 才可选择自己做饭，" +
                    "可后续通过学习做饭或其他事件来提高自理能力。", "hint");
            } else {
                button.onclick = () => {
                    switch (option.text) {
                        case "跟随寄宿家庭":
                            break;
                        case "自己做饭吃":
                            player.physicalHealth += 5;
                            player.mentalHealth += 5;
                            player.money -= 4000;
                            break;
                        case "平价的饭店":
                            player.physicalHealth -= 10;
                            player.money -= 10080;
                            break;
                        case "高端的饭店":
                            player.physicalHealth -= 5;
                            player.mentalHealth += 8;
                            player.money -= 20200;
                            break;
                        case "泡面与水饺":
                            player.physicalHealth -= 3;
                            player.money -= 6000;
                            break;
                        case "麦门信徒":
                            player.physicalHealth -= 10;
                            player.mentalHealth += 10;
                            player.money -= 10080;
                            break;
                    }

                    showStep(option.nextStep);
                };
            }

            optionsDiv.appendChild(button);
        });

        return;
    } else if(stepKey === "selectEvent"){
        updatePlayerStatus(player)
        showEvents(player);

        return
    }


    step.options.forEach(option => {
        if (stepKey !== "start") {
            updatePlayerStatus(player)
        }

        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            showStep(option.nextStep);
        };
        optionsDiv.appendChild(button);
    });
}


function showEvents(player) {
    let eventCount = 0;
    let currentMonth = 1;

    function updateMonthDisplay() {
        document.getElementById("current-month").innerText = `${currentMonth}月`;
    }

    updateMonthDisplay();

    function displayNextEvent() {
        const eventsDiv = document.getElementById("options");
        eventsDiv.innerHTML = '';

        const randomEvents = getRandomEvents(events, 6);
        randomEvents.forEach(event => {
            const button = document.createElement("button");
            button.innerText = event.name;
            button.onclick = () => {
                applyEventEffects(player, event);
                updatePlayerStatus(player);

                eventCount++;
                currentMonth++;
                updateMonthDisplay();

                if (eventCount >= 12) {
                    // determine graduate status
                    if (player.currentYearLevel === constants.yearLevel.MASTER_2) {
                        showHintModal("恭喜你研究生毕业了！", "end");
                    } else {
                        console.log("need to select rent type");
                        player.yearsOfStudy += 1;
                        constants.updateYearLevel(player);
                        showStep("selectRentType");
                    }
                } else {
                    displayNextEvent();
                }
            };
            eventsDiv.appendChild(button);
        });
    }

    displayNextEvent();
}


function getRandomEvents(events, num = 6) {
    const allEvents = Object.values(events);
    const selectedEvents = [];

    while (selectedEvents.length < num) {
        const randomIndex = Math.floor(Math.random() * allEvents.length);
        const event = allEvents[randomIndex];
        if (!selectedEvents.includes(event)) {
            selectedEvents.push(event);
        }
    }

    return selectedEvents;
}


function showHintModal(message, type) {
    const modal = document.getElementById("hint-modal");
    const moneyLeftText = document.getElementById("hint-description");

    moneyLeftText.innerText = message;
    modal.style.display = "block";

    const closeModalButton = document.getElementById("hint-modal-close");
    const title = document.getElementById("title");

    if(type === "hint"){
        title.innerHTML = "提示";
        closeModalButton.innerText = "继续";
    }else{
        title.innerHTML = "结局";
        closeModalButton.innerText = "重开";
    }
    closeModalButton.onclick = () => {
        modal.style.display = "none";

        if(type === "hint"){
            modal.style.display = "none";
        }else{
            showStep("start");
        }

    };
}

function applyEventEffects(player, event) {
    for (const [attribute, value] of Object.entries(event.effects)) {
        if (player.hasOwnProperty(attribute)) {
            player[attribute] += value;
            // max is 100
            if(attribute !== "money" && player[attribute] > 100){
                player[attribute] = 100;
            }
        }
    }
}

function updatePlayerStatus(player) {
    //update radar chart
    if (playerStatsChart) {
        playerStatsChart.destroy();
        playerStatsChart = null;
    }
    const ctx = document.getElementById("playerStatsChart").getContext("2d");
    playerStatsChart = generateStatsChart(ctx);

    //update monry left
    document.getElementById("leftMoney").innerText = "$" + player.money.toString();

    checkPlayerStats(player);

}

function calculateYearlyRentFee(player){
    let rent;
    if (player.rentFee === constants.rentMonthlyFee.BUY_ONE){
        if(player.yearsOfStudy === 1){
            rent = player.rentFee;
        }else{
            rent = 0;
        }
    }else{
        rent = 12 * player.rentFee;
    }
    return rent;
}

function checkPlayerStats(player) {
    if (player.money <= 0) {
        showHintModal("一分钱也没有了，已经没钱留学了。", "end");
    } else if (player.mentalHealth <= 5) {
        showHintModal("心理健康达到了极限，无法继续学习。", "end");
    } else if (player.physicalHealth <= 5) {
        showHintModal("身体状况不佳，无法继续留学生活。", "end");
    } else if (player.iq <= 10) {
        showHintModal("智商水平太低，课程难度过大，学习无法继续。", "end");
    } else if (player.eq <= 5) {
        showHintModal("情商过低，难以适应留学生活。", "end");
    } else if (player.ability <= 10) {
        showHintModal("自理能力不足，无法在海外独立生活。", "end");
    } else if (player.englishProficiency <= 10) {
        showHintModal("英语能力不足，无法继续留学。", "end");
    } else if (player.socialSkills <=5) {
        showHintModal("社交能力不足，难以在新的环境中生存。", "end");
    } else if (player.assignmentsOverdue >= 5){
        showHintModal("太多作业没交，被劝退了。", "end");
    }
}


