import MatchSumDetail from "./MatchSumDetail";
import MatchDetailItem from "./MatchDetailItem";
import MatchDetailHeader from "./MatchDetailHeader";
import {useEffect, useRef, useState} from "react";
import {queryGameDetail} from "../../../utils/getMatchDetail";
import {ParticipantsInfo, SumDetail} from "../../../interface/MatchDetail";
import {Drawer, useDisclosure, DrawerBody, DrawerOverlay, DrawerContent} from '@chakra-ui/react'

export default function ({gameId}:{gameId:string}) {
  const [participantsInfo,setParticipantsInfo] = useState({} as ParticipantsInfo)
  const arr = [['tddtc','输出伤害'],['tdt','承受伤害'],['ge','商店存款'],['vs','视野得分'],['tmk','击杀小兵']]
  const [showType,setShowType] = useState(['tddtc','输出伤害'])
  const showTypeIndex= useRef(0)
  const [sumDetail,setSumDetail] = useState({} as SumDetail)
1w
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

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

  const openSumDetailDrawer = (sumDetail:SumDetail) => {
    setSumDetail(sumDetail)
    onOpen()
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
                           detailInfo={participantsInfo.teamOne} querySumDetail={openSumDetailDrawer}/>
          <MatchDetailItem showTypeIndex={showTypeIndex.current} isLeft={false} showTypeKey={showType[0]}
                           detailInfo={participantsInfo.teamTwo} querySumDetail={openSumDetailDrawer}/>
        </div>
      </div>
      {/*<Button ref={btnRef} colorScheme='teal' onClick={onOpen}>*/}
      {/*  Open*/}
      {/*</Button>*/}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        autoFocus={false}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent style={{width:'265px',borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}}>
          <DrawerBody style={{padding:'12px'}}>
           <MatchSumDetail sumDetail={sumDetail} closeDrawer={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

