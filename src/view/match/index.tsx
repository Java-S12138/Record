import RHeader from "./RHeader";
import RExcelChamp from "./RExcelChamp";
import {useState, useEffect, createContext, useRef} from "react";
import RSummonerInfo from "./RSummonerInfo";
import RMatchHistory from "./RMatchHistory";
import {Drawer, DrawerBody, DrawerContent, DrawerOverlay, Grid, GridItem,
  useDisclosure,  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,} from '@chakra-ui/react'
import {SumInfoRes} from "../../interface/SummonerInfo";
import {querySummonerInfo} from "../../utils/getSumInfo";
import MatchSumDetail from "./components/MatchSumDetail";
import {SumDetail} from "../../interface/MatchDetail";

export const SumIdContext = createContext(0)
export const AlterToSumId = createContext((sumId: number) => {})

export const Match = () =>  {
  const localSumId = useRef(0)
  const [page,setPage] = useState(1)
  const [sumId,setSumId] = useState(0)
  const [sumInfoProps, setSumInfoProps] = useState<SumInfoRes>({} as SumInfoRes)
  const [sumDetail,setSumDetail] = useState({} as SumDetail)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

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

  // 切换查询的召唤师
  const setSetSumId = (summonerId:number) => {
    if (summonerId!==sumId){
      setSumId(summonerId)
    }
  }
  // 改变当前页数
  const handleChange = (event: any, value: number) => {
    setPage(value)
  }
  // 打开召唤师对局详细数据
  const openSumDetailDrawer = (sumDetail:SumDetail) => {
    setSumDetail(sumDetail)
    onOpen()
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
              <RMatchHistory puuid={sumInfoProps.sumInfo.puuid} openSumDetailDrawer={openSumDetailDrawer}
                             begIndex={String((page-1)*9)} endIndex={String(page*9)}/>
            </SumIdContext.Provider>
          </GridItem>
        </Grid>
      </div>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        autoFocus={false}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent style={{width: '265px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
          <DrawerBody style={{padding: '12px'}}>
            <MatchSumDetail sumDetail={sumDetail} closeDrawer={onClose}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </AlterToSumId.Provider>
  )
}
