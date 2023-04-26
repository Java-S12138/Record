import { invoke } from '@tauri-apps/api';
import {lcuSummonerInfo,SumInfoRes} from "../interface/SummonerInfo";
import {englishToChinese,dealDivsion} from "./tool";

export const querySummonerInfo = async (sumId?:number):Promise<SumInfoRes> => {
  const summonerInfo: lcuSummonerInfo = await invoke('get_cur_sum')
  const [sumInfo,rankPoint] =
    await Promise.all([getSumInfo(summonerInfo),
    getRankPoint(summonerInfo.puuid)])

  return {sumInfo,rankPoint}
}

const getSumInfo = (summonerInfo:lcuSummonerInfo) => {
  const imgUrl = `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/${summonerInfo.profileIconId}.png`
  return {
    name: summonerInfo.displayName,
    imgUrl,
    lv: summonerInfo.summonerLevel,
    xpSL: summonerInfo.xpSinceLastLevel,
    xpNL: summonerInfo.xpUntilNextLevel,
    puuid: summonerInfo.puuid,
    currentId: summonerInfo.summonerId
  }
}

// 查询召唤师排位分数
const getRankPoint = async (puuid: string) => {
  const rankPoint:any = await invoke('get_cur_rank_point',{puuid:puuid})
  // 单双排位/ 灵活排位/ 云顶之亦
  let rankSolo = rankPoint.queues.find((i: any) => i.queueType === "RANKED_SOLO_5x5")
  let rankSr = rankPoint.queues.find((i: any) => i.queueType === "RANKED_FLEX_SR")
  let rankTft = rankPoint.queues.find((i: any) => i.queueType === "RANKED_TFT")

  let RANKED_SOLO = rankSolo.tier === "NONE" ? '未定级' : `${englishToChinese(rankSolo.tier)}${dealDivsion(rankSolo.division)} ${rankSolo.leaguePoints}`
  let RANKED_FLEX_SR = rankSr.tier === "NONE" ? '未定级' : `${englishToChinese(rankSr.tier)}${dealDivsion(rankSr.division)} ${rankSr.leaguePoints}`
  let RANKED_TFT = rankTft.tier === "NONE" ? '未定级' : `${englishToChinese(rankTft.tier)}${dealDivsion(rankTft.division)} ${rankTft.leaguePoints}`

  return [RANKED_SOLO, RANKED_FLEX_SR, RANKED_TFT]
}
