import {Image, Table, TableContainer, Tag, Tbody, Td, Tr,Button} from "@chakra-ui/react";
import {SumDetail} from "../../../interface/MatchDetail";
import {useContext} from "react";
import {AlterToSumId} from "../index";
import {open} from "@tauri-apps/api/shell";

export default function ({sumDetail,closeDrawer}:{sumDetail:SumDetail,closeDrawer:Function}) {
  const alterToSumId = useContext(AlterToSumId)
  const changeSumId = (summonerId:number) => {
    closeDrawer()
    setTimeout(() => {
      alterToSumId(summonerId)
    },180)
  }

  const runesImgEle = sumDetail.runesList.map((rune,index) => {
    const imgUrl = new URL(`/src/assets/runes/${rune}.png`, import.meta.url).href
    return (
      <div  key={index} style={{width:'30px',height:'30px'}}>
        <Image  src={imgUrl} />
      </div>
    )
  })

  const rankPointEle = ['单双排位','灵活排位','云顶排位'].map((value, index) => {
    return (
      <Tr key={index}>
        <Td style={{padding:'6px 0px'}}>
          <div className="flex justify-between">
            <Tag
              className="rankTag"
              variant='NInfo'>
              {value}
            </Tag>
            <Tag
              className="rankTag"
              variant='NSuccess'>
              {sumDetail.rankData[index]}
            </Tag>
          </div>
        </Td>
      </Tr>
    )
  })

  const otherDataEle = sumDetail.listItemData.map((value, index) => {
    return (
      <tr key={index}>
        <td style={{padding:'6px 0px'}}>
          <div className="flex justify-between">
            <Tag
              size={'sm'}
              className='otherDataTag'>
              {value[0]}
            </Tag>
            <Tag
              size={'sm'}
              className='otherDataTag'>
              {value[1]}
            </Tag>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <div>
      {/*基本数据*/}
      <header className='flex justify-between'>
        <Image className='rounded'
               boxSize='60px' src={sumDetail.champImgUrl}/>
        <div className='flex flex-col justify-between'>
          <Tag size={'md'} className='justify-center' variant='NInfo'>
            {sumDetail.name}
          </Tag>
          <div className='flex gap-2'>
            <img style={{height:'20px',width:'20px',borderRadius:'0.375rem'}} className="itemClassSecond" src={sumDetail.spell1Id}/>
            <img style={{height:'20px',width:'20px',borderRadius:'0.375rem'}} className="itemClassSecond" src={sumDetail.spell2Id}/>
            <Tag variant='NSuccess' size={'sm'} >Lv {sumDetail.champLevel}</Tag>
            <Tag variant='NSuccess' size={'sm'} >{sumDetail.kda}</Tag>
          </div>
        </div>
      </header>
      {/*符文数据*/}
      <div className='flex justify-between mt-5' style={{marginBottom:'14px'}}>
        {runesImgEle}
      </div>
      {/*段位数据*/}
      <TableContainer>
        <Table variant='simple' size='sm'>
          <Tbody>
            {rankPointEle}
            {otherDataEle}
          </Tbody>
        </Table>
      </TableContainer>
      {/*查询此人*/}
      <div className='flex justify-between' style={{marginTop:'10px'}}>
        <Button size={'sm'} style={{fontWeight:'400',height:'30px'}}
                colorScheme='twitter' onClick={() => {changeSumId(sumDetail.summonerId)}}>查看详细战绩</Button>
        <Button onClick={() => {open('https://lolfrank.cn')}}
          size={'sm'} colorScheme='red' style={{fontWeight:'400',height:'30px',
          backgroundColor:'#ff6666',color:'#fff'}}>了解更多功能</Button>
      </div>
    </div>
  )
}
