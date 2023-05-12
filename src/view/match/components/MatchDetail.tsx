import MatchDetailItem from "./MatchDetailItem";
import MatchDetailHeader from "./MatchDetailHeader";
import {useRef, useState} from "react";
import {ParticipantsInfo} from "../../../interface/MatchDetail";

export default function ({participantsInfo,openDrawer}:{participantsInfo:ParticipantsInfo,openDrawer:Function}) {
  const arr = [['tddtc','输出伤害'],['tdt','承受伤害'],['ge','商店存款'],['vs','视野得分'],['tmk','击杀小兵']]
  const [showType,setShowType] = useState(['tddtc','输出伤害'])
  const showTypeIndex= useRef(0)

  const switchShowType = () => {
    const rotatedIndex = (showTypeIndex.current += 1) % arr.length
    setShowType(arr[rotatedIndex])
  }

  if (participantsInfo?.headerInfo?.length === 1){
    return (<div></div>)
  }

  if (participantsInfo?.headerInfo === undefined){
    return (
      <div className='divContentCenter'>
        获取当前战绩数据异常, 404 Not Found<br/>请在左侧切换其它战绩, 尝试再次获取数据...
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full gap-y-10 slide-in-right'>
      <MatchDetailHeader title={participantsInfo.headerInfo} showTypeValue={showType[1]} switchFun={switchShowType} />
      <div className='grow'>
        <div className='matchContain'>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={true} showTypeKey={showType[0]}
                           detailInfo={participantsInfo.teamOne} querySumDetail={openDrawer}/>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={false} showTypeKey={showType[0]}
                           detailInfo={participantsInfo.teamTwo} querySumDetail={openDrawer}/>
        </div>
      </div>
    </div>
  )
}

