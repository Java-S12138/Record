import RHeader from "./RHeader";
import {useState, useEffect} from "react";
import RSummonerInfo from "./RSummonerInfo";
import RExcelChamp from "./RExcelChamp";
import {Grid, GridItem} from '@chakra-ui/react'
import {SumInfoRes} from "../../interface/SummonerInfo";
import {querySummonerInfo} from "../../utils/getSumInfo";

export default function () {
  const [sumInfoProps, setSumInfoProps] = useState<SumInfoRes>({} as SumInfoRes)
  useEffect(() => {
    const fetchSumInfo = async () => {
      const sumInfo: SumInfoRes = await querySummonerInfo()
      setSumInfoProps(sumInfo)
    }
    fetchSumInfo()
  },[])

  if (sumInfoProps.sumInfo === undefined ) {
    return (<h1>Hello World</h1>)
  }

  return (
    <div className="main p-3">
      <Grid
        templateAreas={`"header header"
                  "main nav "
                  "footer nav "`}
        gridTemplateRows={'40px 1fr 316px'}
        gridTemplateColumns={'250px 1fr'}
        h='626px'
        gap='12px'
      >
        <GridItem area={'header'}>
          <RHeader/>
        </GridItem>
        <GridItem area={'main'}>
          <RSummonerInfo sumInfo={sumInfoProps?.sumInfo}
                         rankPoint={sumInfoProps?.rankPoint}/>
        </GridItem>
        <GridItem area={'footer'}>
          <RExcelChamp/>
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'nav'}>
          Nav
        </GridItem>
      </Grid>
    </div>


  )
}
