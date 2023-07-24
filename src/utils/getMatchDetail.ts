import { invoke } from '@tauri-apps/api';
import {champDict} from "../assets/champList";
import {
  GameDetailedInfo,
  SummonerDetailInfo,
  ParticipantsInfo,
  Participant,
  MaxMatchData,Stat,ShowDataTypes,ParticipantIdentity
} from "../interface/MatchDetail"
import {queryGameType,getspellImgUrl,getItemImgUrl} from "../utils/tool"

export class MatchDetails {
  private team100Kills = 0
  private team200Kills = 0
  private team100GoldEarned = 0
  private team200GoldEarned = 0
  private markeUsed = {kills: true,
    assists: true,
    turretKills: true,
    totalDamageDealtToChampions: true,
    totalMinionsKilled: true,
    goldEarned: true,
    totalDamageTaken: true,
    visionScore: true}

  public queryGameDetail = async (gameId:string,sumId:number) => {
    this.init()
    const response:GameDetailedInfo = await invoke('get_match_detail',{gameId:gameId})
    if (response.queueId === 1700){
      return {
        queueId : response.queueId,
        details :this.getFighterParticipantsDetails(response,response.participants, response.participantIdentities,gameId,sumId)
      }
    }
    return {
      queueId : response.queueId,
      details :this.getParticipantsDetails(response,response.participants, response.participantIdentities,gameId,sumId)
    }
  }

  private init() {
    [this.team100Kills,this.team200Kills,this.team100GoldEarned,this.team200GoldEarned] = [0,0,0,0]
    this.markeUsed = {kills: true,
      assists: true,
      turretKills: true,
      totalDamageDealtToChampions: true,
      totalMinionsKilled: true,
      goldEarned: true,
      totalDamageTaken: true,
      visionScore: true}
  }

