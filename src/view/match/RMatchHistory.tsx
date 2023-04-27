import {Grid, GridItem} from '@chakra-ui/react';
import MatchListEle from "./components/MatchList";
import {MatchList} from "../../interface/MatchInfo";

export default function ({matchList}:{matchList:MatchList[]}) {

  return (
    <div className='p-3 bg-white h-full w-full boxShadow'>
      <Grid
        h='100%'
        templateColumns='repeat(5, 1fr)'
        gap="30px"
      >
        <GridItem style={{width:'185px'}} colSpan={1}>
          <MatchListEle matchList={matchList} />
        </GridItem>

        <GridItem colSpan={4}>

        </GridItem>
    </Grid>
    </div>
  )
}
