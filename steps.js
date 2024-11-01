import * as constants from './constants.js';

export const steps = {
    start: {
        currentYear: constants.yearLevel.PREPARATION,
        currentMonth: "",
        options: [
            { text: "开始", nextStep:"showInitialStatus" },
        ]
    },

    showInitialStatus: {
        currentYear: constants.yearLevel.PREPARATION,
        currentMonth: "您的初始状态",
        options: [
            { text: "选择留学目的地", nextStep:"selectDestination" },
            { text: "重开", nextStep:"start" },
        ]
    },

    selectDestination:{
        currentYear: constants.yearLevel.PREPARATION,
        currentMonth: "选择留学目的地",
        options: [
            { text: "澳大利亚", nextStep:"selectWhenStart" },
        ]
    },

    selectWhenStart:{
        currentYear: constants.yearLevel.PREPARATION,
        currentMonth: "选择留学年龄\n（请根据财富谨慎选择）",
        options: [
            { text: "高中开始", nextStep:"selectRentType" },
            { text: "本科开始", nextStep:"selectRentType" },
            { text: "硕士开始", nextStep:"selectRentType" },
        ]
    },

    selectRentType:{
        currentMonth: "你接下来一年的住房选择是......",
        options: [
            { text: "住寄宿家庭", nextStep:"selectEvent" },
            { text: "与人合租", nextStep:"selectEvent" },
            { text: "自己租房", nextStep:"selectEvent" },
            { text: "直接买房", nextStep:"selectEvent" },
        ]
    },

    selectEvent:{
        options: [
            { text: "1", nextStep:"" },
            { text: "2", nextStep:"" },
            { text: "3", nextStep:"" },
            { text: "4", nextStep:"" },
        ]
    }

};
