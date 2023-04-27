import {MatchList} from "../../../interface/MatchInfo";
import {Image, Table, TableContainer, Tag,Tr,Divider, Tbody} from "@chakra-ui/react";

export default function ({matchList}:{matchList:MatchList[]}) {

  const matchTr = matchList.map((match,index) => {
    let stylyPadding
    if (index === 0) {
      stylyPadding = {padding:'0px 0px 11px 0px'}
    }else if (index === matchList.length - 1) {
      stylyPadding = {padding:'8px 0px 0px 0px'}
    }else {
      stylyPadding = {padding:'10px 0px 11px 0px'}
    }
    return (
      <Tr key={index}>
        <td>
          <div style={stylyPadding} className="flex justify-between">
          <Image className='rounded-sm'
                 boxSize='40px' src={match.champImgUrl}/>
          <div className='flex flex-col justify-between'>
            <div className='flex justify-between' style={{width:'133px'}}>
              <Tag
                size={'sm'}
                variant={match.isWin?'NInfo':'NError'}
                style={{height:'22px',width:'68px',
                  justifyContent:'center',fontSize:'12px'}}>
                {match.kills}-{match.deaths}-{match.assists}
              </Tag>
              <Tag
                size={'sm'}
                style={{height:'22px',width:'54px',color:'#A1A1AA',
                  justifyContent:'center',fontSize:'12px'}}
              >
                {match.matchTime}
              </Tag>
            </div>
            <div className='relative'>
              <div className='flex justify-between' style={{width:'133px'}}>
                <p className='absolute text-zinc-400 text-xs' style={{top:'-14px'}}>{match.gameModel}</p>
                <p className='absolute text-zinc-400 text-xs' style={{top:'-14px',right:'0px'}}>{match.isWin?'胜利':'失败'}</p>
              </div>
            </div>
          </div>
        </div>
        <Divider style={index === matchList.length -1 ? {display:'none'} : {}}/>
        </td>
      </Tr>
    )
  })

  return (
    <div>
      <TableContainer className="">
        <Table variant='unstyled' size='sm'>
          <Tbody>
            {matchTr}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
