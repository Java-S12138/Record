import {Image} from "@chakra-ui/react";
import "../css/matchContain.css"
import {MatchItem} from "../../../interface/MatchDetail";

export default function ({isLeft,detailInfo}:MatchItem) {

  const itemDiv = detailInfo.map((summoner,index) => {
    return (
      <div key={index}>
        <div className='summonerItem'>
          {/*头像*/}
          <div className="champAvatar">
            <Image className='rounded'
                   boxSize='50px' src={summoner.champImgUrl}/>
            <div className={(isLeft?'champAvatarColorRed':'champAvatarColorBlue')+' champLevel'}>{summoner.champLevel}</div>
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
              <div className='summonerName'>{summoner.name}</div>
              {/*kda*/}
              <div className="kdaDiv">{summoner.kills}-{summoner.deaths}-{summoner.assists}</div>
            </div>
          </div>
        </div>
        <p className={(isLeft?'champAvatarColorRed':'champAvatarColorBlue')+' progressP'}/>
      </div>
    )
  })

  return (
    <div className='matchItemMain'>
      {itemDiv}
    </div>
  )
}
