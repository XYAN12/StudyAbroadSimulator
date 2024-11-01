import { steps } from './Steps.js';

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
    console.log(step);
    document.getElementById("current-year").innerText = step.currentYear;
    document.getElementById("current-month").innerText = step.currentMonth;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = '';

    if (stepKey === "start"){
        destroyInitialChart()
        //destroy chart at the bottom as well
        if (playerStatsChart) {
            playerStatsChart.destroy();
            playerStatsChart = null;
        }
        player = new Player();
        console.log(step.options);
    }
    else if (stepKey === "showInitialStatus"){
        showInitialStats()
    }
    else if (stepKey === "selectDestination"){
        destroyInitialChart()
    }


    step.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            showStep(option.nextStep);
        };
        optionsDiv.appendChild(button);
    });
}