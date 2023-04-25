import {Image, Tag,Table, Tbody, Tr, Td, TableContainer} from "@chakra-ui/react";
import "./match.css"
import { invoke } from '@tauri-apps/api';

const test = async () => {
  console.log(23)
  const t = await invoke(`is_lcu_success`)
  console.log(t)
}
test()

export default  function () {
  // invoke(`get_cur_sum`).then((l) => {
  //   console.log(l)
  // }).catch((e) => {
  //   console.log(e)
  // })


  const w:string = "42%"

  return (
    <div className="p-3 bg-white h-full w-full boxShadow">
      <div className="flex gap-x-4">
        <Image className="imgFull" borderRadius='full' boxSize='60px' src='https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/5430.png'/>
        <div className="flex flex-col grow gap-y-2">
            <Tag
              size={'md'}
              borderRadius='full'
              variant='NInfo'
              style={{height:'28px',justifyContent:'center',
                }}
            >
              18岁游走型中单
            </Tag>
          <div className="progressDiv">
            <div className="progressLineBcg">
              <div className="progressBgc">
                <div className="progressLine" style={{width:w}}>
                </div>
              </div>
            </div>
            <p className="pText">42%</p>
          </div>
        </div>
      </div>

      {/*排位数据*/}
      <TableContainer className="mt-4 pt-px">
        <Table variant='simple' size='sm'>
          <Tbody>
            <Tr>
              <Td style={{padding:'8px 0px'}}>
                <div className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    单双排位
                  </Tag>
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NSuccess'>
                    黄金Ⅳ 32
                  </Tag>
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td style={{padding:'8px 0px'}}>
                <div className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    灵活排位
                  </Tag>
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NSuccess'>
                    黄金Ⅳ 32
                  </Tag>
                </div>
              </Td>
            </Tr>
            <Tr>
              <td>
                <div style={{padding:'8px 0px'}} className="flex justify-between">
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NInfo'>
                    云顶排位
                  </Tag>
                  <Tag
                    size={'lg'}
                    className="rankTag"
                    variant='NSuccess'>
                    黄金Ⅳ 32
                  </Tag>
                </div>
              </td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
