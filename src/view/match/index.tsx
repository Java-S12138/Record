import RHeader from "./RHeader";
import RExcelChamp from "./RExcelChamp";
import {useState, useEffect, createContext, useRef} from "react";
import RSummonerInfo from "./RSummonerInfo";
import RMatchHistory from "./RMatchHistory";
import {Grid, GridItem} from '@chakra-ui/react'
import {SumInfoRes} from "../../interface/SummonerInfo";
import {querySummonerInfo} from "../../utils/getSumInfo";

export const SumIdContext = createContext(0)
export const AlterToSumId = createContext((sumId: number) => {})

export const Match = () =>  {
  const localSumId = useRef(0)
  const [page,setPage] = useState(1)
  const [sumId,setSumId] = useState(0)
  const [sumInfoProps, setSumInfoProps] = useState<SumInfoRes>({} as SumInfoRes)

  useEffect(() => {
    const fetchSumInfo = async () => {
      const sumInfo: SumInfoRes = await querySummonerInfo(sumId)
      if (sumId === 0) {
        localSumId.current = sumInfo.sumInfo.currentId
      }
      setSumInfoProps(sumInfo)
      setPage(1)
    }
    fetchSumInfo()

  },[sumId])

  const setSetSumId = (summonerId:number) => {
    if (summonerId!==sumId){
      setSumId(summonerId)
    }
  }

  const handleChange = (event: any, value: number) => {
    setPage(value)
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
            <RHeader page={page} localSumId={localSumId.current}
                     handleChange={handleChange} sumId={sumInfoProps.sumInfo.currentId}/>
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
              <RMatchHistory puuid={sumInfoProps.sumInfo.puuid}
                             begIndex={String((page-1)*9)} endIndex={String(page*9)}/>
            </SumIdContext.Provider>
          </GridItem>
        </Grid>
      </div>
    </AlterToSumId.Provider>
  )
}