  // 获取召唤师participants下面的详细数据
  private getParticipantsDetails = (res:GameDetailedInfo,participants:Participant[], participantIdentities: ParticipantIdentity[],gameId:string,sumId:number) => {
    if (participants?.length !== 10){
      return null
    }

    const titleList = this.getDetailsTitle(res.gameCreation,res.gameDuration,res.queueId)
    const maxMatchData = this.getMaxField(participants)
    const participantsInfo:ParticipantsInfo = {teamOne:[],teamTwo:[],headerInfo:[]}
    const nameList = this.getparticipantIdAndName(participantIdentities)

    for (let i = 0; i < 5; i++) {
      this.team100Kills += participants[i].stats.kills;this.team200Kills += participants[i + 5].stats.kills
      this.team100GoldEarned += participants[i].stats.goldEarned;this.team200GoldEarned += participants[i+5].stats.goldEarned

      participantsInfo.teamOne.push(this.analyticalData(participants[i],nameList[i],gameId,maxMatchData,sumId))
      participantsInfo.teamTwo.push(this.analyticalData(participants[i+5],nameList[i+5],gameId,maxMatchData,sumId))
    }
    participantsInfo.teamOne[this.queryMvpIndex(participantsInfo.teamOne).index].isMvp = true
    participantsInfo.teamTwo[this.queryMvpIndex(participantsInfo.teamTwo).index].isMvp = true

    titleList.push(String(this.team100Kills),String(this.team200Kills),String(this.goldToStr(this.team100GoldEarned)),String(this.goldToStr(this.team200GoldEarned)))
    participantsInfo.headerInfo = titleList
    return participantsInfo
  }
  // 解析对局数据
  private analyticalData  = (participant:Participant,nameList: {name: string, summonerId: number},gameId:string,maxMatchData:MaxMatchData,sumId:number):SummonerDetailInfo => {
    var iconList = this.getIconList(participant.stats,maxMatchData)
    if (participant.stats.firstBloodKill){
      iconList.push('firstBlood')
    }
    if (participant.stats.tripleKills>0){
      iconList.push('threeKills')
    }
    if (participant.stats.quadraKills>0){
      iconList.push('fourKills')
    }
    if (participant.stats.pentaKills>0){
      iconList.push('fiveKills')
    }
    if (participant.stats.largestKillingSpree>=8){
      iconList.push('god')
    }
    var showDataDict:ShowDataTypes = this.getShowDataPercent(maxMatchData,{totalDamageDealtToChampions:participant.stats.totalDamageDealtToChampions,
      totalDamageTaken:participant.stats.totalDamageTaken,
      goldEarned:participant.stats.goldEarned,
      visionScore:participant.stats.visionScore,
      totalMinionsKilled:participant.stats.totalMinionsKilled+participant.stats.neutralMinionsKilled
    })


    return{
      name: nameList.name,
      gameId:gameId,
      accountId:nameList.summonerId,
      isCurSum:nameList.summonerId===sumId?true:false,
      teamType: participant.teamId,
      champLevel:participant.stats.champLevel,
      champImgUrl: `https://game.gtimg.cn/images/lol/act/img/champion/${champDict[participant.championId].alias}.png`,
      spell1Id:getspellImgUrl(participant.spell1Id),
      spell2Id:getspellImgUrl(participant.spell2Id),
      item0:getItemImgUrl(participant.stats.item0),
      item1:getItemImgUrl(participant.stats.item1),
      item2:getItemImgUrl(participant.stats.item2),
      item3:getItemImgUrl(participant.stats.item3),
      item4:getItemImgUrl(participant.stats.item4),
      item5:getItemImgUrl(participant.stats.item5),
      item6:getItemImgUrl(participant.stats.item6),
      kills:participant.stats.kills,
      deaths:participant.stats.deaths,
      assists:participant.stats.assists,
      //物理伤害
      physicalDamageDealtToChampions:participant.stats.physicalDamageDealtToChampions,
      // 魔法伤害
      magicDamageDealtToChampions:participant.stats.magicDamageDealtToChampions,
      // 真实伤害
      trueDamageDealtToChampions:participant.stats.trueDamageDealtToChampions,
      // 伤害总和
      totalDamageDealtToChampions:participant.stats.totalDamageDealtToChampions,
      // 承受伤害
      totalDamageTaken:participant.stats.totalDamageTaken,
      // 击杀野怪
      neutralMinionsKilled:participant.stats.neutralMinionsKilled,
      // 击杀小兵
      totalMinionsKill:participant.stats.totalMinionsKilled,
      // 获得金钱
      goldEarned:participant.stats.goldEarned,
      // 花费金钱
      goldSpent:participant.stats.goldSpent,
      // 视野得分
      visionScore:participant.stats.visionScore,
      // 放置视野
      wardsPlaced:participant.stats.wardsPlaced,
      // 符文数据
      runesList:[participant.stats.perk0,participant.stats.perk1,participant.stats.perk2,
        participant.stats.perk3,participant.stats.perk4,participant.stats.perk5],
      totalMinionsKilled:participant.stats.totalMinionsKilled+participant.stats.neutralMinionsKilled,
      iconList:iconList,
      score: this.analyseSingleMatch(participant.stats),
      isWin:participant.stats.win,
      isMvp:false,
      showDataDict:showDataDict
    }
  }
  // 获取召唤师participantId 和 name
  private getparticipantIdAndName = (participantIdentities:ParticipantIdentity[]) => {
    let dataList = []
    for (const participantIdentity of participantIdentities) {
      dataList.push({
        name: participantIdentity.player.summonerName,
        summonerId:participantIdentity.player.summonerId})
    }
    return dataList
  }
  // 获取当前页面顶部详细数据
  private getDetailsTitle = (creation:number,duration:number,queueId:number) => {
    const createTime = (new Date(creation).toLocaleString()).split(' ')
    const dateStr = createTime[0].slice(5)
    const timeStr = createTime[1].slice(0, 5)
    const lane = queryGameType(queueId)
    const gameDuration = ((duration) / 60).toFixed(0)
    return [dateStr, timeStr, lane, gameDuration]
  }
  private goldToStr = (gold:number) => {
    return Number((gold / 1000).toFixed(1))
  }
  // 获取十名召唤师中的某些数据的最大数据
  private getMaxField = (participants:Participant[]) => {
    return participants.reduce((res:MaxMatchData,obj:Participant) => {
      if (obj.stats.kills >= res.kills){
        res.kills = obj.stats.kills
      }
      if (obj.stats.assists >= res.assists){
        res.assists = obj.stats.assists
      }
      if (obj.stats.turretKills >= res.turretKills){
        res.turretKills = obj.stats.turretKills
      }
      if (obj.stats.totalDamageDealtToChampions >= res.totalDamageDealtToChampions){
        res.totalDamageDealtToChampions = obj.stats.totalDamageDealtToChampions
      }
      if (obj.stats.totalMinionsKilled+obj.stats.neutralMinionsKilled >= res.totalMinionsKilled){
        res.totalMinionsKilled = obj.stats.totalMinionsKilled+obj.stats.neutralMinionsKilled
      }
      if (obj.stats.goldEarned >= res.goldEarned){
        res.goldEarned = obj.stats.goldEarned
      }
      if (obj.stats.totalDamageTaken >= res.totalDamageTaken){
        res.totalDamageTaken = obj.stats.totalDamageTaken
      }
      if (obj.stats.visionScore >= res.visionScore){
        res.visionScore = obj.stats.visionScore
      }
      return res
    },<MaxMatchData>{
      kills: 0,
      assists: 0,
      turretKills: 0,
      totalDamageDealtToChampions: 0,
      totalMinionsKilled: 0,
      goldEarned: 0,
      totalDamageTaken: 0,
      visionScore:0
    })
  }
  // 获取对于的最大数据图标
  private getIconList = (stats:Stat,maxMatchData:MaxMatchData) => {
    if (maxMatchData === null){
      return []
    }
    const iconList:string[] = []
    for (const key of Object.keys(maxMatchData)) {
      if (key==='totalMinionsKilled'){
        if (stats.totalMinionsKilled+stats.neutralMinionsKilled === maxMatchData.totalMinionsKilled){
          iconList.push(key)
        }
        continue
      }
      // @ts-ignore
      if (stats[key] === maxMatchData[key] && this.markeUsed[key]){
        iconList.push(key)
        // @ts-ignore
        this.markeUsed[key] = false
      }
    }
    return iconList
  }
  // 通过分析数据得出单场得分情况
  private analyseSingleMatch = (match: Stat):number => {
    let score = 10
    if (match['firstBloodKill']) {
      score += 5
    } // 一血 加5分
    if (match['firstBloodAssist']) {
      score += 2
    }// 一血助攻 加2分
    score += match['doubleKills'] * 1 // 一次双杀加1分
    score += match['tripleKills'] * 2 // 一次三杀加2分
    score += match['quadraKills'] * 3 // 一次四杀加3分
    score += match['pentaKills'] * 4 // 一次五杀加4分
    score += (match['kills']*3 - match['deaths']*2+match['assists'])
    return score
  }
  // 获取需要显示数据的百分比
  private getShowDataPercent = (maxDict:MaxMatchData,curDict:ShowDataTypes) => {
    const resDict:any = {}
    for (const key of Object.keys(curDict)) {
      // @ts-ignore
      resDict[key] = this.computePercent(maxDict[key],curDict[key])
    }
    return resDict
  }
  // 根据最高数据算出百分比
  private computePercent = (max:number, cur:number) => {
    if (max === 0 || cur === 0) {
      return '0%'
    }
    return Math.round(cur / max * 10000) / 100 + "%"
  }
  // 找出评分最大的对象的数组下表
  private queryMvpIndex = (array:SummonerDetailInfo[]) => {
    return array.reduce((max, obj, index) => {
      if (obj.score > max.value) {
        return {value: obj.score, index}
      } else {
        return max
      }
    }, {value: 0, index: 0})
  }
  // 获取斗魂竞技场战绩数据
  private getFighterParticipantsDetails = (res:GameDetailedInfo,participants:Participant[], participantIdentities: ParticipantIdentity[],gameId:string,sumId:number) => {
    try {
      const titleList = this.getDetailsTitle(res.gameCreation,res.gameDuration,res.queueId)
      const nameList = this.getparticipantIdAndName(participantIdentities)
      const result = []
      const maxMatchData = this.getMaxField(participants)
      for (let i = 0; i < nameList.length; i++) {
        result.push(this.analyticalData(participants[i],nameList[i],gameId,maxMatchData,sumId))
      }
      result.sort((a, b) => b.goldEarned - a.goldEarned)

      return {
        title:titleList,groupedPlayers:result
      }
    }catch (e) {
      return {title: [],groupedPlayers: []}
    }
  }
}
