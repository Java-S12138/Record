import "./css/animation.css"
import {Grid, GridItem} from '@chakra-ui/react';
import MatchListEle from "./components/MatchList";
import {MatchList} from "../../interface/MatchInfo";
import {useEffect, useState} from "react";
import {queryMatchList} from "../../utils/getMatchInfo";
import MatchDetail from "./components/MatchDetail";

export default function ({puuid}:{puuid:string}) {
  const [matchListProps, setMatchListProps] = useState<MatchList[]>([])
  const [currentGameId,setCurrentGameId] = useState('')

  useEffect(() => {
    const fetchMatchList = async () => {
      const matchList = await queryMatchList(puuid,'0','9')
      if (matchList.length > 0) {
        setMatchListProps(matchList)
        setCurrentGameId(matchList[0].gameId)

      }
    }
    fetchMatchList()
  },[])

  const changeCurrentGameId = (gameId: string) => {
    if (gameId===currentGameId){
      return
    }
    const matchElement = document.getElementById('matchDetail')
    if (matchElement !== null){
      matchElement.children[0].classList.add('slide-out-left')
    }
    setTimeout(() => {
      setCurrentGameId(gameId)
    },300)
  }



  if (currentGameId===''){
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
        <GridItem  style={{width:'185px'}} colSpan={1}>
          <MatchListEle matchList={matchListProps} setGameId={changeCurrentGameId}/>
        </GridItem>

        <GridItem colSpan={4} id='matchDetail'>
          <MatchDetail key={currentGameId} gameId={currentGameId}/>
        </GridItem>
    </Grid>
    </div>
  )
}
