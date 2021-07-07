const { default: axios } = require("axios");
const dataModule = require('./data');
const VERSION = process.env.CLIENT_VERSION;
const API_TOKEN = process.env.API_TOKEN;

class ApiHandler {

    static getSpecificChar = async (char) => {
        return await axios.get(`https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/fr_FR/champion/${char}.json`);
    }

    static getAllChar = async () => {
        return await axios.get(`http://ddragon.leagueoflegends.com/cdn/${VERSION}/data/fr_FR/champion.json`);
    }

    static getCharImg = (char) => {
        return `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${char}.png`
    }

    static getSummoner = async (sum) => {
        return await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sum}`, {
            headers: {
                "X-Riot-Token": API_TOKEN
            }
        });
    }

    static getSummonerRankingImg = (rank) => {
        return dataModule.rankedIcon[rank];
    }

    static getSummonerCharMastery = async (sumId) => {
        return await axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${sumId}`, {
            headers: {
                "X-Riot-Token": API_TOKEN
            }
        })
    }

    static getSummonerRanking = async (sumId) => {
        return await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}`, {
            headers: {
                "X-Riot-Token": API_TOKEN
            }
        })
    }

    static getBestCharBySummoner = async (sumName) => {
        let sumInfo = (await ApiHandler.getSummoner(sumName)).data;
        let sumBestMastery = (await ApiHandler.getSummonerCharMastery(sumInfo.id)).data[0];
        let sumRanking = (await ApiHandler.getSummonerRanking(sumInfo.id)).data;
        sumRanking = sumRanking.length === 0 ? {} : sumRanking[0];
        let allChamp = (await ApiHandler.getAllChar()).data.data;

        let [bestChampStr] = Object.keys(allChamp).filter(key => {
            let champObj = allChamp[key];
            return champObj.key == sumBestMastery.championId
        });

        let bestChamp = allChamp[bestChampStr];

        return {
            data: {
                sumInfo: sumInfo,
                ranking: sumRanking,
                bestChamp: {
                    info: bestChamp,
                    mastery: sumBestMastery.championLevel,
                    points: sumBestMastery.championPoints,
                    chest: sumBestMastery.chestGranted
                },

            }
        }
    }

}

exports.ApiHandler = ApiHandler;