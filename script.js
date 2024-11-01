
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

    showStats() {
        console.log(`Player stats:
        智商: ${this.iq},
        情商: ${this.eq},
        财富: ${this.wealth},
        自理能力: ${this.ability},
        英文水平: ${this.englishProficiency},
        身体健康: ${this.physicalHealth},
        心理健康: ${this.mentalHealth},
        社交能力: ${this.socialSkills},
        幸运值: ${this.luck}`);
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

let player;

document.addEventListener("DOMContentLoaded", () => {
    player = new Player();
    player.showStats();

    showInitialStats();

    //showDestinationOptions();
});

function showInitialStats() {
    document.getElementById("current-year").innerText = "准备留学！";
    document.getElementById("current-month").innerText = "您的初始状态";
    const chart = document.getElementById("playerInitialStatsChart").getContext("2d");
    generateStatsChart(chart);

    const ctx = document.getElementById("playerStatsChart").getContext("2d");
    generateStatsChart(ctx);

}

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

    new Chart(ctx, config);
}

function showDestinationOptions() {
    document.getElementById("current-year").innerText = "准备留学！";
    document.getElementById("current-month").innerText = "请选择您的留学目的地：";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    const australiaButton = document.createElement("button");
    australiaButton.innerText = "澳大利亚";
    australiaButton.onclick = () => selectDestination("澳大利亚");

    const germanyButton = document.createElement("button");
    germanyButton.innerText = "德国";
    germanyButton.onclick = () => selectDestination("德国");

    // Append buttons to optionsDiv
    optionsDiv.appendChild(australiaButton);
    optionsDiv.appendChild(germanyButton);
}

function selectDestination(destination) {
    document.getElementById("current-year").innerText = "";
    document.getElementById("month").innerText = "";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = `<p>您选择的目的地是：${destination}</p>`;
}
