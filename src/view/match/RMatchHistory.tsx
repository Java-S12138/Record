import "./css/animation.css"
import MatchListEle from "./components/MatchList";
import {useEffect, useState} from "react";
import MatchDetail from "./components/MatchDetail";
import {MatchList} from "../../interface/MatchInfo";
import {queryMatchList} from "../../utils/getMatchInfo";
import {Grid, GridItem} from '@chakra-ui/react';

export default function ({puuid,begIndex,endIndex,openSumDetailDrawer}: { puuid: string,begIndex:string,endIndex:string,openSumDetailDrawer:Function }) {
  const [matchListProps, setMatchListProps] = useState<MatchList[]>([])
  const [currentGameId, setCurrentGameId] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)

  useEffect(() => {
    const fetchMatchList = async () => {
      const matchList = await queryMatchList(puuid, begIndex, endIndex)
      setMatchIndex(0)
      setMatchListProps(matchList)
      matchList.length > 0 ? setCurrentGameId(matchList[0].gameId) : setCurrentGameId('')
    }
    fetchMatchList()
  }, [puuid,begIndex])


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
    </div>
  )
}
