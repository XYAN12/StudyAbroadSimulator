export const steps = {
    start: {
        currentYear: "准备留学!",
        currentMonth: "",
        options: [
            { text: "开始", nextStep:"showInitialStatus" },
        ]
    },

    showInitialStatus: {
        currentYear: "准备留学!",
        currentMonth: "您的初始状态",
        options: [
            { text: "选择留学目的地", nextStep:"selectDestination" },
            { text: "重开", nextStep:"start" },
        ]
    },

    selectDestination:{
        currentYear: "准备留学!",
        currentMonth: "选择留学目的地",
        options: [
            { text: "澳大利亚", nextStep:"selectWhenStart" },
        ]
    },

    selectWhenStart:{
        currentYear: "准备留学!",
        currentMonth: "选择留学年龄",
        options: [
            { text: "高中开始", nextStep:"start" },
            { text: "本科开始", nextStep:"start" },
            { text: "硕士开始", nextStep:"start" },
        ]
    },
};
