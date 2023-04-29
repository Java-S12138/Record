import MatchDetailItem from "./MatchDetailItem";
import MatchDetailHeader from "./MatchDetailHeader";
import {queryGameDetail} from "../../../utils/getMatchDetail";
import {useEffect, useState} from "react";
import {ParticipantsInfo} from "../../../interface/MatchDetail";

export default function ({gameId}:{gameId:string}) {
  const [participantsInfo,setParticipantsInfo] = useState({} as ParticipantsInfo)



  useEffect(() => {
    const fetchMatchDetail = async () => {
      const gameDetail = await queryGameDetail(gameId)
      console.log(gameDetail)
      if (gameDetail !== null){
        setParticipantsInfo(gameDetail)
      }
    }
    fetchMatchDetail()

    return () => {
      // componentWillUnmount 的逻辑
      console.log('这里可以写一些清理代码');
      // 这里可以写一些清理代码
    };
  },[gameId])

  if (participantsInfo?.headerInfo === undefined){
    return (
      <div>

      </div>
    )
  }

  return (
    <div className='flex flex-col h-full gap-y-10'>
      <MatchDetailHeader title={participantsInfo.headerInfo} />
      <div className='grow'>
        <div className='matchContain'>
          <MatchDetailItem isLeft={true} detailInfo={participantsInfo.teamOne}/>
          <MatchDetailItem isLeft={false} detailInfo={participantsInfo.teamTwo}/>
        </div>
      </div>
    </div>
  )
}
