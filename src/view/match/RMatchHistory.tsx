import {Grid, GridItem} from '@chakra-ui/react';
import MatchListEle from "./components/MatchList";
import {MatchList} from "../../interface/MatchInfo";
import {useEffect, useState} from "react";
import {queryMatchList} from "../../utils/getMatchInfo";
import MatchDetail from "./components/MatchDetail";

export default function ({puuid}:{puuid:string}) {
  const [matchListProps, setMatchListProps] = useState<MatchList[]>([])

  useEffect(() => {
    const fetchMatchList = async () => {
      setMatchListProps(await queryMatchList(puuid,'0','9'))
    }
    fetchMatchList()
  },[])

  return (
    <div className='p-3 bg-white h-full w-full boxShadow'>
      <Grid
        h='100%'
        templateColumns='repeat(5, 1fr)'
        gap="30px"
      >
        <GridItem style={{width:'185px'}} colSpan={1}>
          <MatchListEle matchList={matchListProps} />
        </GridItem>

        <GridItem colSpan={4}>
          <MatchDetail/>
        </GridItem>
    </Grid>
    </div>
  )
}
