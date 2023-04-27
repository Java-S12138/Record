import { invoke } from '@tauri-apps/api';
import {LcuMatchList,MatchList,Game} from "../interface/MatchInfo";
import {queryGameType} from "./tool";
import {champDict} from "../assets/champList"

// 根据召唤师ID查询战绩
const getMatchList = async (puuid: string, begIndex: string, endIndex: string): Promise<LcuMatchList|null> => {
  try {
    const res:LcuMatchList = await invoke('get_match_list',{puuid:puuid,begIndex:begIndex,endIndex:endIndex})
    return res
  }catch (e){
    return null
  }
}

const timestampToDate = (timestamp: number) => {
  var date = new Date(timestamp)
  return (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + date.getDate()
}


// 获取简单的对局数据
const getSimpleMatch = (match: Game,gameModel:string):MatchList => {
  return {
    gameId: String(match.gameId),
    champImgUrl: `https://game.gtimg.cn/images/lol/act/img/champion/${champDict[match.participants[0].championId].alias}.png`,
    // 是否取得胜利
    isWin: match.participants[0].stats.win === true ? true : false,
    // 击杀数目
    kills: match.participants[0].stats.kills,
    // 死亡数目
    deaths: match.participants[0].stats.deaths,
    // 助攻数目
    assists: match.participants[0].stats.assists,
    // 游戏时间
    matchTime: timestampToDate(match.gameCreation),
    // 游戏模式
    gameModel:gameModel
  }
}

// 处理战绩数据
export const queryMatchList = async (puuid: string, begIndex: string, endIndex: string, mode?: string|undefined):Promise<Array<MatchList> | []>  => {
  const matchList = await getMatchList(puuid, begIndex, endIndex)

  if (matchList === null) {return []}

  if (matchList?.games?.games?.length === 0 || matchList?.games?.games === undefined ) {return []}

  const simpleMatchList = []
  const specialSimpleMatchList = []
  for (const matchListElement of matchList?.games?.games.reverse()) {
    // 游戏模式
    let gameModel = queryGameType(matchListElement.queueId)
    if (gameModel === mode) {
      specialSimpleMatchList.push(getSimpleMatch(matchListElement,gameModel))
    }else if (mode === undefined) {
      simpleMatchList.push(getSimpleMatch(matchListElement,gameModel))
    }
  }
  if (mode === undefined) {
    return simpleMatchList
  } else {
    return specialSimpleMatchList
  }
}
