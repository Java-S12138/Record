import MatchDetailItem from "./MatchDetailItem";
import MatchDetailHeader from "./MatchDetailHeader";
import {useEffect, useRef, useState,useContext} from "react";
import {queryGameDetail} from "../../../utils/getMatchDetail";
import {ParticipantsInfo} from "../../../interface/MatchDetail";


export default function ({gameId}:{gameId:string}) {
  const [participantsInfo,setParticipantsInfo] = useState({} as ParticipantsInfo)
  const arr = [['tddtc','输出伤害'],['tdt','承受伤害'],['ge','商店存款'],['vs','视野得分'],['tmk','击杀小兵']]
  const [showType,setShowType] = useState(['tddtc','输出伤害'])
  const showTypeIndex= useRef(0)

  useEffect(() => {
    const fetchMatchDetail = async () => {
      const gameDetail = await queryGameDetail(gameId)
      if (gameDetail !== null){
        setParticipantsInfo(gameDetail)
      }
    }
    fetchMatchDetail()

  },[gameId])

  const switchShowType = () => {
    const rotatedIndex = (showTypeIndex.current += 1) % arr.length
    setShowType(arr[rotatedIndex])
  }

  if (participantsInfo?.headerInfo === undefined){
    return (
      <div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full gap-y-10 slide-in-right'>
      <MatchDetailHeader title={participantsInfo.headerInfo} showTypeValue={showType[1]} switchFun={switchShowType} />
      <div className='grow'>
        <div className='matchContain'>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={true} showTypeKey={showType[0]}
                           detailInfo={participantsInfo.teamOne}/>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={false} showTypeKey={showType[0]}
                           detailInfo={participantsInfo.teamTwo}/>
        </div>
      </div>
    </div>
  )
}

