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
        currentMonth: "选择留学年龄",
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
            { text: "已经买房", nextStep: "selectEvent"},
        ]
    },

    selectEvent:{

    }

};

export const events = {
    buyLuxury: {
        name: "购买奢侈品",
        effects: {
            money: -15000,
            mentalHealth: 3
        }
    },
    goOnTrip: {
        name: "去旅行",
        effects: {
            money: -3000,
            mentalHealth: 10
        }
    },
    studyHard: {
        name: "努力学习",
        effects: {
            iq: 2,
            mentalHealth: -10
        }
    },
    partyNight: {
        name: "参加狂欢夜",
        effects: {
            money: -200,
            socialSkills: 5,
            mentalHealth: 8
        }
    },
    joinClub: {
        name: "加入俱乐部",
        effects: {
            socialSkills: 2,
            ability: 2
        }
    },
    buyCar:{
        name:"买车",
        effects:{
            money: -3000,
            mentalHealth: 5
        }
    },
    partTime:{
        name:"打工",
        effects:{
            money: 1000,
            mentalHealth: -20,
            health: -20
        }
    },

};