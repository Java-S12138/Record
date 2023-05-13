import "./css/animation.css"
import MatchListEle from "./components/MatchList";
import {useEffect, useRef, useState} from "react";
import MatchDetail from "./components/MatchDetail";
import {MatchList} from "../../interface/MatchInfo";
import {queryMatchList} from "../../utils/getMatchInfo";
import {Grid, GridItem} from '@chakra-ui/react';
import {ParticipantsInfo, MatchHistoryTypes} from "../../interface/MatchDetail";
import {queryGameDetail} from "../../utils/getMatchDetail";
import {invoke} from "@tauri-apps/api";



export default function ({puuid, begIndex, endIndex, openSumDetailDrawer, matchMode}: MatchHistoryTypes) {
  const [matchListProps, setMatchListProps] = useState<MatchList[]>([])
  const [participantsInfo, setParticipantsInfo] = useState({headerInfo: ['init']} as ParticipantsInfo)
  const [currentGameId, setCurrentGameId] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)
  const specialMatch = useRef({currentMode:'0',matchList:[] as MatchList[]} )

  useEffect(() => {
    const fetchMatchList = async () => {
      const matchList = await queryMatchList(puuid, begIndex, endIndex)
      handleMatchList(matchList)
    }

    const fetchSpecialMatchList = async () => {
      if (specialMatch.current.currentMode !== matchMode){
        specialMatch.current.currentMode = matchMode
        specialMatch.current.matchList = await invoke('get_special_match',{puuid:puuid,queueId:Number(matchMode)})
      }
      const matchList = specialMatch.current.matchList.slice(Number(begIndex),Number(endIndex))
      handleMatchList(matchList)
    }

    if (matchMode !== '0'){
      fetchSpecialMatchList()
    }else {
      specialMatch.current = {currentMode:'0',matchList:[] as MatchList[]}
      fetchMatchList()
    }

  }, [puuid, begIndex, matchMode])


  const changeCurrentGameId = async (gameId: string, matchIndex: number) => {
    if (gameId === currentGameId) {
      return
    }
    const gameDetail = await queryGameDetail(gameId)
    const matchElement = document.getElementById('matchDetail')

    if (matchElement !== null) {
      matchElement.children[0].classList.add('slide-out-left')
    }

    setTimeout(() => {
      setCurrentGameId(gameId)
      setMatchIndex(matchIndex)
      if (gameDetail !== null) {
        setParticipantsInfo(gameDetail)
      } else {
        setParticipantsInfo({} as ParticipantsInfo)
      }
    }, 300)
  }

  const handleMatchList = (matchList:MatchList[]) => {
    setMatchIndex(0)
    setMatchListProps(matchList)

    if (matchList.length > 0) {
      const gameId = matchList[0].gameId
      setCurrentGameId(gameId)
      queryGameDetail(gameId).then((detail) => {
        if (detail !== null) {
          setParticipantsInfo(detail)
        }
      })
    } else {
      setCurrentGameId('error')
    }
  }

  if (currentGameId === 'error') {
    return (
      <div className='divContentCenter'>
        可尝试按下, Ctrl+R 刷新页面<br/>
        无数据响应, 或许与英雄联盟服务器有关
      </div>
    )
  } else if (currentGameId === '') {
    return (<></>)
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
          <MatchDetail key={currentGameId} participantsInfo={participantsInfo} openDrawer={openSumDetailDrawer}/>
        </GridItem>
      </Grid>
    </div>
  )
}
