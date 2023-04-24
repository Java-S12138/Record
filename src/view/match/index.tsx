import RHeader from "./RHeader";
import RSummonerInfo from "./RSummonerInfo";
import { Grid, GridItem } from '@chakra-ui/react'

export default function () {
  return (
    <div className="main p-3">
      <Grid
        templateAreas={`"header header"
                  "main nav "
                  "footer nav "`}
        gridTemplateRows={'40px 1fr 300px'}
        gridTemplateColumns={'250px 1fr'}
        h='626px'
        gap='12px'
      >
        <GridItem area={'header'}>
          <RHeader/>
        </GridItem>
        <GridItem area={'main'}>
          <RSummonerInfo/>
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'nav'}>
          Nav
        </GridItem>
      </Grid>
    </div>


  )
}
