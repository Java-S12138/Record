import RHeader from "./RHeader";
import RExcelChamp from "./RExcelChamp";
import {useState, useEffect,createContext} from "react";
import RSummonerInfo from "./RSummonerInfo";
import RMatchHistory from "./RMatchHistory";
import {Grid, GridItem} from '@chakra-ui/react'
import {SumInfoRes} from "../../interface/SummonerInfo";
import {querySummonerInfo} from "../../utils/getSumInfo";

export const SumIdContext = createContext(213)

export const Match = () =>  {
  const [sumId,setSumId] = useState(0)
  const [sumInfoProps, setSumInfoProps] = useState<SumInfoRes>({} as SumInfoRes)


  useEffect(() => {
    const fetchSumInfo = async () => {
      const sumInfo: SumInfoRes = await querySummonerInfo()
      setSumInfoProps(sumInfo)
    }
    if (sumInfoProps.sumInfo === undefined){
      fetchSumInfo()
    }

  },[sumId])

  const test = () => {
    setSumInfoProps({} as SumInfoRes)
    setSumId(1)
  }

  if (sumInfoProps.sumInfo === undefined ) {
    return (<h1>Hello World</h1>)
  }

  return (
    <SumIdContext.Provider value={sumInfoProps.sumInfo.currentId}>
      <div className="main p-3">
        <Grid
          templateAreas={`
            "header header"
            "main nav"
            "footer nav"`}
          gridTemplateRows={'40px 1fr 316px'}
          gridTemplateColumns={'250px 1fr'}
          h='626px'
          gap='12px'>
          <GridItem area={'header'}>
            <RHeader/>
          </GridItem>
          <GridItem area={'main'}>
            <RSummonerInfo sumInfo={sumInfoProps?.sumInfo}
                           rankPoint={sumInfoProps?.rankPoint}/>
          </GridItem>
          <GridItem area={'footer'}>
            <RExcelChamp champList={sumInfoProps.excelChamp}/>
          </GridItem>
          <GridItem area={'nav'}>
            <RMatchHistory puuid={sumInfoProps.sumInfo.puuid}/>
          </GridItem>
        </Grid>
      </div>
    </SumIdContext.Provider>
  )
}
