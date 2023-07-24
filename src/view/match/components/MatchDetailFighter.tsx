import {Image, Table, TableContainer, Tag, Tbody, Tr} from "@chakra-ui/react";

export default function ({participantsInfo}: { participantsInfo: any }) {
  if (participantsInfo?.title.length === 0) {
    return (
      <div className='divContentCenter'>
        获取当前战绩数据异常, 404 Not Found<br/>请在左侧切换其它战绩, 尝试再次获取数据...
      </div>
    )
  }
  const title = participantsInfo.title

  const itemDiv = participantsInfo.groupedPlayers.map((summoner:any,index:number) => {
   return (
     <div key={index} style={{height:'50px', flex: 1 }}>
       <div className='summonerItem'>
         {/*头像*/}
         <div className={(summoner.isCurSum?'slideSum':'') +' champAvatar'}>
           <Image className='rounded'
                  boxSize='50px' src={summoner.champImgUrl}/>
           <div className={'champAvatarColorBlue champLevel'}>
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
             {/*召唤师昵称*/}
             <div className={(summoner.isCurSum?'currentSumColor':'') +' summonerFighterName'}>{summoner.name}</div>
             {/*kda*/}
             <div className="kdaDiv">{summoner.kills}-{summoner.deaths}-{summoner.assists}</div>
           </div>
         </div>
       </div>
       <div className='flex justify-between' style={{width:'270px',marginTop:'12px'}}>
         <Tag
           size={'sm'}
           variant={'NSuccess'}
           style={{height:'22px',width:'82px', justifyContent:'center',fontSize:'12px',padding:'0px'}}>
           {'输出：' + summoner.totalDamageDealtToChampions}
         </Tag>
         <Tag
           size={'sm'}
           variant={'NError'}
           style={{height:'22px',width:'82px', justifyContent:'center',fontSize:'12px',padding:'0px'}}>
           {'承伤：' + summoner.totalDamageTaken}
         </Tag>
         <Tag
           size={'sm'}
           variant={'NWarning'}
           style={{height:'22px',width:'82px', justifyContent:'center',fontSize:'12px',padding:'0px'}}>
           {'金币：' + summoner.goldEarned}
         </Tag>
       </div>
     </div>
   )
  })

  return (
    <div className='flex flex-col h-full gap-y-10 slide-in-right'>
      <div>
        <TableContainer>
          <Table variant='simple' size='sm' style={{marginTop:'-4px'}}>
            <Tbody className='detailHeader'>
              <Tr className='detaildTr'>
                <td>
                  <div>对局日期</div>
                  <div>{title[0]}</div>
                </td>
                <td>
                  <div>对局类型</div>
                  <div>{title[2]}</div>
                </td>
                <td>
                  <div>开始时间</div>
                  <div>{title[1]}</div>
                </td>
                <td>
                  <div>对局时长</div>
                  <div>{title[3]}分钟</div>
                </td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div className='matchFighterContain'>
        {itemDiv}
      </div>
    </div>
  )
}
