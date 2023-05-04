import "./css/animation.css"
import MatchListEle from "./components/MatchList";
import {useEffect, useRef, useState} from "react";
import MatchDetail from "./components/MatchDetail";
import {MatchList} from "../../interface/MatchInfo";
import {SumDetail} from "../../interface/MatchDetail";
import MatchSumDetail from "./components/MatchSumDetail";
import {queryMatchList} from "../../utils/getMatchInfo";
import {Drawer, DrawerBody, DrawerContent, DrawerOverlay, Grid, GridItem, useDisclosure} from '@chakra-ui/react';

export default function ({puuid}: { puuid: string }) {
  const [matchListProps, setMatchListProps] = useState<MatchList[]>([])
  const [currentGameId, setCurrentGameId] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)
  const [sumDetail,setSumDetail] = useState({} as SumDetail)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  useEffect(() => {
    const fetchMatchList = async () => {
      const matchList = await queryMatchList(puuid, '0', '9')
      if (matchList.length > 0) {
        setMatchIndex(0)
        setMatchListProps(matchList)
        setCurrentGameId(matchList[0].gameId)
      }
    }
    fetchMatchList()
  }, [puuid])

  const changeCurrentGameId = (gameId: string, matchIndex: number) => {
    if (gameId === currentGameId) {
      return
    }
    const matchElement = document.getElementById('matchDetail')
    if (matchElement !== null) {
      matchElement.children[0].classList.add('slide-out-left')
    }
    setTimeout(() => {
      setCurrentGameId(gameId)
      setMatchIndex(matchIndex)
    }, 300)
  }

  const openSumDetailDrawer = (sumDetail:SumDetail) => {
    setSumDetail(sumDetail)
    onOpen()
  }

  if (currentGameId === '') {
    return (
      <div>
        NULL
      </div>
    )
  }

  return (
    <div className='p-3 bg-white h-full w-full boxShadow'>
      <Grid
        h='100%'
        templateColumns='repeat(5, 1fr)'
        gap="66px"
      >
        <GridItem style={{width: '185px'}} colSpan={1}>
          <MatchListEle matchList={matchListProps} matchIndex={matchIndex} setGameId={changeCurrentGameId}/>
        </GridItem>

        <GridItem colSpan={4} id='matchDetail'>
          <MatchDetail key={currentGameId} gameId={currentGameId} openDrawer={openSumDetailDrawer}/>
        </GridItem>
      </Grid>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        autoFocus={false}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent style={{width: '265px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
          <DrawerBody style={{padding: '12px'}}>
            <MatchSumDetail sumDetail={sumDetail} closeDrawer={onClose}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </div>
  )
}
