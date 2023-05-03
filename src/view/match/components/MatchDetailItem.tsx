import "../css/matchContain.css";
import {SumIdContext} from "../index";
import {Image} from "@chakra-ui/react";
import {MatchItem,SummonerDetailInfo,MaxValueList,SumDetail} from "../../../interface/MatchDetail";
import {useContext} from "react";
import {querySumRank} from "../../../utils/getSumInfo";

export default function ({isLeft,detailInfo,showTypeKey,showTypeIndex,querySumDetail}:MatchItem) {
  const CurrentSumId = useContext(SumIdContext)
  const {otherData,percentList} = queryOtherMax(detailInfo)

  const queryDetail = (index:number) => {
    const personalGameDetails = detailInfo[index]

    const listItemData = [
      ['输出伤害',personalGameDetails.totalDamageDealtToChampions],
      ['物理伤害',personalGameDetails.physicalDamageDealtToChampions],
      ['魔法伤害',personalGameDetails.magicDamageDealtToChampions],
      ['真实伤害',personalGameDetails.trueDamageDealtToChampions],
      ['承受伤害',personalGameDetails.totalDamageTaken],
      ['击杀野怪',personalGameDetails.neutralMinionsKilled],
      ['击杀小兵',personalGameDetails.totalMinionsKilled],
      ['获得金钱',personalGameDetails.goldEarned],
      ['视野得分',personalGameDetails.visionScore],
      ['放置守卫',personalGameDetails.wardsPlaced],
    ]
    const kda = personalGameDetails.kills+'-'+personalGameDetails.deaths +'-'+personalGameDetails.assists
    querySumRank(String(personalGameDetails.accountId)).then((rankData) => {
      const personalDetails:SumDetail =  {
        name:personalGameDetails.name,champImgUrl:personalGameDetails.champImgUrl,
        champLevel:personalGameDetails.champLevel,kda:kda,spell1Id:personalGameDetails.spell1Id,
        spell2Id:personalGameDetails.spell2Id,runesList:personalGameDetails.runesList,
        listItemData:listItemData,
        rankData:rankData,
        summonerId:personalGameDetails.accountId,
      }
      querySumDetail(personalDetails)
    })
  }

  const itemDiv = detailInfo.map((summoner,index) => {
    return (
      <div key={index} onClick={() => {queryDetail(index)}}>
        <div className='summonerItem'>
          {/*头像*/}
          <div className={(CurrentSumId===summoner.accountId?'slideSum':'') +' champAvatar'}>
            <Image className='rounded'
                   boxSize='50px' src={summoner.champImgUrl}/>
            <div className={(isLeft?'champAvatarColorRed':'champAvatarColorBlue')+' champLevel'}>
              {summoner.champLevel}
            </div>
          </div>

          <div className='grow flex flex-col justify-between'>
            {/*装备*/}
            <div className='flex justify-between pr-0.5'>
              <img className="itemClass"  src={summoner.item0}/>
              <img className="itemClass"  src={summoner.item1}/>
              <img className="itemClass"  src={summoner.item2}/>
              <img className="itemClass"  src={summoner.item3}/>
              <img className="itemClass"  src={summoner.item4}/>
              <img className="itemClass"  src={summoner.item5}/>
              <img className="itemClass"  src={summoner.item6}/>
            </div>
            {/*召唤师技能等*/}
            <div className='skillDiv relative'>
              <img className="itemClassSecond" src={summoner.spell1Id}/>
              <img className="itemClassSecond" src={summoner.spell2Id}/>
              {/*召唤师昵称*/}
              <div className={(CurrentSumId===summoner.accountId?'currentSumColor':'') +' summonerName'}>{summoner.name}</div>
              {/*kda*/}
              <div className="kdaDiv">{summoner.kills}-{summoner.deaths}-{summoner.assists}</div>
            </div>
          </div>
        </div>
        <div className='progressDivP'>
          <p className='progressValue' >
            {otherData[index][showTypeKey]}
          </p>
          <div style={{width:'205px'}}>
            <p key={showTypeIndex}  style={{width:percentList[index][showTypeKey]}}
               className={(isLeft?'champAvatarColorRed':'champAvatarColorBlue')+' progressP scale-in-hor-left'}/>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='matchItemMain'>
      {itemDiv}
    </div>
  )
}



// 根据最高数据算出百分比
const computePercent = (max:any, cur:any) => {
  if (max == 0 || cur == 0) {
    return '0%'
  }
  return Math.round(cur / max * 10000) / 100 + "%"
}

// 求出每项额外数据中,每个队伍中数据最高的
const queryOtherMax = (sumDetailInfo:SummonerDetailInfo[]) => {
  const otherData:any[] = getOtherData(sumDetailInfo)

  // 求出最大数据
  let maxList: {[key: string]: number} = {}
  for (let obj of otherData) {
    for (let key in obj) {
      // @ts-ignore
      if (maxList[key] === undefined || obj[key] > maxList[key]) {
        // @ts-ignore
        maxList[key] = obj[key]
      }
    }
  }
  // 求出百分比值
  const percentList:any[] = []
  for (const otherDatum of otherData) {
      const tempJson = {
        tddtc: computePercent(maxList.tddtc, otherDatum.tddtc),
        tdt: computePercent(maxList.tdt, otherDatum.tdt),
        ge: computePercent(maxList.ge, otherDatum.ge),
        vs: computePercent(maxList.vs, otherDatum.vs),
        tmk: computePercent(maxList.tmk, otherDatum.tmk)
      }
    percentList.push(tempJson)
  }
  return {
    otherData,percentList
  }
}

// 获取伤害总和,承伤,金钱,视野得分,补刀数
const getOtherData = (sumDetailInfo:SummonerDetailInfo[]):MaxValueList[] => {
  const otherList = []
  for (const rowElement of sumDetailInfo) {
    const tempJson = {
      tddtc: rowElement.totalDamageDealtToChampions,
      tdt: rowElement.totalDamageTaken, ge: rowElement.goldEarned,
      vs: rowElement.visionScore, tmk: rowElement.totalMinionsKilled
    }
    otherList.push(tempJson)
  }
  return otherList
}
