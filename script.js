document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").innerText = "准备留学！";
    document.getElementById("current-month").innerText = "请选择您的留学目的地：";

    showDestinationOptions();
});

function showDestinationOptions() {
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
