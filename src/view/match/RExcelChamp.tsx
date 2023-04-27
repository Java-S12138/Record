import {Image,Table, TableContainer, Tag, Tbody, Td, Tr} from "@chakra-ui/react";
import {ExcelChamp} from "../../interface/SummonerInfo";

export default function ({champList}:{champList:ExcelChamp[]}) {
  const champsTr = champList.map((champ,index) => {
    let stylyPadding
    if (index === 0) {
      stylyPadding = {paddingBottom:'5px'}
    }else if (index === champList.length - 1) {
      stylyPadding = {paddingTop:'5px'}
    }else {
      stylyPadding = {padding:'5px 0px'}
    }

    return (<Tr key={index}>
      <td>
        <div style={stylyPadding} className="flex justify-between">
          <Tag style={{height:'50px',width:'50px',padding:'0px',
            justifyContent:'center',fontSize:'12px'}}>
            <Image className='rounded' boxSize='40px' src={champ.champImgUrl}/>
          </Tag>

          <div className='flex flex-col justify-between'>
            <Tag
              size={'md'}
              variant='NInfo'
              style={{height:'25px',width:'150px',
                justifyContent:'center',fontSize:'12px'}}
            >
              熟练度:{champ.championPoints} •  Lv:{champ.champLevel}
            </Tag>
            <Tag
              size={'sm'}
              variant='NSuccess'
              style={{height:'20px',justifyContent:'center',fontSize:'10px'}}
            >
              {champ.champLabel}
            </Tag>
          </div>
        </div>
      </td>
    </Tr>)
  })

  return (
    <div className="p-3 bg-white h-full w-full boxShadow">
      <div className="overflow-auto" style={{height:'100%',borderRadius:'6px'}}>
      <TableContainer className="">
        <Table variant='unstyled' size='sm'>
          <Tbody>
            {champsTr}
          </Tbody>
        </Table>
      </TableContainer>
      </div>
    </div>
  )
}
