import RHeader from "./RHeader";
import RExcelChamp from "./RExcelChamp";
import {useState, useEffect,createContext} from "react";
import RSummonerInfo from "./RSummonerInfo";
import RMatchHistory from "./RMatchHistory";
import {Grid, GridItem} from '@chakra-ui/react'
import {SumInfoRes} from "../../interface/SummonerInfo";
import {querySummonerInfo} from "../../utils/getSumInfo";

export const SumIdContext = createContext(0)
export const AlterToSumId = createContext((sumId: number) => {})

export const Match = () =>  {
  const [sumId,setSumId] = useState(0)
  const [sumInfoProps, setSumInfoProps] = useState<SumInfoRes>({} as SumInfoRes)

  useEffect(() => {
    const fetchSumInfo = async () => {
      console.log(sumId)
      const sumInfo: SumInfoRes = await querySummonerInfo(sumId)
      setSumInfoProps(sumInfo)
    }
    fetchSumInfo()

  },[sumId])

  const setSetSumId = (summonerId:number) => {
    if (summonerId!==sumId){
      setSumId(summonerId)
    }
  }

  if (sumInfoProps.sumInfo === undefined ) {
    return (<h1>Hello World</h1>)
  }

  return (
    <AlterToSumId.Provider value={setSetSumId}>
      <div className="main p-3 overflow-hidden">
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
            <RSummonerInfo sumInfo={sumInfoProps.sumInfo}
                           rankPoint={sumInfoProps.rankPoint}/>
          </GridItem>
          <GridItem area={'footer'}>
            <RExcelChamp champList={sumInfoProps.excelChamp}/>
          </GridItem>
          <GridItem area={'nav'}>
            <SumIdContext.Provider value={sumInfoProps.sumInfo.currentId}>
              <RMatchHistory puuid={sumInfoProps.sumInfo.puuid}/>
            </SumIdContext.Provider>
          </GridItem>
        </Grid>
      </div>
    </AlterToSumId.Provider>
  )
}
